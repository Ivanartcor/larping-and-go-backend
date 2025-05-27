// src/modules/guilds/application/use-cases/assign-role.use-case.ts
import {
  Injectable, Inject, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { AssignRoleDto } from 'src/modules/guilds/domain/dto/role/assin-role';   
import { GuildPermission }  from '../../../domain/entities/guild-role.entity';

@Injectable()
export class AssignRoleUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId: string,
    dto: AssignRoleDto,
    currentPos: number,
    perms: number,
  ) {
    if ((perms & GuildPermission.MANAGE_MEMBERS) === 0) {
      throw new ForbiddenException('Permiso MANAGE_MEMBERS requerido');
    }

    const member = await this.guilds.findMembership(dto.memberId, guildId);
    if (!member) throw new NotFoundException('Miembro no encontrado');

    const newRole = await this.guilds.findRoleById(dto.roleId);
    if (!newRole || newRole.guild.id !== guildId) {
      throw new NotFoundException('Rol no encontrado');
    }
    if (newRole.position <= currentPos) {
      throw new ForbiddenException('No puedes asignar roles de rango igual o superior al tuyo');
    }

    member.role = newRole;
    await this.guilds.saveMembership(member);
  }
}
