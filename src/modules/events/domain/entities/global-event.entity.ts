import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn, Check, BeforeInsert,
    OneToMany,
  } from 'typeorm';
  import {
    Length, IsOptional, IsEnum, IsBoolean, Min, IsUrl,
  } from 'class-validator';
  import slugify from 'slugify';
  
  import { User } from '../../../users/domain/entities/user.entity';
  import { EventCategory } from './event-category.entity'; 
  import { GlobalEventAttendance } from './global-event-attendance.entity';
import { EventMedia } from './event-media.entity';
  
  export enum EventStatus {
    SCHEDULED = 'scheduled',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
  }
  
  @Entity('global_events')
  @Index('ix_ge_cat_start', ['category', 'startAt'])
  @Index('ix_ge_status_date', ['status', 'startAt'])
  @Index('gin_ge_search', { synchronize: false })  // índice creado en SQL puro
  @Check(`(end_at IS NULL OR end_at > start_at)`)
  @Check(`((latitude IS NULL AND longitude IS NULL) OR (latitude IS NOT NULL AND longitude IS NOT NULL))`)
  @Check(`(capacity IS NULL OR capacity > 0)`)
  export class GlobalEvent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ------- Relaciones ------- */
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'creator_user_id' })
    creatorUser?: User;
  
    @ManyToOne(() => EventCategory, (c) => c.events, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category?: EventCategory;
  
    @OneToMany(() => GlobalEventAttendance, (a) => a.event, { cascade: true })
    attendances?: GlobalEventAttendance[];

    @OneToMany(() => EventMedia, (m) => m.event, { cascade: true })
    media?: EventMedia[];
  
    /* ------- Datos principales ------- */
  
    @Column({ length: 120 })
    @Length(2, 120)
    title!: string;
  
    @Column({ length: 140, unique: true })
    slug!: string;
  
    @Column({ type: 'text' })
    description!: string;
  
    @Column({ name: 'banner_url', type: 'text', nullable: true })
    @IsOptional()
    @IsUrl()
    bannerUrl?: string;
  
    @Column({ name: 'location_text', length: 120 })
    locationText!: string;
  
    @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
    latitude?: number;
  
    @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
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
    featured!: boolean;
  
    /* ------- Metadatos ------- */
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  
    /* ------- Hooks ------- */
  
    @BeforeInsert()
    generateSlug() {
      if (!this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true }).slice(0, 140);
      }
    }
  }
  