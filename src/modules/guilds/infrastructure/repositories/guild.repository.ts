// src/modules/guilds/infrastructure/repositories/guild.repository.ts
import {
  Injectable, Inject, ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository, DataSource, ILike,
} from 'typeorm';

import { Guild, GuildPrivacy } from '../../domain/entities/guild.entity';
import { GuildRole, GuildPermission } from '../../domain/entities/guild-role.entity';
import { GuildMembership, MembershipStatus } from '../../domain/entities/guild-membership.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { IGuildRepository } from '../../application/ports/i-guild.repository';

@Injectable()
export class GuildRepository implements IGuildRepository {
  constructor(
    @InjectRepository(Guild) private readonly repo: Repository<Guild>,
    @InjectRepository(GuildRole) private readonly roles: Repository<GuildRole>,
    @InjectRepository(GuildMembership) private readonly memberships: Repository<GuildMembership>,
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


  /* ---------- Encontrar miembro ---------- */
  findMembership(userId: string, guildId: string) {
    return this.memberships.findOne({
      where: {
        user: { id: userId },
        guild: { id: guildId },
        status: MembershipStatus.ACTIVE,
      },
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

}
