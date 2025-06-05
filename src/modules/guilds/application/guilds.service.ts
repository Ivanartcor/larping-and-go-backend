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
import { ListMembersQuery } from './queries/list-members.query';
import { ListPendingInvitesQuery } from './queries/list-pending-invites.query';
import { HandleInviteUseCase } from './use-cases/member/handle-invite.use-case';
import { JoinByCodeUseCase } from './use-cases/member/join-by-code.use-case';
import { KickMemberUseCase } from './use-cases/member/kick-member.use-case';
import { LeaveGuildUseCase } from './use-cases/member/leave-guild.use-case';
import { RequestJoinUseCase } from './use-cases/member/request-join.use-case';
import { SendInviteUseCase } from './use-cases/member/send-invite.use-case';
import { RespondInviteUseCase } from './use-cases/member/respond-invite.use-case';
import { CreateAnnouncementUseCase } from './use-cases/board/create-announcement.use-case';
import { UpdateAnnouncementUseCase } from './use-cases/board/update-announcement.use-case';
import { DeleteAnnouncementUseCase } from './use-cases/board/delete-announcement.use-case';
import { VotePollUseCase } from './use-cases/board/vote-poll.use-case';
import { ListAnnouncementsQuery } from './queries/list-announcements.query';
import { GetPollResultsUseCase } from './use-cases/board/get-poll-results.use-case';
import { GetAnnouncementDetailQuery } from './queries/get-announcement-detail.query';
import { GuildMembership } from '../domain/entities/guild-membership.entity';
import { CreateAnnouncementDto } from '../domain/dto/announcements/create-announcement.dto';
import { RemoveVoteUseCase } from './use-cases/board/remove-vote.use-case';
import { CreateInternalEventUseCase } from './use-cases/events/create-internal-event.use-case';
import { CreateInternalEventDto } from '../domain/dto/events/create-internal-event.dto';
import { ListInternalEventsQuery } from './queries/list-internal-events.query';
import { CancelAttendanceUseCase } from './use-cases/events/cancel-attendance.use-case';
import { ConfirmAttendanceUseCase } from './use-cases/events/confirm-attendance.use-case';
import { AttendanceDto } from '../domain/dto/events/attendance.dto';
import { ChangeEventStatusUseCase } from './use-cases/events/change-event-status.use-case';
import { ToggleHighlightUseCase } from './use-cases/events/toggle-highlight.use-case';
import { ChangeStatusDto } from '../domain/dto/events/change-status.dto';
import { UpdateInternalEventUseCase } from './use-cases/events/update-internal-event.use-case';
import { UpdateInternalEventDto } from '../domain/dto/events/update-internal-event.dto';
import { ListAttendancesQuery } from './queries/list-attendances.query';
import { GetEventDetailQuery } from './queries/get-event-detail.query';



@Injectable()
export class GuildsService {
  constructor(

    private readonly getPublicQ: GetGuildPublicQuery,
    private readonly listQ: ListGuildsQuery,
    private readonly getInternalQ: GetGuildInternalQuery,
    private readonly listMemQ: ListMembersQuery,
    private readonly listInvQ: ListPendingInvitesQuery,
    private readonly getAnnDetailQ: GetAnnouncementDetailQuery,
    private readonly listAnnQ: ListAnnouncementsQuery,
    private readonly listEventsQ: ListInternalEventsQuery,
    private readonly listAttQ: ListAttendancesQuery,
    private readonly eventDetailQ: GetEventDetailQuery,

    private readonly createUC: CreateGuildUseCase,
    private readonly updateUC: UpdateGuildUseCase,
    private readonly deleteUC: DeleteGuildUseCase,
    private readonly transferUC: TransferLeadershipUseCase,
    private readonly listRolesQ: ListRolesQuery,
    private readonly createRoleUC: CreateRoleUseCase,
    private readonly updateRoleUC: UpdateRoleUseCase,
    private readonly deleteRoleUC: DeleteRoleUseCase,
    private readonly assignRoleUC: AssignRoleUseCase,
    private readonly sendInvUC: SendInviteUseCase,
    private readonly handleInvUC: HandleInviteUseCase,
    private readonly kickUC: KickMemberUseCase,
    private readonly leaveUC: LeaveGuildUseCase,
    private readonly requestUC: RequestJoinUseCase,
    private readonly joinCodeUC: JoinByCodeUseCase,
    private readonly respondInvUC: RespondInviteUseCase,
    private readonly createAnnUC: CreateAnnouncementUseCase,
    private readonly updateAnnUC: UpdateAnnouncementUseCase,
    private readonly delAnnUC: DeleteAnnouncementUseCase,
    private readonly voteUC: VotePollUseCase,
    private readonly getResultsUC: GetPollResultsUseCase,
    private readonly unvoteUC: RemoveVoteUseCase,
    private readonly createEventUC: CreateInternalEventUseCase,
    private readonly confirmAttUC: ConfirmAttendanceUseCase,
    private readonly cancelAttUC: CancelAttendanceUseCase,
    private readonly changeStatusUC: ChangeEventStatusUseCase,
    private readonly toggleHighUC: ToggleHighlightUseCase,
    private readonly updateEventUC: UpdateInternalEventUseCase,

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

  update(userId: string, guildId: string, dto: UpdateGuildDto, membership, emblem?: Express.Multer.File,) {
    return this.updateUC.execute(
      guildId,
      dto,
      membership.role.permissions,
      membership.role.isLeader,
      emblem
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

  createRole(guildId: string, dto: CreateRoleDto, membership, file) {
    return this.createRoleUC.execute(
      guildId,
      dto,
      membership.role.position,
      membership.role.permissions,
      file,
    );
  }

  updateRole(guildId: string, roleId: string, dto: UpdateRoleDto, membership, file) {
    return this.updateRoleUC.execute(
      guildId,
      roleId,
      dto,
      membership.role.position,
      membership.role.permissions,
      file,
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



  /* ---------- Invitaciones ---------- */
  listPendingInvites(guildId: string) {
    return this.listInvQ.execute(guildId);
  }

  sendInvite(guildId: string, dto, membership, userId: string) {
    return this.sendInvUC.execute(
      guildId,
      dto,
      membership.role.position,
      membership.role.permissions,
      userId,
    );
  }

  handleInvite(guildId: string, invId: string, dto, membership, moderatorId) {
    return this.handleInvUC.execute(
      guildId,
      invId,
      dto,
      membership.role.position,
      membership.role.permissions,
      moderatorId,
    );
  }

  respondInvite(userId: string, guildId: string, invId: string, accept: boolean) {
    return this.respondInvUC.execute(userId, guildId, invId, accept);
  }

  /* ---------- Membresías ---------- */
  listMembers(guildId: string) {
    return this.listMemQ.execute(guildId);
  }

  requestJoin(userId: string, guildId: string) {
    return this.requestUC.execute(userId, guildId);
  }

  joinByCode(userId: string, guildId: string, token: string) {
    return this.joinCodeUC.execute(userId, guildId, token);
  }

  kick(guildId: string, dto, membership) {
    return this.kickUC.execute(
      guildId, dto,
      membership.role.position,
      membership.role.permissions,
    );
  }

  leave(userId: string, guildId: string) {
    return this.leaveUC.execute(userId, guildId);
  }


  /*boards / polls */
  createAnnouncement(
    guildId: string,
    dto: CreateAnnouncementDto,
    member: GuildMembership,   // ← ahora es el 3er parámetro
    userId: string,
  ) {
    const authorCharId =
      member.role.isLeader
        ? member.guild.leader?.activeCharacter?.id
        : member.user.activeCharacter?.id;

    return this.createAnnUC.execute(
      guildId,
      dto,
      userId,
      authorCharId,
      member.role.permissions,   // ← ya no será undefined
    );
  }
  updateAnnouncement(gId: string, annId: string, dto, member) {
    return this.updateAnnUC.execute(gId, annId, dto,
      member.user.id, member.role.permissions);
  }
  deleteAnnouncement(gId: string, annId: string, member) {
    return this.delAnnUC.execute(gId, annId, member.user.id,
      member.role.permissions);
  }
  vote(gId: string, annId: string, dto, member) {
    return this.voteUC.execute(gId, annId, member.user.id,
      member.user.activeCharacter?.id, dto);
  }

  removeVote(gId: string, aId: string, oId: string, userId: string) {
    return this.unvoteUC.execute(gId, aId, oId, userId);
  }


  listAnnouncements(guildId: string, page = 1, perPage = 20) {
    return this.listAnnQ.execute(guildId, page, perPage);
  }


  getAnnouncement(gId: string, annId: string, membership) {
    return this.getAnnDetailQ.execute(
      gId, annId, membership.user.id, membership.role.permissions,
    );
  }


  getPollResults(gId: string, annId: string, m) {
    return this.getResultsUC.execute(
      gId, annId, m.user.id, m.role.permissions,
    );
  }

  /* ---- crear evento interno ---- */
  createInternalEvent(guildId: string, dto: CreateInternalEventDto, userId: string, characterId: string | undefined, rolePerms: number) {
    return this.createEventUC.execute(
      guildId, dto, userId, characterId, rolePerms,
    );
  }

  listInternalEvents(guildId: string, filter: string, page: string) {
    return this.listEventsQ.execute(guildId, filter, page);
  }

  confirmAttendance(guildId: string, eventId: string, dto: AttendanceDto, userId: string) {
    return this.confirmAttUC.execute(guildId, eventId, userId, dto);
  }

  cancelAttendance(guildId: string, eventId: string, userId: string) {
    return this.cancelAttUC.execute(guildId, eventId, userId);
  }

  listEventAttendances(guildId: string, eventId: string, filter: string) {
    return this.listAttQ.execute(guildId, eventId, filter);
  }

  changeEventStatus(guildId: string, eventId: string, dto: ChangeStatusDto, membership) {
    return this.changeStatusUC.execute(
      guildId, eventId, dto.status, membership.role.permissions, membership.role.isLeader
    );
  }

  toggleHighlight(
    guildId: string,
    eventId: string,
    membership,
  ) {
    return this.toggleHighUC.execute(
      guildId,
      eventId,
      membership.role.permissions,
      membership.role.isLeader,
    );
  }

  updateInternalEvent(
    guildId: string,
    eventId: string,
    dto: UpdateInternalEventDto,
    membership,
  ) {
    return this.updateEventUC.execute(
      guildId,
      eventId,
      dto,
      membership.role.permissions,
      membership.role.isLeader,
    );
  }

  getEventDetail(guildId: string, eventId: string) {
    return this.eventDetailQ.execute(guildId, eventId);
  }



}
