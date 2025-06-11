import { Injectable, Inject } from "@nestjs/common";
import { GuildPermission } from "src/modules/guilds/domain/entities/guild-role.entity";
import { ChannelType } from "../../domain/entities/chat-channel.entity";
import { IChatRepository } from "../ports/i-chat.repository";
import { IGuildRepository } from "src/modules/guilds/application/ports/i-guild.repository";
import { GuildMembership } from "src/modules/guilds/domain/entities/guild-membership.entity";


let membership: GuildMembership | null = null;
// chat/application/queries/is-moderator.query.ts
@Injectable()
export class IsModeratorQuery {
    constructor(
        @Inject('CHAT_REPO') private readonly chats: IChatRepository,
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,

    ) { }

    async execute(messageId: string, userId: string): Promise<boolean> {
        const msg = await this.chats.findMessageWithAuthor(messageId);
        if (!msg) return false;

        // 1. direct channels ⇒ no moderador
        if (msg.channel.type === ChannelType.DIRECT) return false;

        // 2. comprobar participant.role
        const p = msg.channel.participants?.find(x => x.user.id === userId);
        if (p?.role === 'moderator') return true;

        // 3. permisos de guild (MANAGE_MEMBERS)

        if (msg.channel.guild?.id) {
            membership = await this.guilds.findMembership(userId, msg.channel.guild.id);

            if (membership?.role?.permissions !== undefined) {
                return Boolean(membership.role.permissions & GuildPermission.MANAGE_MEMBERS);
            }
        }

        return false;

    }
}
