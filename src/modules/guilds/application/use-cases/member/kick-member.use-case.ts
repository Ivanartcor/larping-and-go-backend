// src/modules/guilds/application/use-cases/member/kick-member.use-case.ts
import {
    Injectable, Inject, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { KickMemberDto } from 'src/modules/guilds/domain/dto/invites/kick-member.dto';
import { MembershipStatus } from '../../../domain/entities/guild-membership.entity';
import { GuildPermission } from '../../../domain/entities/guild-role.entity';

@Injectable()
export class KickMemberUseCase {
    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }

    async execute(
        guildId: string,
        dto: KickMemberDto,
        currentPos: number,
        perms: number,
    ) {
        if ((perms & GuildPermission.MANAGE_MEMBERS) === 0) {
            throw new ForbiddenException('MANAGE_MEMBERS requerido');
        }

        const m = await this.guilds.findMembershipById(dto.memberId);
        if (!m || m.guild.id !== guildId || m.status !== MembershipStatus.ACTIVE) {
            throw new NotFoundException('Miembro no encontrado');
        }
        if (m.role.isLeader) {
            throw new ForbiddenException('No puedes expulsar al líder');
        }
        if (m.role.position <= currentPos) {
            throw new ForbiddenException('Sólo puedes expulsar rangos inferiores');
        }

        m.status = MembershipStatus.KICKED;
        m.leftAt = new Date();
        await this.guilds.updateMembership(m);

        const guild = m.guild;
        guild.memberCount -= 1;
        await this.guilds.save(guild);
    }
}
