// src/modules/guilds/application/use-cases/transfer-leadership.use-case.ts
import {
  Injectable, Inject, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { IGuildRepository }   from '../ports/i-guild.repository';
import { IUserRepository }    from '../../../users/application/ports/i-user.repository';

@Injectable()
export class TransferLeadershipUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    @Inject('USER_REPO')  private readonly users:  IUserRepository,
  ) {}

  async execute(guildId: string, currentUserId: string, newLeaderId: string) {
    /* 1. Validar que currentUser es líder */
    const currentMembership = await this.guilds.findMembership(currentUserId, guildId);
    if (!currentMembership?.role.isLeader) {
      throw new ForbiddenException('Solo el líder puede transferir liderazgo');
    }

    /* 2. Nuevo líder debe ser miembro activo */
    const targetMembership = await this.guilds.findMembership(newLeaderId, guildId);
    if (!targetMembership) throw new NotFoundException('El usuario no pertenece a la guild');

    /* 3. Obtener guild + rol líder */
    const guild = currentMembership.guild;             // ya cargado por relación
    guild.transferLeadership({ id: newLeaderId } as any);

    await this.guilds.save(guild);                     // persiste cambio en FK

    /* 4. Transferir rol (opcional, mismo rol líder) */
    targetMembership.role = currentMembership.role;
    await this.guilds.saveMembership(targetMembership);  // añadimos saveMembership al repo (Añadir saveMembership() al repositorio: simple return this.memberships.save(m))
    
  }
}