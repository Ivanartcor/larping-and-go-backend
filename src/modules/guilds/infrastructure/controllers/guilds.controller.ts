// src/modules/guilds/infrastructure/controllers/guilds.controller.ts
import {
  Controller, Post, Get, Body, Query, Param,
  UseGuards, Req,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
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
import { CreateInviteDto } from '../../domain/dto/invites/create-invite.dto';
import { HandleInviteDto } from '../../domain/dto/invites/handle-invite.dto';
import { KickMemberDto } from '../../domain/dto/invites/kick-member.dto';
import { CreateAnnouncementDto } from '../../domain/dto/announcements/create-announcement.dto';
import { VoteDto } from '../../domain/dto/announcements/vote.dto';
import { UpdateAnnouncementDto } from '../../domain/dto/announcements/update-announcement.dto';

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


  /*  ROLES   */

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


  /* --- INVITACIONES --- */

  // enviar invitación
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_MEMBERS)
  @Post(':id/invites')
  sendInvite(
    @Param('id') id: string,
    @Body() dto: CreateInviteDto,
    @Req() req,
  ) {
    return this.guilds.sendInvite(id, dto, req.guildMembership, req.user.id);
  }

  // listar pendientes
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_MEMBERS)
  @Get(':id/invites')
  listInvites(@Param('id') id: string) {
    return this.guilds.listPendingInvites(id);
  }

  // aceptar / rechazar solicitud dentro de hermandad
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_MEMBERS)
  @Patch(':id/invites/:invId')
  handleInvite(
    @Param('id') id: string,
    @Param('invId') invId: string,
    @Body() dto: HandleInviteDto,
    @Req() req,
  ) {
    return this.guilds.handleInvite(id, invId, dto, req.guildMembership, req.user.id);
  }

  // aceptar / rechazar invitación a hermandad
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/invites/:invId/respond')
  respondInvite(
    @Param('id') id: string,
    @Param('invId') invId: string,
    @Body('accept') accept: boolean,
    @Req() req,
  ) {
    return this.guilds.respondInvite(req.user.id, id, invId, accept);
  }

  /* --- JOIN FLOWS (usuario) --- */

  // solicitar acceso
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/requests')
  requestJoin(@Param('id') id: string, @Req() req) {
    return this.guilds.requestJoin(req.user.id, id);
  }

  // unirse por link
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/join/:token')
  joinByCode(
    @Param('id') id: string,
    @Param('token') token: string,
    @Req() req,
  ) {
    return this.guilds.joinByCode(req.user.id, id, token);
  }

  /* --- MEMBERS --- */

  // listar miembros
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Get(':id/members')
  listMembers(@Param('id') id: string) {
    return this.guilds.listMembers(id);
  }

  // kick
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @GuildPermissions(GuildPermission.MANAGE_MEMBERS)
  @Delete(':id/members')
  kick(
    @Param('id') id: string,
    @Body() dto: KickMemberDto,
    @Req() req,
  ) {
    return this.guilds.kick(id, dto, req.guildMembership);
  }

  // leave (propio)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Delete(':id/leave')
  leave(@Param('id') id: string, @Req() req) {
    return this.guilds.leave(req.user.id, id);
  }

  //implementar también el cancelar invitación o retirar solicitud 
  //implementar también poder ver invitacion solo según usuario alque se lo han enviado

  /* ────────────────────────────────────────────── */
  /*  SECTION · BOARD / POLLS                       */
  /* ────────────────────────────────────────────── */

  /** Crear anuncio o encuesta */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @Post(':id/board')
  @GuildPermissions(GuildPermission.POST_ANNOUNCEMENT)
  createAnnouncement(
    @Param('id') guildId: string,
    @Body() dto: CreateAnnouncementDto,
    @Req() req,
  ) {
    return this.guilds.createAnnouncement(
      guildId,
      dto,
      req.guildMembership,   // ← PASAMOS el membership completo
      req.user.id,
    );
  }
  /** Listado del tablón (paginado) */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Get(':id/board')
  listAnnouncements(
    @Param('id') guildId: string,
    @Query('page', ParseIntPipe) page = 1,
  ) {
    return this.guilds.listAnnouncements(guildId, page);
  }

  /** anuncio o encuesta individual */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Get(':id/board/:annId')
  getAnnouncement(
    @Param('id') guildId: string,
    @Param('annId') annId: string,
    @Req() req,
  ) {
    return this.guilds.getAnnouncement(guildId, annId, req.guildMembership);
  }


  /** Actualizar anuncio / poll (autor o moderador) */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @Put(':id/board/:annId')
  @GuildPermissions(GuildPermission.POST_ANNOUNCEMENT)
  updateAnnouncement(
    @Param('id') guildId: string,
    @Param('annId') annId: string,
    @Body() dto: UpdateAnnouncementDto,
    @Req() req,
  ) {
    return this.guilds.updateAnnouncement(
      guildId,
      annId,
      dto,
      req.guildMembership,
    );
  }

  /** Borrar anuncio / poll */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
  @Delete(':id/board/:annId')
  @GuildPermissions(GuildPermission.POST_ANNOUNCEMENT)
  deleteAnnouncement(
    @Param('id') guildId: string,
    @Param('annId') annId: string,
    @Req() req,
  ) {
    return this.guilds.deleteAnnouncement(
      guildId,
      annId,
      req.guildMembership,
    );
  }

  /** Emitir voto en una encuesta */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Post(':id/board/:annId/votes')
  votePoll(
    @Param('id') guildId: string,
    @Param('annId') annId: string,
    @Body() dto: VoteDto,
    @Req() req,
  ) {
    return this.guilds.vote(
      guildId,
      annId,
      dto,
      req.guildMembership,
    );
  }

  @ApiBearerAuth()
@UseGuards(JwtAuthGuard, GuildMemberGuard)
@Delete(':id/board/:annId/votes/:optId')
unvote(
  @Param('id')     guildId: string,
  @Param('annId')  annId: string,
  @Param('optId')  optId: string,
  @Req()           req,
){
  return this.guilds.removeVote(
    guildId, annId, optId, req.guildMembership.user.id,
  );
}


  /** Resultados (si showResults = true o poll cerrado) */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, GuildMemberGuard)
  @Get(':id/board/:annId/results')
  pollResults(
    @Param('id') guildId: string,
    @Param('annId') annId: string,
    @Req() req,
  ) {
    return this.guilds.getPollResults(
      guildId,
      annId,
      req.guildMembership,
    );
  }

}
