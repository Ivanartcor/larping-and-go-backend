import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn, Check,
  } from 'typeorm';
  import { IsEnum, IsOptional } from 'class-validator';
  
  import { ChatChannel } from './chat-channel.entity';
  import { User } from '../../../users/domain/entities/user.entity';
  import { Character } from '../../../characters/domain/entities/character.entity';
  
  export enum ParticipantRole   { MEMBER = 'member', MODERATOR = 'moderator' }
  export enum ParticipantStatus { ACTIVE = 'active', LEFT = 'left' }
  
  @Entity('chat_participants')
  @Index('ux_cp_user_channel', ['channel', 'user'], { unique: true })
  @Index('ix_cp_channel_active', ['channel'], { where: `"status" = 'active'` })
  @Check(`(
    (status = 'active' AND left_at IS NULL) OR
    (status = 'left'   AND left_at IS NOT NULL)
  )`)
  export class ChatParticipant {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* --------- Relaciones ------- */
  
    @ManyToOne(() => ChatChannel, (c) => c.participants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'channel_id' })
    channel!: ChatChannel;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    /** Personaje con el que entra en el chat */
    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'character_id' })
    @IsOptional()
    character?: Character;
  
    /* --------- Datos ------------ */
  
    @Column({ type: 'enum', enum: ParticipantRole, default: ParticipantRole.MEMBER })
    @IsEnum(ParticipantRole)
    role!: ParticipantRole;
  
    @Column({ type: 'enum', enum: ParticipantStatus, default: ParticipantStatus.ACTIVE })
    @IsEnum(ParticipantStatus)
    status!: ParticipantStatus;
  
    @Column({ name: 'joined_at', type: 'timestamptz', default: () => 'now()' })
    joinedAt!: Date;
  
    @Column({ name: 'left_at', type: 'timestamptz', nullable: true })
    leftAt?: Date;
  
    /* --------- Metadatos -------- */
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  