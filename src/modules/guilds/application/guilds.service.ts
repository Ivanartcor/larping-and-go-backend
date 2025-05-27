// src/modules/guilds/application/guilds.service.ts
import { Injectable } from '@nestjs/common';

import { TransferLeadershipUseCase } from './use-cases/transfer-leadership.use-case';
import { UpdateGuildUseCase } from './use-cases/update-guild.use-case';
import { DeleteGuildUseCase } from './use-cases/delete-guild.use-case';
import { CreateGuildUseCase } from './use-cases/create-guild.use-case';
import { GetGuildPublicQuery } from './queries/get-guild-public.query';
import { ListGuildsQuery } from './queries/list-guilds.query';

import { CreateGuildDto } from '../domain/dto/create-guild.dto';
import { UpdateGuildDto } from '../domain/dto/update-guild.dto';
import { GetGuildInternalQuery } from './queries/get-guild-internal.query';
import { ListRolesQuery } from './queries/list-roles.query';
import { CreateRoleUseCase } from './use-cases/role/create-role.use-case';
import { UpdateRoleUseCase } from './use-cases/role/update-role.use-case';
import { DeleteRoleUseCase } from './use-cases/role/delete-role.use-case';
import { AssignRoleUseCase } from './use-cases/role/assign-role.use-case';
import { CreateRoleDto } from '../domain/dto/role/create-role';
import { UpdateRoleDto } from '../domain/dto/role/update-role';
import { AssignRoleDto } from '../domain/dto/role/assin-role';



@Injectable()
export class GuildsService {
  constructor(
    private readonly createUC: CreateGuildUseCase,
    private readonly getPublicQ: GetGuildPublicQuery,
    private readonly listQ: ListGuildsQuery,
    private readonly getInternalQ: GetGuildInternalQuery,
    private readonly updateUC: UpdateGuildUseCase,
    private readonly deleteUC: DeleteGuildUseCase,
    private readonly transferUC: TransferLeadershipUseCase,
    private readonly listRolesQ: ListRolesQuery,
    private readonly createRoleUC: CreateRoleUseCase,
    private readonly updateRoleUC: UpdateRoleUseCase,
    private readonly deleteRoleUC: DeleteRoleUseCase,
    private readonly assignRoleUC: AssignRoleUseCase,
  ) { }

  create(userId: string, dto: CreateGuildDto) {
    return this.createUC.execute(userId, dto);
  }

  getPublic(slug: string) {
    return this.getPublicQ.execute(slug);
  }

  listPublic(search?: string) {
    return this.listQ.execute(search);
  }

  update(userId: string, guildId: string, dto: UpdateGuildDto, membership) {
    return this.updateUC.execute(
      guildId,
      dto,
      membership.role.permissions,
      membership.role.isLeader,
    ).then(() => this.getInternalQ.execute(guildId));
  }

  softDelete(userId: string, guildId: string, membership) {
    return this.deleteUC.execute(guildId, membership.role.isLeader);
  }

  transferLeader(userId: string, guildId: string, newLeaderId: string) {
    return this.transferUC.execute(guildId, userId, newLeaderId);
  }

 /* ---------- ROLES ---------- */

  listRoles(guildId: string) {
    return this.listRolesQ.execute(guildId);
  }

  createRole(guildId: string, dto: CreateRoleDto, membership) {
    return this.createRoleUC.execute(
      guildId,
      dto,
      membership.role.position,
      membership.role.permissions,
    );
  }

  updateRole(guildId: string, roleId: string, dto: UpdateRoleDto, membership) {
    return this.updateRoleUC.execute(
      guildId,
      roleId,
      dto,
      membership.role.position,
      membership.role.permissions,
    );
  }

  deleteRole(guildId: string, roleId: string, membership) {
    return this.deleteRoleUC.execute(
      guildId,
      roleId,
      membership.role.position,
      membership.role.permissions,
    );
  }

  assignRole(guildId: string, dto: AssignRoleDto, membership) {
    return this.assignRoleUC.execute(
      guildId,
      dto,
      membership.role.position,
      membership.role.permissions,
    );
  }

}
