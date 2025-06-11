// src/modules/guilds/application/use-cases/delete-role.use-case.ts
import {
  Injectable, Inject, ForbiddenException, ConflictException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository'; 
import { GuildPermission } from 'src/modules/guilds/domain/entities/guild-role.entity';  
import { IStoragePort } from 'src/modules/users/application/ports/i-storage.port';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    @Inject('STORAGE') private readonly storage: IStoragePort,
    
  ) {}

  async execute(
    guildId: string,
    roleId: string,
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
      throw new ForbiddenException('El rol Líder no puede borrarse');
    }
    if (role.position <= currentPos) {
      throw new ForbiddenException('Rango insuficiente para borrar ese rol');
    }

    /* Comprobar que no haya miembros con ese rol */
    const hasMembers = await this.guilds.roleHasMembers(roleId);
    if (hasMembers) {
      throw new ConflictException('No se puede borrar un rol asignado a miembros');
    }

    /* elimino icono si tenía */
    const urlIcon = role.icon?.startsWith('/static/') ? role.icon : undefined;
    if (urlIcon) await this.storage.remove(urlIcon);
    
    /* Borro finalmente rol */
    await this.guilds.deleteRole(roleId);
  }
}
