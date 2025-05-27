// src/modules/guilds/application/ports/i-guild.repository.ts
import { Guild } from '../../domain/entities/guild.entity';
import { GuildRole } from '../../domain/entities/guild-role.entity';
import { GuildMembership } from '../../domain/entities/guild-membership.entity';

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



}
