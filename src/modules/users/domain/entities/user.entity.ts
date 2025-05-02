/* eslint-disable @typescript-eslint/no‑unused‑vars */
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
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, Length, IsOptional, IsBoolean } from 'class-validator';
import { Character } from 'src/modules/characters/domain/entities/character.entity';
import { Guild } from 'src/modules/guilds/domain/entities/guild.entity';
import { GuildMembership } from 'src/modules/guilds/domain/entities/guild-membership.entity';


/**
 * Tabla `users`
 *
 *  – Representa a la persona real (cuenta privada).
 *  – Su representación pública se controla mediante `activeCharacter`.
 */
@Entity('users')
@Index('ux_users_email', ['email'], { unique: true })
@Index('ux_users_username', ['username'], { unique: true })
@Index('ix_users_active_char', ['activeCharacter'], { where: '"active_character_id" IS NOT NULL' })
export class User {
  /* ------------------------------------------------------------------ */
  /* PK / BÁSICOS                                                       */
  /* ------------------------------------------------------------------ */

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  @IsEmail()
  email!: string;

  /** Hash Argon2 / BCrypt – se excluye del serializado JSON */
  @Column({ name: 'password_hash', length: 255 })
  @Exclude()
  passwordHash!: string;

  @Column({ length: 30 })
  @Length(3, 30)
  username!: string;

  @Column({ name: 'display_name', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
  displayName?: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  @IsOptional()
  avatarUrl?: string;

  @Column({ length: 10, default: 'es' })
  locale!: string;

  /* ------------------------------------------------------------------ */
  /* FLAGS Y ESTADO                                                     */
  /* ------------------------------------------------------------------ */

  @Column({ name: 'is_email_verified', default: false })
  @IsBoolean()
  isEmailVerified!: boolean;

  @Column({ name: 'is_admin', default: false })
  @IsBoolean()
  isAdmin!: boolean;

  /** Soft‑delete lógico: si es false la cuenta se considera desactivada */
  @Column({ name: 'is_active', default: true })
  @IsBoolean()
  isActive!: boolean;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;

  /* ------------------------------------------------------------------ */
  /* RELACIONES                                                         */
  /* ------------------------------------------------------------------ */

  @OneToMany(() => Character, (c) => c.user, { cascade: false })
  characters?: Character[];

  /** Personaje que se muestra públicamente como “máscara” activa */
  @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'active_character_id' })
  activeCharacter?: Character;

  /** Membresías del usuario en distintas hermandades */
  @OneToMany(() => GuildMembership, (gm) => gm.user)
  guildMemberships?: GuildMembership[];

  /** Hermandades de las que este usuario es líder */
  @OneToMany(() => Guild, (g) => g.leader)
  guildsLed?: Guild[];


  /* ------------------------------------------------------------------ */
  /* METADATOS                                                          */
  /* ------------------------------------------------------------------ */

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  /* ------------------------------------------------------------------ */
  /* HOOKS DE ENTIDAD (opcional)                                        */
  /* ------------------------------------------------------------------ */

  /**
   * Ejemplo: asegurar que el email se guarda en minúsculas.
   * El hash debe generarse en el servicio de Auth, no aquí, para
   * evitar dependencia de la librería de hashing dentro de la entidad.
   */
  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email.toLowerCase();
  }
}
