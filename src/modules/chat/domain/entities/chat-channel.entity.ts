import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn, Check,
  } from 'typeorm';
  import { IsEnum, IsOptional, IsBoolean, Length } from 'class-validator';
  
  import { Guild } from 'src/modules/guilds/domain/entities/guild.entity';
  import { ChatParticipant } from './chat-participant.entity';
  import { ChatMessage } from './chat-message.entity'; 
  
  export enum ChannelType {
    DIRECT = 'direct',
    GUILD  = 'guild',
  }
  
  @Entity('chat_channels')
  @Index('ix_cc_guild', ['guild'])
  @Index('ix_cc_lastmsg', ['lastMessageAt'])
  @Index('ux_cc_direct_hash', ['directHash'], { unique: true, where: `"type" = 'direct'` })
  @Check(`(
    (type = 'guild'  AND guild_id IS NOT NULL AND direct_hash IS NULL) OR
    (type = 'direct' AND guild_id IS NULL     AND direct_hash IS NOT NULL)
  )`)
  export class ChatChannel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ------------- Tipo de canal -------------- */
    @Column({ type: 'enum', enum: ChannelType })
    @IsEnum(ChannelType)
    type!: ChannelType;
  
    /* ------------- Guild  (solo grupos) ------- */
    @ManyToOne(() => Guild, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild?: Guild;
  
    /* ------------- Direct hash (solo direct) --- */
    @Column({ name: 'direct_hash', length: 64, nullable: true })
    @IsOptional()
    directHash?: string;
  
    /* ------------- Datos opcionales ------------ */
    @Column({ length: 120, nullable: true })
    @IsOptional()
    @Length(1, 120)
    topic?: string;
  
    @Column({ name: 'last_message_at', type: 'timestamptz', nullable: true })
    lastMessageAt?: Date;
  
    @Column({ name: 'is_archived', default: false })
    @IsBoolean()
    isArchived!: boolean;
  
    /* ------------- Relaciones ------------------ */
    @OneToMany(() => ChatParticipant, (p) => p.channel, { cascade: true })
    participants?: ChatParticipant[];
  
    @OneToMany(() => ChatMessage, (m) => m.channel, { cascade: true })
    messages?: ChatMessage[];
  
    /* ------------- Metadatos ------------------- */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  