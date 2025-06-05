// src/modules/guilds/guilds.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Guild } from './domain/entities/guild.entity';
import { GuildRole } from './domain/entities/guild-role.entity';
import { GuildMembership } from './domain/entities/guild-membership.entity';

import { GuildRepository } from './infrastructure/repositories/guild.repository';

/* Use-cases (Fase 1) */
import { CreateGuildUseCase } from './application/use-cases/create-guild.use-case';
import { GetGuildPublicQuery } from './application/queries/get-guild-public.query';
import { ListGuildsQuery } from './application/queries/list-guilds.query';
import { GetGuildInternalQuery } from './application/queries/get-guild-internal.query';


/* Controller + façade */
import { GuildsController } from './infrastructure/controllers/guilds.controller';
import { GuildsService } from './application/guilds.service';

/* UsersModule para comprobar el creador (y reutilizar JwtAuthGuard) */
import { UsersModule } from '../users/users.module';
import { UpdateGuildUseCase } from './application/use-cases/update-guild.use-case';
import { DeleteGuildUseCase } from './application/use-cases/delete-guild.use-case';
import { TransferLeadershipUseCase } from './application/use-cases/transfer-leadership.use-case';
import { GuildMemberGuard } from './infrastructure/guards/guild-member.guard';
import { GuildPermissionsGuard } from './infrastructure/guards/guild-permissions.guard';
import { ListRolesQuery } from './application/queries/list-roles.query';
import { AssignRoleUseCase } from './application/use-cases/role/assign-role.use-case';
import { CreateRoleUseCase } from './application/use-cases/role/create-role.use-case';
import { DeleteRoleUseCase } from './application/use-cases/role/delete-role.use-case';
import { UpdateRoleUseCase } from './application/use-cases/role/update-role.use-case';
import { HandleInviteUseCase } from './application/use-cases/member/handle-invite.use-case';
import { JoinByCodeUseCase } from './application/use-cases/member/join-by-code.use-case';
import { KickMemberUseCase } from './application/use-cases/member/kick-member.use-case';
import { LeaveGuildUseCase } from './application/use-cases/member/leave-guild.use-case';
import { RequestJoinUseCase } from './application/use-cases/member/request-join.use-case';
import { SendInviteUseCase } from './application/use-cases/member/send-invite.use-case';
import { ListPendingInvitesQuery } from './application/queries/list-pending-invites.query';
import { ListMembersQuery } from './application/queries/list-members.query';
import { GuildInvite } from './domain/entities/guild-invite.entity';
import { RespondInviteUseCase } from './application/use-cases/member/respond-invite.use-case';
import { CreateAnnouncementUseCase } from './application/use-cases/board/create-announcement.use-case';
import { ListAnnouncementsQuery } from './application/queries/list-announcements.query';
import { GuildAnnouncement } from './domain/entities/guild-announcement.entity';
import { GuildPollOption } from './domain/entities/guild-poll-option.entity';
import { GuildVote } from './domain/entities/guild-vote.entity';
import { UpdateAnnouncementUseCase } from './application/use-cases/board/update-announcement.use-case';
import { DeleteAnnouncementUseCase } from './application/use-cases/board/delete-announcement.use-case';
import { VotePollUseCase } from './application/use-cases/board/vote-poll.use-case';
import { GetPollResultsUseCase } from './application/use-cases/board/get-poll-results.use-case';
import { ScheduleModule } from '@nestjs/schedule';
import { GetAnnouncementDetailQuery } from './application/queries/get-announcement-detail.query';
import { RemoveVoteUseCase } from './application/use-cases/board/remove-vote.use-case';
import { CloseExpiredPollsJob } from './application/jobs/close-expired-polls.job';
import { CreateInternalEventUseCase } from './application/use-cases/events/create-internal-event.use-case';
import { GuildInternalEvent } from './domain/entities/guild-internal-event.entity';
import { GuildEventAttendance } from './domain/entities/guild-event-attendance.entity';
import { ListInternalEventsQuery } from './application/queries/list-internal-events.query';
import { ConfirmAttendanceUseCase } from './application/use-cases/events/confirm-attendance.use-case';
import { CancelAttendanceUseCase } from './application/use-cases/events/cancel-attendance.use-case';
import { ChangeEventStatusUseCase } from './application/use-cases/events/change-event-status.use-case';
import { ToggleHighlightUseCase } from './application/use-cases/events/toggle-highlight.use-case';
import { UpdateInternalEventUseCase } from './application/use-cases/events/update-internal-event.use-case';
import { ListAttendancesQuery } from './application/queries/list-attendances.query';
import { GetEventDetailQuery } from './application/queries/get-event-detail.query';
import { CompletePastEventsJob } from './application/jobs/complete-past-events.job';
import { ExpireInvitesJob } from './application/jobs/expire-invites.job';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Guild, GuildRole, GuildMembership, GuildInvite,
      GuildAnnouncement, GuildPollOption, GuildVote,
      GuildInternalEvent, GuildEventAttendance,
    ]),
    UsersModule,
    ScheduleModule.forRoot()
  ],
  controllers: [GuildsController],
  providers: [
    /* Repo DI token */
    { provide: 'GUILD_REPO', useClass: GuildRepository },

    /* queries */
    GetGuildPublicQuery,
    ListGuildsQuery,
    GetGuildInternalQuery,
    ListRolesQuery,
    ListPendingInvitesQuery,
    ListMembersQuery,
    ListAnnouncementsQuery,
    GetAnnouncementDetailQuery,
    ListInternalEventsQuery,
    ListAttendancesQuery,
    GetEventDetailQuery,

    /* use-cases */

    // fase 0-2
    CreateGuildUseCase,
    UpdateGuildUseCase,
    DeleteGuildUseCase,
    TransferLeadershipUseCase,

    // fase 3
    CreateRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    AssignRoleUseCase,

    // fase 4
    SendInviteUseCase,
    HandleInviteUseCase,
    RequestJoinUseCase,
    JoinByCodeUseCase,
    KickMemberUseCase,
    LeaveGuildUseCase,
    RespondInviteUseCase,

    // fase 5
    CreateAnnouncementUseCase,
    UpdateAnnouncementUseCase,
    DeleteAnnouncementUseCase,
    VotePollUseCase,
    GetPollResultsUseCase,
    RemoveVoteUseCase,

    // fase 6
    CreateInternalEventUseCase,
    UpdateInternalEventUseCase,
    ConfirmAttendanceUseCase,
    CancelAttendanceUseCase,
    ChangeEventStatusUseCase,
    ToggleHighlightUseCase,

    /* Guards */
    GuildMemberGuard,
    GuildPermissionsGuard,
    ExpireInvitesJob,

    /* Facade(service) */
    GuildsService,

    /* Jobs */
    CloseExpiredPollsJob,
    CompletePastEventsJob
  ],
  exports: [
    'GUILD_REPO',  // otros dominios (Events, Chat…) lo usarán
    GuildsService,
  ],
})
export class GuildsModule { }
