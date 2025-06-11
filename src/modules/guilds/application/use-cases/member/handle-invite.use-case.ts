// src/modules/guilds/application/use-cases/member/handle-invite.use-case.ts
import {
  Injectable, Inject, ForbiddenException, NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { HandleInviteDto } from 'src/modules/guilds/domain/dto/invites/handle-invite.dto';
import {
  InviteStatus, InviteType,
} from '../../../domain/entities/guild-invite.entity';
import { MembershipStatus } from '../../../domain/entities/guild-membership.entity';
import { GuildPermission } from '../../../domain/entities/guild-role.entity';
import { joinGuildChat } from '../../helpers/join-guild-chat';
import { IChatRepository } from 'src/modules/chat/application/ports/i-chat.repository';

@Injectable()
export class HandleInviteUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    @Inject('CHAT_REPO') private readonly chats: IChatRepository
  ) { }

  async execute(
    guildId: string,
    inviteId: string,
    dto: HandleInviteDto,
    curPos: number,
    perms: number,
    modUserId: string,
  ) {
    /* ───────────────── Permiso ───────────────── */
    if ((perms & GuildPermission.MANAGE_MEMBERS) === 0) {
      throw new ForbiddenException('MANAGE_MEMBERS requerido');
    }

    /* ─── Buscar invitación ─── */
    const inv = await this.guilds.findInviteById(inviteId);
    if (!inv || inv.guild.id !== guildId || inv.status !== InviteStatus.PENDING) {
      throw new NotFoundException('Invitación no encontrada o ya gestionada');
    }

    /* ─── Validar operativa según tipo ─── */
    if (inv.type === InviteType.INVITE) {
      // El moderador sólo puede CANCELAR invitaciones directas
      if (dto.status !== InviteStatus.CANCELLED) {
        throw new ForbiddenException('Solo puedes cancelar una invitación directa');
      }
    } else { // REQUEST
      // Las peticiones solo pueden aceptarse o rechazarse
      if (dto.status === InviteStatus.CANCELLED) {
        throw new ForbiddenException('Una request no puede cancelarse');
      }
    }

    /* ─── Actualizar invitación ─── */
    inv.status = dto.status;
    inv.handledAt = new Date();
    inv.handledByUser = { id: modUserId } as any;
    await this.guilds.updateInvite(inv);

    /* ─── Si se acepta una REQUEST, alta/activación del miembro ─── */
    if (inv.type === InviteType.REQUEST && dto.status === InviteStatus.ACCEPTED) {
      const userId = inv.senderUser.id;

      // buscamos cualquier membership, incluso kicked/left
      let membership = await this.guilds.findMembershipAny(userId, guildId);

      if (membership) {
        membership.status = MembershipStatus.ACTIVE;
        membership.joinedAt = new Date();
        membership.leftAt = undefined;
        await this.guilds.updateMembership(membership);
      } else {
        // Rol más bajo (crea “Miembro” si sólo existe el líder)
        let role = await this.guilds.findLowestRole(guildId);
        if (!role || role.isLeader) {
          role = await this.guilds.createRole({
            guild: inv.guild,
            name: 'Miembro',
            color: '#6b7280',
            position: 1,
            permissions: 0,
            isLeader: false,
          } as any);
        }

        membership = await this.guilds.createMembership({
          user: { id: userId } as any,
          guild: inv.guild,
          role,
          status: MembershipStatus.ACTIVE,
          joinedAt: new Date(),
        } as any);
      }

      if (!membership.user.activeCharacter) {
        throw new BadRequestException('El usuario no tiene un personaje activo');
      }

      //Lo metemos en el chat grupal de la hermandad
      await joinGuildChat(guildId, userId, membership.user.activeCharacter.id, this.chats);


      /* Contador +1 */
      inv.guild.memberCount += 1;
      await this.guilds.save(inv.guild);
    }
  }
}
