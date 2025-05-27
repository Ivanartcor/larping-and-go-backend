// src/modules/guilds/application/use-cases/update-role.use-case.ts
import {
  Injectable, Inject, ForbiddenException, ConflictException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { UpdateRoleDto } from 'src/modules/guilds/domain/dto/role/update-role';
import { GuildPermission } from '../../../domain/entities/guild-role.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    private readonly ds: DataSource,
  ) { }

  async execute(
    guildId: string,
    roleId: string,
    dto: UpdateRoleDto,
    currentPos: number,
    perms: number,
  ) {
    if ((perms & GuildPermission.MANAGE_ROLES) === 0) {
      throw new ForbiddenException('Permiso MANAGE_ROLES requerido');
    }

    const role = await this.guilds.findRoleById(roleId);
    if (!role || role.guild.id !== guildId) {
      throw new NotFoundException('Rol no encontrado');
    }
    if (role.isLeader) {
      throw new ForbiddenException('El rol Líder no puede modificarse');
    }
    /* Jerarquía */
    if (role.position <= currentPos) {
      throw new ForbiddenException('Solo puedes editar roles de rango inferior al tuyo');
    }

    /* Cambios */
    /* Unicidad nombre */
    if (dto.name && dto.name !== role.name) {
      if (await this.guilds.roleExistsByName(guildId, dto.name)) {
        throw new ConflictException('Nombre de rol duplicado');
      }
      role.name = dto.name;
    }

    /* SHIFT de posición */
    if (dto.position !== undefined && dto.position !== role.position) {
      if (dto.position <= currentPos)
        throw new ForbiddenException('No puedes asignar un rango igual o superior al tuyo');

      const SENTINEL = 10_000;


      await this.ds.transaction(async () => {
        // 1) Mover rol a posición centinela
        await this.guilds.updateRolePosition(role.id, SENTINEL);

        // 2) Desplazar bloque afectado
        await this.guilds.shiftRolePositions(
          guildId,
          role.position,           // from
          dto.position!,           // to
          role.id,                 // excluir el propio
        );

        // 3) Colocar rol en destino
        role.position = dto.position!;
        await this.guilds.updateRole(role);
      });
    }

    /* Otros campos */
    if (dto.color !== undefined) role.color = dto.color;
    if (dto.icon !== undefined) role.icon = dto.icon;
    if (dto.permissions !== undefined) role.permissions = dto.permissions;

    return this.guilds.updateRole(role);
  }
}
