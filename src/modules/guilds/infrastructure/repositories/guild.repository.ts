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

}
