import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  AfterInsert,
  Check,
} from 'typeorm';
import {
  Length,
  IsOptional,
  IsEnum,
  IsBoolean,
  Min,
  IsInt,
} from 'class-validator';
import { User } from '../../../users/domain/entities/user.entity';
import { GuildRole } from './guild-role.entity';
import { GuildMembership } from './guild-membership.entity';
import { GuildAnnouncement } from './guild-announcement.entity';

import { Exclude } from 'class-transformer';
import { GuildInternalEvent } from './guild-internal-event.entity';


/** Enums TS (deben coincidir con los ENUM SQL) */
export enum GuildPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
export enum GuildAccess {
  PUBLIC = 'public',   // cualquiera puede unirse
  INVITE = 'invite',   // sólo por invitación
  CODE = 'code',     // requiere código
}

@Entity('guilds')
@Index('ux_guild_name', ['name'], { unique: true })
@Index('ux_guild_slug', ['slug'], { unique: true })
@Index('ix_guild_leader', ['leader'])
@Check(`"member_count" >= 1`)
/*
 * Si finalmente añades un trigger que compruebe que leader_user_id pertenece
 * a guild_memberships y al rol líder, podrás eliminar la lógica del servicio.
 * Ejemplo SQL (comentado):
 * CHECK ( EXISTS (
 *     SELECT 1 FROM guild_memberships gm
 *     JOIN   guild_roles gr ON gr.id = gm.role_id AND gr.is_leader = TRUE
 *     WHERE  gm.user_id = leader_user_id AND gm.guild_id = id
 * ) )
 */
export class Guild {
  /* ------------------------------------------------------------------ */
  /* PK                                                                 */
  /* ------------------------------------------------------------------ */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /* ------------------------------------------------------------------ */
  /* Datos básicos                                                      */
  /* ------------------------------------------------------------------ */
  @Column({ length: 60 })
  @Length(2, 60)
  name!: string;

  @Column({ length: 80, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  description?: string;

  @Column({ name: 'emblem_url', type: 'text', nullable: true })
  @IsOptional()
  emblemUrl?: string;

  /* ------------------------------------------------------------------ */
  /* Lore y normas                                                      */
  /* ------------------------------------------------------------------ */
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  rules?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  history?: string;

  /* ------------------------------------------------------------------ */
  /* Configuración de privacidad y acceso                               */
  /* ------------------------------------------------------------------ */
  @Column({ type: 'enum', enum: GuildPrivacy, default: GuildPrivacy.PUBLIC })
  @IsEnum(GuildPrivacy)
  privacy!: GuildPrivacy;

  @Column({
    name: 'access_type',
    type: 'enum',
    enum: GuildAccess,
    default: GuildAccess.PUBLIC,
  })
  @IsEnum(GuildAccess)
  accessType!: GuildAccess;

  /** Hash SHA-256 del código (no se expone) */
  @Column({ name: 'access_code_hash', length: 255, nullable: true })
  @Exclude()
  accessCodeHash?: string;

  /* ------------------------------------------------------------------ */
  /* Relaciones                                                         */
  /* ------------------------------------------------------------------ */

  /** Usuario que ostenta el rol “Líder”. */
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'leader_user_id' })
  leader!: User;

  @OneToMany(() => GuildRole, (role) => role.guild, { cascade: true })
  roles?: GuildRole[];

  @OneToMany(() => GuildMembership, (m) => m.guild)
  memberships?: GuildMembership[];

  @OneToMany(() => GuildAnnouncement, (a) => a.guild)
  announcements?: GuildAnnouncement[];

  /** Eventos internos (entrenamientos, reuniones, etc.) de la hermandad */
  @OneToMany(() => GuildInternalEvent, (e) => e.guild, { cascade: true })
  internalEvents?: GuildInternalEvent[];

  /* ------------------------------------------------------------------ */
  /* Métricas y flags                                                   */
  /* ------------------------------------------------------------------ */
  @Column({ name: 'member_count', default: 1 })
  @IsInt()
  @Min(1)
  memberCount!: number;

  @Column({ name: 'is_active', default: true })
  @IsBoolean()
  isActive!: boolean;

  /* ------------------------------------------------------------------ */
  /* Timestamps                                                         */
  /* ------------------------------------------------------------------ */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  /* ------------------------------------------------------------------ */
  /* Hooks y utilidades                                                 */
  /* ------------------------------------------------------------------ */

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
  }

  /**
   * Tras crear la hermandad, el servicio debe insertar la membership del líder.
   * Aquí lanzamos un evento de dominio (o se deja en blanco si usas CQRS).
   */
  @AfterInsert()
  emitCreatedEvent() {
    /* placeholder: DomainEvents.dispatch(new GuildCreatedEvent(this.id)) */
  }

  /**
   * Lógica de traspaso de liderazgo (debe ejecutarse en servicio
   * con transacción; aquí definimos sólo la firma para centralizar reglas).
   */
  transferLeadership(newLeader: User) {
    if (newLeader.id === this.leader.id) return;
    this.leader = newLeader;
  }
}
