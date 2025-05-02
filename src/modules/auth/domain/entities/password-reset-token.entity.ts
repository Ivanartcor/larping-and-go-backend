/* eslint-disable @typescript-eslint/no‑unused‑vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsHash,
  IsUUID,
} from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../../../users/domain/entities/user.entity';

/**
 * Tabla `password_reset_tokens`
 *
 *  • Cada registro se usa una sola vez para restablecer la contraseña.  
 *  • El token plano nunca se guarda; sólo el hash SHA‑256/Argon2.
 */
@Entity('password_reset_tokens')
@Index('ux_prt_token_hash', ['tokenHash'], { unique: true })
@Index('ix_prt_user_id', ['user'], { where: '"user_id" IS NOT NULL' })
@Index('ix_prt_expires', ['expiresAt'])
export class PasswordResetToken {
  /* ------------------------------------------------------------------ */
  /* PK                                                                 */
  /* ------------------------------------------------------------------ */

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id!: string;

  /* ------------------------------------------------------------------ */
  /* Relaciones                                                         */
  /* ------------------------------------------------------------------ */

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  /* ------------------------------------------------------------------ */
  /* Datos del token                                                    */
  /* ------------------------------------------------------------------ */

  @Column({ name: 'token_hash', length: 255 })
  @IsHash('sha256')
  @Exclude() // nunca se expone por la API
  tokenHash!: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  @IsDate()
  expiresAt!: Date;

  @Column({ default: false })
  @IsBoolean()
  used!: boolean;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  @IsDate()
  usedAt?: Date;

  /* ------------------------------------------------------------------ */
  /* Metadatos                                                           */
  /* ------------------------------------------------------------------ */

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  /* ------------------------------------------------------------------ */
  /* Hooks                                                               */
  /* ------------------------------------------------------------------ */

  /** Garantiza que el token sólo puede crearse con fecha futura. */
  @BeforeInsert()
  validateExpiryDate() {
    if (this.expiresAt <= new Date()) {
      throw new Error('expiresAt must be a future date');
    }
  }
}
