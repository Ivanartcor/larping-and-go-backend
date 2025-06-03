// src/modules/guilds/application/use-cases/member/join-by-code.use-case.ts
import {
    Injectable, Inject, NotFoundException, ConflictException, ForbiddenException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { createHash } from 'crypto';
import { MembershipStatus } from '../../../domain/entities/guild-membership.entity';
import { GuildAccess } from '../../../domain/entities/guild.entity';

@Injectable()
export class JoinByCodeUseCase {
    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }

    async execute(userId: string, guildId: string, plainToken: string) {
        /* 1. Guild válida y con accessType=code */
        const guild = await this.guilds.findById(guildId);
        if (!guild) throw new NotFoundException('Guild no encontrada');
        if (guild.accessType !== GuildAccess.CODE) {
            throw new ForbiddenException('Esta guild no usa código de acceso');
        }

        /* 2. Hash y búsqueda */
        const hash = createHash('sha256').update(plainToken).digest('hex');
        if (hash !== guild.accessCodeHash) {
            throw new ForbiddenException('Código incorrecto o caducado');
        }

        /* 3. Usuario ya es miembro? */
        const existing = await this.guilds.findMembership(userId, guildId);
        if (existing) throw new ConflictException('Ya eres miembro o estás pendiente');


        //y si el unico rol es el lider?


        /* 4. Crear membresía activa con rol por defecto (posición más alta) */
        //si el rol es lider, creamos uno automáticamente
        let defaultRole = await this.guilds.findLowestRole(guildId);
        
        if (!defaultRole || defaultRole.isLeader) {
            defaultRole = await this.guilds.createRole({
                guild,
                name: 'Miembro',
                color: '#6b7280',
                position: 1,
                permissions: 0,
                isLeader: false,
            } as any);
        }

        const m = await this.guilds.createMembership({
            user: { id: userId } as any,
            guild,
            role: defaultRole,
            status: MembershipStatus.ACTIVE,
            joinedAt: new Date(),
        } as any);

        /* 5. Incrementar contador */
        guild.memberCount += 1;
        await this.guilds.save(guild);

        return m;
    }
}
