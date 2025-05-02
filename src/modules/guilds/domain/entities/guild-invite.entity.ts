import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn,
  } from 'typeorm';
  import { IsEmail, IsOptional, IsEnum } from 'class-validator';
  import { Exclude } from 'class-transformer';
  
  import { Guild } from './guild.entity'; 
  import { User } from '../../../users/domain/entities/user.entity';
  
  export enum InviteType   { INVITE = 'invite',  REQUEST = 'request' }
  export enum InviteStatus { PENDING = 'pending', ACCEPTED = 'accepted', REJECTED = 'rejected', CANCELLED = 'cancelled', EXPIRED = 'expired' }
  
  @Entity('guild_invites')
  @Index('ix_gi_guild_status', ['guild', 'status'])
  @Index('ux_gi_token_hash', ['tokenHash'], { unique: true, where: `"token_hash" IS NOT NULL` })
  export class GuildInvite {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ------------ Relaciones principales ------------- */
  
    @ManyToOne(() => Guild, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild!: Guild;
  
    /** Quien crea la invitación o envía la solicitud */
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sender_user_id' })
    senderUser!: User;
  
    /** Jugador invitado; NULL si se invita por e-mail o link genérico */
    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'target_user_id' })
    targetUser?: User;
  
    /** Moderador que acepta/rechaza */
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'handled_by_user_id' })
    handledByUser?: User;
  
    /* ------------------- Datos ------------------------ */
  
    @Column({ type: 'enum', enum: InviteType })
    @IsEnum(InviteType)
    type!: InviteType;
  
    @Column({ length: 255, nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;
  
    /** SHA-256 del token de invitación por enlace */
    @Column({ name: 'token_hash', length: 255, nullable: true })
    @Exclude()
    tokenHash?: string;
  
    @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
    expiresAt?: Date;
  
    @Column({ type: 'enum', enum: InviteStatus, default: InviteStatus.PENDING })
    @IsEnum(InviteStatus)
    status!: InviteStatus;
  
    @Column({ name: 'handled_at', type: 'timestamptz', nullable: true })
    handledAt?: Date;
  
    /* ------------------- Metadatos -------------------- */
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  