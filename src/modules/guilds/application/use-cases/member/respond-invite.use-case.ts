import {
    Injectable, Inject, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { InviteStatus, InviteType } from '../../../domain/entities/guild-invite.entity';
import { GuildMembership, MembershipStatus } from '../../../domain/entities/guild-membership.entity';

@Injectable()
export class RespondInviteUseCase {
    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }

    async execute(
        userId: string,
        guildId: string,
        inviteId: string,
        accept: boolean
    ) {
        /* 1. Invitación válida y pendiente */
        const inv = await this.guilds.findInviteById(inviteId);
        if (!inv || inv.guild.id !== guildId) {
            throw new NotFoundException('Invitación no encontrada');
        }
        if (inv.type !== InviteType.INVITE) {
            throw new ForbiddenException('Sólo el destinatario gestiona invitaciones directas');
        }
        /* Debe ser destinatario */
        if (!inv.targetUser || inv.targetUser.id !== userId) {
            throw new ForbiddenException('No eres el destinatario');
        }
        if (inv.status !== InviteStatus.PENDING) {
            throw new ForbiddenException('La invitación ya fue gestionada');
        }

        /* 2. Marcar estado */
        inv.status = accept ? InviteStatus.ACCEPTED : InviteStatus.REJECTED;
        inv.handledAt = new Date();
        await this.guilds.updateInvite(inv);

        if (!accept) return;                       // ← rechazado, sin alta

        /* 3. Alta o reactivación de la membresía */
        let membership = await this.guilds.findMembershipAny(userId, guildId);
        let added = false;

        if (membership) {
            if (membership.status === MembershipStatus.ACTIVE) {
                // ya estaba activo (raro, pero evita contadores dobles)
                return;
            }
            // Reactivar
            membership.status = MembershipStatus.ACTIVE;
            membership.joinedAt = new Date();
            membership.leftAt = undefined;
            await this.guilds.updateMembership(membership);
            added = true;
        } else {
            // Crear nueva
            let defaultRole = await this.guilds.findLowestRole(guildId);

            /* Si sólo existe el rol líder, creamos uno básico */
            if (!defaultRole || defaultRole.isLeader) {
                defaultRole = await this.guilds.createRole({
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
                role: defaultRole,
                status: MembershipStatus.ACTIVE,
                joinedAt: new Date(),
            } as GuildMembership);
            added = true;
        }

        /* 4. Actualizar contador si corresponde */
        if (added) {
            inv.guild.memberCount += 1;
            await this.guilds.save(inv.guild);
        }
    }
}