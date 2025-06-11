// src/modules/guilds/application/use-cases/member/send-invite.use-case.ts
import {
  Injectable, Inject, ForbiddenException, NotFoundException, ConflictException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { CreateInviteDto } from 'src/modules/guilds/domain/dto/invites/create-invite.dto'; 
import {
  GuildInvite, InviteType, InviteStatus,
} from '../../../domain/entities/guild-invite.entity';
import { GuildPermission }  from '../../../domain/entities/guild-role.entity';
import { addHours }         from 'date-fns';
import { IChatRepository } from 'src/modules/chat/application/ports/i-chat.repository';

@Injectable()
export class SendInviteUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    @Inject('CHAT_REPO') private readonly chats: IChatRepository
  ) {}

  async execute(
    guildId: string,
    dto: CreateInviteDto,
    currentPos: number,
    perms: number,
    moderatorId: string,  
  ) {
    /* Permiso */
    if ((perms & GuildPermission.MANAGE_MEMBERS) === 0) {
      throw new ForbiddenException('MANAGE_MEMBERS requerido');
    }

    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Guild no encontrada');

    /* ¿Ya es miembro? */
    if (dto.targetUserId) {
      const exists = await this.guilds.findMembership(dto.targetUserId, guildId);
      if (exists) throw new ConflictException('El usuario ya pertenece o está pendiente');
    }

    /* Crear invitación */
    const inv = new GuildInvite();
    inv.guild       = guild;
    inv.senderUser  = { id: moderatorId ?? 'system' } as any; // moderador se añade en controller
    inv.targetUser  = dto.targetUserId ? { id: dto.targetUserId } as any : undefined;
    inv.email       = dto.email;
    inv.type        = InviteType.INVITE;
    inv.status      = InviteStatus.PENDING;
    if (dto.expiresInHours) {
      inv.expiresAt = addHours(new Date(), dto.expiresInHours);
    }
    await this.guilds.createInvite(inv);
  }
}
