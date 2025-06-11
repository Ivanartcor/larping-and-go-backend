// src/modules/guilds/infrastructure/repositories/guild.repository.ts
import {
  Injectable, Inject, ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository, DataSource, ILike,
  LessThan,
} from 'typeorm';

import { Guild, GuildPrivacy } from '../../domain/entities/guild.entity';
import { GuildRole, GuildPermission } from '../../domain/entities/guild-role.entity';
import { GuildMembership, MembershipStatus } from '../../domain/entities/guild-membership.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { IGuildRepository } from '../../application/ports/i-guild.repository';
import { GuildInvite, InviteStatus } from '../../domain/entities/guild-invite.entity';
import { AnnouncementType, GuildAnnouncement } from '../../domain/entities/guild-announcement.entity';
import { GuildPollOption } from '../../domain/entities/guild-poll-option.entity';
import { GuildVote } from '../../domain/entities/guild-vote.entity';
import { EventStatus, GuildInternalEvent } from '../../domain/entities/guild-internal-event.entity';
import { AttendanceStatus, GuildEventAttendance } from '../../domain/entities/guild-event-attendance.entity';
import { ListEventsFilter } from '../../application/ports/i-list-events-filter.repository';

@Injectable()
export class GuildRepository implements IGuildRepository {
  constructor(
    @InjectRepository(Guild) private readonly repo: Repository<Guild>,
    @InjectRepository(GuildRole) private readonly roles: Repository<GuildRole>,
    @InjectRepository(GuildMembership) private readonly memberships: Repository<GuildMembership>,
    @InjectRepository(GuildInvite) private readonly invites: Repository<GuildInvite>,
    @InjectRepository(GuildAnnouncement) private readonly ann: Repository<GuildAnnouncement>,
    @InjectRepository(GuildPollOption) private readonly opts: Repository<GuildPollOption>,
    @InjectRepository(GuildVote) private readonly votes: Repository<GuildVote>,
    @InjectRepository(GuildInternalEvent) private readonly events: Repository<GuildInternalEvent>,
    @InjectRepository(GuildEventAttendance) private readonly attendances: Repository<GuildEventAttendance>,
    private readonly ds: DataSource,
  ) { }

  /* ---------- Lectura ---------- */

  findBySlug(slug: string) {
    return this.repo.findOne({
      where: { slug, isActive: true, privacy: GuildPrivacy.PUBLIC },
      relations: { leader: true },
    });
  }

  listPublic(search?: string) {
    const qb = this.repo.createQueryBuilder('g')
      .where('g.isActive = TRUE')
      .andWhere('g.privacy = :pub', { pub: GuildPrivacy.PUBLIC })
      .orderBy('g.memberCount', 'DESC');

    if (search) qb.andWhere({ name: ILike(`%${search}%`) });
    return qb.getMany();
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id, isActive: true },
      relations: { leader: true }
    });
  }



  /* ---------- Existencia ---------- */

  existsByName(name: string) {
    return this.repo.exist({ where: { name: ILike(name) } });
  }

  /* ---------- Escritura ---------- */

  async createWithLeader(
    guild: Guild,
    leaderRole: GuildRole,
  ) {
    return this.ds.transaction(async (manager) => {
      // 1. Persistir guild (roles cascaded)
      const savedGuild = await manager.save(Guild, guild);

      // 2. Persistir rol líder (cascade=false)
      leaderRole.guild = savedGuild;
      const savedRole = await manager.save(GuildRole, leaderRole);

      // 3. Membership líder
      const m = new GuildMembership();
      m.guild = savedGuild;
      m.user = savedGuild.leader;
      m.role = savedRole;
      m.status = MembershipStatus.ACTIVE;
      m.joinedAt = new Date();

      await manager.save(GuildMembership, m);

      return savedGuild;
    });
  }

  /* ---------- Guardar ---------- */
  save(guild: Guild) {
    return this.repo.save(guild);
  }

  saveMembership(membership: GuildMembership) {
    return this.memberships.save(membership);
  }



  /* ---------- Eliminacion pasiva ---------- */
  async softDelete(id: string) {
    const res = await this.repo.update({ id }, { isActive: false });
    if (!res.affected) throw new NotFoundException('Guild no encontrada');
  }


  /* ---------- Encontrar miembro activo por id usuario y id de hermandad---------- */
  findMembership(userId: string, guildId: string) {
    return this.memberships.findOne({
      where: {
        user: { id: userId },
        guild: { id: guildId },
        status: MembershipStatus.ACTIVE,
      },
      relations: {
        role: true,
        guild: { leader: { activeCharacter: true } },
        user: { activeCharacter: true },
      },
    });
  }

  /* ---------- Encontrar miembro sin tener en cuenta estado por id usuario y id de hermandad---------- */
  findMembershipAny(userId: string, guildId: string) {
    return this.memberships.findOne({
      where: { user: { id: userId }, guild: { id: guildId } },
      relations: { role: true, guild: true },
    });
  }

  /* ---------- Encontrar miembro por su id---------- */
  findMembershipById(id: string) {
    return this.memberships.findOne({
      where: { id },
      relations: { role: true, guild: true },
    });
  }

  /* ---------- Roles ---------- */
  listRoles(guildId: string) {
    return this.roles.find({
      where: { guild: { id: guildId } },
      order: { position: 'ASC' },
    });
  }

  async createRole(role: GuildRole) {
    return this.roles.save(role);
  }

  async updateRole(role: GuildRole) {
    return this.roles.save(role);
  }

  async deleteRole(roleId: string) {
    const { affected } = await this.roles.delete(roleId);
    if (!affected) throw new NotFoundException('Rol no encontrado');
  }

  roleExistsByName(guildId: string, name: string) {
    return this.roles.exist({
      where: { guild: { id: guildId }, name: ILike(name) },
    });
  }

  roleExistsByPosition(guildId: string, pos: number) {
    return this.roles.exist({
      where: { guild: { id: guildId }, position: pos },
    });
  }


  roleHasMembers(roleId: string) {
    return this.memberships.exist({
      where: { role: { id: roleId }, status: MembershipStatus.ACTIVE }
    }
    )
  }

  findRoleById(roleId: string) {
    return this.roles.findOne({
      where: { id: roleId }, relations: { guild: true }
    });
  }

  /* Desplazamiento de posiciones de roles*/
  async shiftRolePositions(guildId: string, from: number, to: number, excludeId: string) {
    if (from === to) return;

    const dir = to < from ? +1 : -1;
    const [min, max] = dir === +1 ? [to, from - 1] : [from + 1, to];

    await this.roles.createQueryBuilder()
      .update()
      .set({ position: () => `position + ${dir}` })
      .where('guild_id = :g AND position BETWEEN :min AND :max AND id <> :ex',
        { g: guildId, min, max, ex: excludeId })
      .execute();
  }



  async updateRolePosition(roleId: string, pos: number) {
    await this.roles.update({ id: roleId }, { position: pos });
  }


  /* ------------- Invites ------------- */
  createInvite(inv: GuildInvite) {
    return this.invites.save(inv);
  }

  updateInvite(inv: GuildInvite) {
    return this.invites.save(inv);
  }

  findInviteById(id: string) {
    return this.invites.findOne({
      where: { id },
      relations: {
        guild: true,
        senderUser: true,
        targetUser: true,
      }
    });
  }

  findInviteByHash(hash: string) {
    return this.invites.findOne({
      where: { tokenHash: hash, status: InviteStatus.PENDING },
      relations: {
        guild: true,
        senderUser: true,
        targetUser: true,
      },
    });
  }

  listPendingInvites(guildId: string) {
    return this.invites.find({
      where: { guild: { id: guildId }, status: InviteStatus.PENDING },
      order: { createdAt: 'DESC' },
      relations: {
        senderUser: true,
        targetUser: true,
      }
    });
  }

  /* ------------- Memberships ---------- */
  createMembership(m: GuildMembership) {
    return this.memberships.save(m);
  }

  updateMembership(m: GuildMembership) {
    return this.memberships.save(m);
  }

  listMembers(guildId: string) {
    return this.memberships.find({
      where: { guild: { id: guildId }, status: MembershipStatus.ACTIVE },
      relations: { user: true, role: true },
      order: { joinedAt: 'ASC' },
    });
  }

  countActiveMembers(guildId: string) {
    return this.memberships.count({
      where: { guild: { id: guildId }, status: MembershipStatus.ACTIVE },
    });
  }

  findLowestRole(guildId: string) {
    return this.roles.findOne({
      where: { guild: { id: guildId } },
      order: { position: 'DESC' },
    });
  }


  /* ---------- announcements ---------- */
  createAnnouncement(a: GuildAnnouncement) { return this.ann.save(a); }
  updateAnnouncement(a: GuildAnnouncement) { return this.ann.save(a); }
  async deleteAnnouncement(id: string) {
    await this.ann.delete(id);
    return undefined;
  }
  findAnnouncement(id: string) {
    return this.ann.findOne({
      where: { id, guild: { isActive: true } },
      relations: { pollOptions: true, guild: true },
    });
  }
  listAnnouncements(guildId: string, skip = 0, take = 20) {
    return this.ann.find({
      where: {
        guild: { id: guildId, isActive: true },
      },
      relations: {
        pollOptions: true,
        authorUser: true
      },
      order: { createdAt: 'DESC' },
      skip, take,
    });
  }

  /* ---------- poll options ---------- */
  createPollOption(o: GuildPollOption) { return this.opts.save(o); }

  async deletePollOptions(annId: string) {
    await this.opts.delete({ announcement: { id: annId } });
    return undefined;
  }

  /* ---------- votes --------- */
  createVote(v: GuildVote) {
    return this.votes.save(v);
  }

  async deleteVote(id: string) {
    await this.votes.delete(id);
    return undefined;
  }



  deleteVotesByAnnouncement(annId: string): Promise<void> {
    return this.votes                            // Repository<GuildVote>
      .delete({ announcement: { id: annId } })
      .then(() => undefined);                    // <-- garantiza void
  }

  findVote(userId: string, annId: string) {
    return this.votes.find({
      where: { user: { id: userId }, announcement: { id: annId } },
      relations: { pollOption: true },
    });
  }

  findVotesByUser(annId: string, userId: string) {
    return this.votes.find({
      where: {
        announcement: { id: annId },
        user: { id: userId },
      },
      relations: { pollOption: true },
    });
  }

  findVoteByOption(userId: string, optionId: string) {
    return this.votes.findOne({
      where: {
        user: { id: userId },
        pollOption: { id: optionId },
      },
    });
  }

  /* ---------- votes util ---------- */
  countVotesByOption(annId: string) {
    return this.votes.count({ where: { announcement: { id: annId } } });
  }

  countAnnouncements(guildId: string) {
    return this.ann.count({ where: { guild: { id: guildId } } });
  }

  findAnnouncementWithOptions(id: string) {
    return this.ann.findOne({
      where: { id },
      relations: {
        guild: true,
        authorUser: true,
        pollOptions: true,
      },
    });
  }
  findExpiredOpenPolls(now: Date) {
    return this.ann.find({
      where: {
        type: AnnouncementType.POLL,
        isClosed: false,
        closeAt: LessThan(now),
      },
      relations: { guild: true },
    });
  }

  closePoll(id: string) {
    return this.ann.update(id, { isClosed: true })
      .then(() => undefined);
  }

  /* -------- Crear evento ------------------------------------ */
  async createInternalEvent(ev: GuildInternalEvent) {
    /** usamos transacción por coherencia futura */
    return this.ds.transaction(async (manager) => {
      const saved = await manager.save(GuildInternalEvent, ev);
      return saved;
    });
  }

  /* -------- Guardar cambios --------------------------------- */
  saveInternalEvent(ev: GuildInternalEvent) {
    return this.events.save(ev);   // simple persist
  }


  async listInternalEvents(
    guildId: string,
    { type, page, perPage }: ListEventsFilter,
  ) {
    const qb = this.events.createQueryBuilder('e')
      .where('e.guild_id = :gid', { gid: guildId });

    /** filtro TIME / highlighted */
    if (type === 'upcoming') {
      qb.andWhere('e.status = :sch', { sch: 'scheduled' })
        .andWhere('e.startAt >= NOW()')
        .orderBy('e.startAt', 'ASC');
    }
    else if (type === 'past') {
      qb.andWhere('e.endAt < NOW()')
        .orderBy('e.startAt', 'DESC');
    }
    else if (type === 'highlighted') {
      qb.andWhere('e.highlighted = TRUE')
        .andWhere('e.status = :sch', { sch: 'scheduled' })
        .orderBy('e.startAt', 'ASC');
    }
    else { /* all */
      qb.orderBy('e.startAt', 'DESC');  // o ASC, como prefieras
    }

    const total = await qb.getCount();

    const items = await qb
      .skip((page - 1) * perPage)
      .take(perPage)
      .leftJoinAndSelect('e.creatorUser', 'u')
      .getMany();

    return { items, total };
  }


  async findInternalEvent(id: string) {
    return this.events.findOne({ where: { id }, relations: { guild: true } });
  }

  findAttendance(eventId: string, userId: string) {
    return this.attendances.findOne({
      where: { event: { id: eventId }, user: { id: userId } },
    });
  }

  async listAttendances(eventId: string, confirmedOnly: boolean) {
    const qb = this.attendances.createQueryBuilder('a')
      .leftJoinAndSelect('a.user', 'u')
      .leftJoinAndSelect('a.character', 'c')
      .where('a.event_id = :ev', { ev: eventId });

    if (confirmedOnly)
      qb.andWhere('a.status = :s', { s: 'confirmed' });

    // Orden: primero confirmados, luego cancelados, y por fecha asc
    qb.orderBy('a.status', 'ASC')
      .addOrderBy('a.changed_at', 'ASC');

    return qb.getMany();
  }


  createAttendance(a: GuildEventAttendance) {
    return this.attendances.save(a);
  }

  saveAttendance(a: GuildEventAttendance) {
    return this.attendances.save(a);
  }

  countConfirmed(eventId: string) {
    return this.attendances.count({
      where: { event: { id: eventId }, status: AttendanceStatus.CONFIRMED },
    });
  }

  async findEventWithCreator(id: string) {
    return this.events.findOne({
      where: { id },
      relations: {
        creatorUser: true,
        creatorCharacter: true,
        guild: true,
      },
    });
  }

  async sampleConfirmed(eventId: string, limit?: number) {
    const qb = this.attendances.createQueryBuilder('a')
      .leftJoinAndSelect('a.user', 'u')
      .leftJoinAndSelect('a.character', 'c')
      .where('a.event_id = :id', { id: eventId })
      .andWhere('a.status = :st', { st: 'confirmed' })
      .orderBy('a.changed_at', 'ASC');


    qb.select([
      'u.id           AS "userId"',
      'u.username     AS "username"',
      'c.id           AS "charId"',
      'c.name         AS "charName"',
      'c.avatar_url   AS "charAvatar"',
    ]);

    if (limit && limit > 0) qb.limit(limit);   // ⚠️ sólo si hay límite > 0

    return qb.getRawMany();
  }


  async completePastEvents(cutoff: Date) {
    const { affected } = await this.events
      .createQueryBuilder()
      .update()
      .set({ status: EventStatus.COMPLETED })
      .where('status = :s', { s: EventStatus.SCHEDULED })
      .andWhere(`
      (end_at IS NOT NULL AND end_at < :cut)
      OR (end_at IS NULL AND start_at < :cut)
    `, { cut: cutoff })
      .execute();

    return affected ?? 0;
  }

  /* ids recién cerrados (para notificaciones WebSocket, opcional) */
  findJustCompleted(cutoff: Date) {
    return this.events.createQueryBuilder('e')
      .select('e.id')
      .where('e.status = :completed', { completed: EventStatus.COMPLETED })
      .andWhere('e.updated_at >= :cut', { cut: cutoff })
      .getRawMany()
      .then(rows => rows.map(r => r.id as string));
  }

  async expireInvites(cutoff: Date) {
    const { affected } = await this.invites
      .createQueryBuilder()
      .update()
      .set({ status: InviteStatus.EXPIRED })
      .where('status = :pending', { pending: InviteStatus.PENDING })
      .andWhere('expires_at IS NOT NULL AND expires_at < :cut', { cut: cutoff })
      .execute();

    return affected ?? 0;
  }

  async listActiveMembershipIds(gid: string) {
    return this.memberships.createQueryBuilder('m')
      .select(['m.user_id  AS "userId"', 'm.active_character_id AS "charId"'])
      .where('m.guild_id = :gid AND m.status = :st', { gid, st: 'active' })
      .getRawMany();
  }


}
