// src/modules/guilds/application/ports/i-guild.repository.ts
import { Guild } from '../../domain/entities/guild.entity';
import { GuildRole } from '../../domain/entities/guild-role.entity';
import { GuildMembership } from '../../domain/entities/guild-membership.entity';
import { GuildInvite } from '../../domain/entities/guild-invite.entity';
import { GuildAnnouncement } from '../../domain/entities/guild-announcement.entity';
import { GuildPollOption } from '../../domain/entities/guild-poll-option.entity';
import { GuildVote } from '../../domain/entities/guild-vote.entity';
import { GuildInternalEvent } from '../../domain/entities/guild-internal-event.entity';
import { ListEventsFilter } from './i-list-events-filter.repository';
import { GuildEventAttendance } from '../../domain/entities/guild-event-attendance.entity';

export interface IGuildRepository {
  /** Lectura */
  findBySlug(slug: string): Promise<Guild | null>;
  listPublic(search?: string): Promise<Guild[]>;
  /** Busca una hermandad por su ID */
  findById(id: string): Promise<Guild | null>;

  /** Existencia */
  existsByName(name: string): Promise<boolean>;

  /** Escritura ciclo-vida */
  createWithLeader(
    guild: Guild,
    leaderRole: GuildRole,
  ): Promise<Guild>;               // persiste también membership líder

  /** Guardar o actualizar */
  save(guild: Guild): Promise<Guild>;

  /** Guarda o actualiza una membresía */
  saveMembership(membership: GuildMembership): Promise<GuildMembership>;

  /** Eliminación pasiva */
  softDelete(id: string): Promise<void>;

  /** Devuelve la membresía activa del usuario o null */
  findMembership(userId: string, guildId: string): Promise<GuildMembership | null>;


  listRoles(guildId: string): Promise<GuildRole[]>;

  createRole(role: GuildRole): Promise<GuildRole>;
  updateRole(role: GuildRole): Promise<GuildRole>;
  deleteRole(roleId: string): Promise<void>;

  roleExistsByName(guildId: string, name: string): Promise<boolean>;
  roleExistsByPosition(guildId: string, position: number): Promise<boolean>;

  findRoleById(roleId: string): Promise<GuildRole | null>;

  roleHasMembers(roleId: string): Promise<boolean>;

  /**desplazamiento automático de posiciones de roles */
  shiftRolePositions(guildId: string, from: number, to: number, excludeId: string): Promise<void>;

  updateRolePosition(roleId: string, newPos: number): Promise<void>;

  createInvite(inv: GuildInvite): Promise<GuildInvite>;
  updateInvite(inv: GuildInvite): Promise<GuildInvite>;
  findInviteById(id: string): Promise<GuildInvite | null>;
  findInviteByHash(hash: string): Promise<GuildInvite | null>;
  listPendingInvites(guildId: string): Promise<GuildInvite[]>;

  createMembership(m: GuildMembership): Promise<GuildMembership>;
  updateMembership(m: GuildMembership): Promise<GuildMembership>;
  listMembers(guildId: string): Promise<GuildMembership[]>;
  findMembershipById(id: string): Promise<GuildMembership | null>;
  /** Devuelve la membresía del usuario sin tener en cuenta el estado o null */
  findMembershipAny(userId: string, guildId: string): Promise<GuildMembership | null>;

  countActiveMembers(guildId: string): Promise<number>;

  findLowestRole(guildId): Promise<GuildRole | null>;
  //implementar findLowestRole(guildId) aqui y en el repositorio

  createAnnouncement(a: GuildAnnouncement): Promise<GuildAnnouncement>;
  updateAnnouncement(a: GuildAnnouncement): Promise<GuildAnnouncement>;
  deleteAnnouncement(id: string): Promise<void>;
  findAnnouncement(id: string): Promise<GuildAnnouncement | null>;
  listAnnouncements(guildId: string, skip: number, take: number): Promise<GuildAnnouncement[]>;

  createPollOption(o: GuildPollOption): Promise<GuildPollOption>;
  deletePollOptions(annId: string): Promise<void>;   // utilidad al borrar/actualizar

  createVote(v: GuildVote): Promise<GuildVote>;
  deleteVote(id: string): Promise<void>;
  deleteVotesByAnnouncement(annId: string): Promise<void>;
  findVote(userId: string, annId: string): Promise<GuildVote[]>;
  findVotesByUser(annId: string, userId: string): Promise<GuildVote[]>;
  findVoteByOption(userId: string, optionId: string): Promise<GuildVote | null>;
  countVotesByOption(announcementId: string): Promise<number>;


  countAnnouncements(guildId: string): Promise<number>;

  findAnnouncementWithOptions(annId: string): Promise<GuildAnnouncement | null>;

  findExpiredOpenPolls(now: Date): Promise<GuildAnnouncement[]>;
  closePoll(id: string): Promise<void>;

  /** Inserta un evento, devuelve entidad con PK */
  createInternalEvent(ev: GuildInternalEvent): Promise<GuildInternalEvent>;

  /** Persiste cambios sobre un evento existente */
  saveInternalEvent(ev: GuildInternalEvent): Promise<GuildInternalEvent>;

  findInternalEvent(id: string): Promise<GuildInternalEvent | null>;

  listInternalEvents(
    guildId: string,
    filter: ListEventsFilter,
  ): Promise<{ items: GuildInternalEvent[]; total: number }>;

  findAttendance(eventId: string, userId: string): Promise<GuildEventAttendance | null>;
  listAttendances(eventId: string, confirmedOnly: boolean): Promise<GuildEventAttendance[]>;

  createAttendance(a: GuildEventAttendance): Promise<GuildEventAttendance>;
  saveAttendance(a: GuildEventAttendance): Promise<GuildEventAttendance>;

  countConfirmed(eventId: string): Promise<number>;

  findEventWithCreator(eventId: string): Promise<GuildInternalEvent | null>;
  sampleConfirmed(eventId: string, limit?: number): Promise<{ userId: string; username: string; charId?: string; charName?: string; charAvatar?: string; }[]>;

  // nº eventos cerrados
  completePastEvents(cutoff: Date): Promise<number>;
  // ids de eventos recién cerrados  
  findJustCompleted(cutoff: Date): Promise<string[]>;


  /** Marca como expired todas las pending con expires_at < cutoff.  
 *  Devuelve cuántas filas actualizó. */
  expireInvites(cutoff: Date): Promise<number>;


   listActiveMembershipIds(guildId: string):
  Promise<Array<{ userId: string; charId: string | null }>>;
}
