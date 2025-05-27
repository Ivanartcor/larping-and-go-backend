// src/modules/guilds/application/use-cases/create-role.use-case.ts
import {
  Injectable, Inject, ConflictException, ForbiddenException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { CreateRoleDto } from '../../../domain/dto/role/create-role';    
import { GuildRole }        from '../../../domain/entities/guild-role.entity';
import { GuildPermission }  from '../../../domain/entities/guild-role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId: string,
    dto: CreateRoleDto,
    currentPos: number,
    perms: number,
  ): Promise<GuildRole> {

    if ((perms & GuildPermission.CREATE_ROLES) === 0) {
      throw new ForbiddenException('Permiso CREATE_ROLES requerido');
    }

    /* Unicidad nombre + posición */
    if (await this.guilds.roleExistsByName(guildId, dto.name)) {
      throw new ConflictException('Ese nombre de rol ya existe');
    }
    if (await this.guilds.roleExistsByPosition(guildId, dto.position)) {
      throw new ConflictException('Otra posición ya usa ese número');
    }

    /* Jerarquía: sólo puedo crear debajo de mí */
    if (dto.position <= currentPos) {
      throw new ForbiddenException('No puedes crear un rol con rango igual o superior al tuyo');
    }

    const role = new GuildRole();
    role.guild       = { id: guildId } as any;
    role.name        = dto.name;
    role.color       = dto.color;
    role.icon        = dto.icon;
    role.position    = dto.position;
    role.permissions = dto.permissions;
    role.isLeader    = false;

    return this.guilds.createRole(role);
  }
}
