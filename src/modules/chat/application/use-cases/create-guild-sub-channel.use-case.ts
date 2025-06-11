import { NotFoundException, ForbiddenException, BadRequestException, ConflictException, Injectable, Inject } from "@nestjs/common";
import { string } from "joi";
import { async } from "rxjs";
import { GuildPermission } from "src/modules/guilds/domain/entities/guild-role.entity";
import { CreateSubChannelDto } from "../../domain/dto/create-sub-channel.dto";
import { ChannelType } from "../../domain/entities/chat-channel.entity";
import { IChatRepository } from "../ports/i-chat.repository";
import { IGuildRepository } from "src/modules/guilds/application/ports/i-guild.repository";


@Injectable()
export class CreateGuildSubChannelUseCase {

    constructor(
        @Inject('CHAT_REPO') private readonly chats: IChatRepository,
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }


    async execute(dto: CreateSubChannelDto, userId: string) {
        const guild = await this.guilds.findById(dto.guildId);
        if (!guild) throw new NotFoundException();

        /* 1. verificar permisos en GuildMembership */
        const mem = await this.guilds.findMembership(userId, dto.guildId);
        if (!mem) throw new ForbiddenException('No perteneces a la guild');
        
        const canCreate = mem.role.isLeader ||
            (mem.role.permissions & (GuildPermission.MANAGE_ROLES | GuildPermission.CREATE_EVENTS));
        if (!canCreate) throw new ForbiddenException('Sin permiso');

        /* 2. contar existentes / duplicado topic */
        const existing = await this.chats.countGuildSubchannels(dto.guildId);
        if (existing >= 30) throw new BadRequestException('Límite 30 sub-canales');

        const dup = await this.chats.topicExists(dto.guildId, dto.topic);
        if (dup) throw new ConflictException('Ya existe un canal con ese topic');

        /* 3. crear canal */
        const parent = await this.chats.findGuildChannel(dto.guildId) ?? undefined; // canal “general”
        const chan = await this.chats.createChannel({
            type: ChannelType.GUILD,
            guild: guild,
            parent: parent,
            topic: dto.topic,
            autoSync: dto.autoSync ?? true,
            lastMessageAt: new Date(),
        });
        /* 4 · Participantes iniciales */
        if (chan.autoSync) {
            const members = await this.guilds.listActiveMembershipIds(dto.guildId);
            await this.chats.bulkInsertParticipants(chan.id, members);
        } else if (/* quieres empezar vacío */ false) {
            // omite bulk insert
        }
        return chan;
    }
}

