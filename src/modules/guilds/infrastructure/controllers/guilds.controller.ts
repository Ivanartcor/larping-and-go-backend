// src/modules/guilds/infrastructure/controllers/guilds.controller.ts
import {
  Controller, Post, Get, Body, Query, Param,
  UseGuards, Req,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';



import { GuildsService } from '../../application/guilds.service';
import { CreateGuildDto } from '../../domain/dto/create-guild.dto';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { GuildMemberGuard } from '../guards/guild-member.guard';
import { GuildPermissionsGuard } from '../guards/guild-permissions.guard';
import { GuildPermissions } from '../decorators/guild-permissions.decorator';
import { GuildPermission } from '../../domain/entities/guild-role.entity';
import { UpdateGuildDto } from '../../domain/dto/update-guild.dto';
import { TransferLeaderDto } from '../../domain/dto/transfer-leader.dto';
import { CreateRoleDto } from '../../domain/dto/role/create-role';
import { UpdateRoleDto } from '../../domain/dto/role/update-role';
import { AssignRoleDto } from '../../domain/dto/role/assin-role';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guilds: GuildsService) { }

  /* ---------- Crear hermandad ---------- */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateGuildDto,
    @Req() req,
  ) {
    return this.guilds.create(req.user.id, dto);
  }

  /* ---------- Listado público ---------- */
  @Get()
  list(@Query('q') q?: string) {
    return this.guilds.listPublic(q);
  }

  /* ---------- Perfil público ------------ */
  @Get(':slug')
  getPublic(@Param('slug') slug: string) {
    return this.guilds.getPublic(slug);
  }

  /* ---------- Actualizar hermandad ------------ */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @Put(':id')
  @GuildPermissions(GuildPermission.EDIT_INFO)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGuildDto,
    @Req() req,
  ) {
    return this.guilds.update(req.user.id, id, dto, req.guildMembership);
  }

  /* ---------- Eliminacion pasiva hermandad ------------ */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.guilds.softDelete(req.user.id, id, req.guildMembership);
  }

  /* ---------- Transferir liderazgo ------------ */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Patch(':id/leader')
  transfer(
    @Param('id') id: string,
    @Body() dto: TransferLeaderDto,
    @Req() req,
  ) {
    return this.guilds.transferLeader(req.user.id, id, dto.newLeaderUserId);
  }

  //planeado uno que me devuelva el accesscode, otro que me devuelva la info completa de la hermandad, otro que me devueva la info completa del miembro


  /*  ROLES  ───────────────────────────────────────────────────── */

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.CREATE_ROLES)
  @Post(':id/roles')
  createRole(
    @Param('id') id: string,
    @Body() dto: CreateRoleDto,
    @Req() req,
  ) {
    return this.guilds.createRole(id, dto, req.guildMembership);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Get(':id/roles')
  listRoles(@Param('id') id: string) {
    return this.guilds.listRoles(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_ROLES)
  @Put(':id/roles/:roleId')
  updateRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
    @Body() dto: UpdateRoleDto,
    @Req() req,
  ) {
    return this.guilds.updateRole(id, roleId, dto, req.guildMembership);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_ROLES)
  @Delete(':id/roles/:roleId')
  deleteRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
    @Req() req,
  ) {
    return this.guilds.deleteRole(id, roleId, req.guildMembership);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_MEMBERS)
  @Patch(':id/roles/assign')
  assignRole(
    @Param('id') id: string,
    @Body() dto: AssignRoleDto,
    @Req() req,
  ) {
    return this.guilds.assignRole(id, dto, req.guildMembership);
  }


  //Vamos a meter un endpoint para mostrar una lista de todos los roles de la hermandad

}
