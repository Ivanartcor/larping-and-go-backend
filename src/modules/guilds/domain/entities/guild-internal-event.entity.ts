import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn, Check,
  } from 'typeorm';
  import {
    Length, Min, IsOptional, IsEnum, IsBoolean,
  } from 'class-validator';
  
  import { Guild } from './guild.entity'; 
  import { User } from '../../../users/domain/entities/user.entity';
  import { Character } from '../../../characters/domain/entities/character.entity';
  import { GuildEventAttendance } from './guild-event-attendance.entity';
  
  export enum EventStatus {
    SCHEDULED = 'scheduled',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
  }
  
  @Entity('guild_internal_events')
  @Index('ix_gie_guild_start', ['guild', 'startAt'])
  @Index('ix_gie_status', ['status'])
  @Check(`"end_at" IS NULL OR "end_at" > "start_at"`)
  export class GuildInternalEvent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ---------- Relaciones ---------- */
  
    @ManyToOne(() => Guild, (g) => g.internalEvents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild!: Guild;
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'creator_user_id' })
    creatorUser?: User;
  
    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'creator_character_id' })
    creatorCharacter?: Character;
  
    @OneToMany(() => GuildEventAttendance, (a) => a.event, { cascade: true })
    attendances?: GuildEventAttendance[];
  
    /* ---------- Datos principales ----- */
  
    @Column({ length: 120 })
    @Length(2, 120)
    title!: string;
  
    @Column({ type: 'text', nullable: true })
    @IsOptional()
    description?: string;
  
    @Column({ name: 'banner_url', type: 'text', nullable: true })
    @IsOptional()
    bannerUrl?: string;
  
    @Column({ name: 'location_text', length: 120, nullable: true })
    @IsOptional()
    locationText?: string;
  
    @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
    @IsOptional()
    latitude?: number;
  
    @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
    @IsOptional()
    longitude?: number;
  
    @Column({ name: 'start_at', type: 'timestamptz' })
    startAt!: Date;
  
    @Column({ name: 'end_at', type: 'timestamptz', nullable: true })
    endAt?: Date;
  
    @Column({ nullable: true })
    @IsOptional()
    @Min(1)
    capacity?: number;
  
    @Column({ name: 'attendee_count', default: 0 })
    attendeeCount!: number;
  
    @Column({ type: 'enum', enum: EventStatus, default: EventStatus.SCHEDULED })
    @IsEnum(EventStatus)
    status!: EventStatus;
  
    @Column({ default: false })
    @IsBoolean()
    highlighted!: boolean;
  
    /* ---------- Metadatos ------------- */
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  