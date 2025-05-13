import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn,
  } from 'typeorm';
  import { IsUrl, Length, IsMimeType, IsInt, Min, IsOptional } from 'class-validator';
  
  import { GlobalEvent } from './global-event.entity';
  import { User } from '../../../users/domain/entities/user.entity';
  
  @Entity('event_media')
  @Index('ix_em_event_pos', ['event', 'position'])
  @Index('ix_em_mime', ['contentType'])
  export class EventMedia {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ---------- Relaciones ---------- */
    @ManyToOne(() => GlobalEvent, (e) => e.media, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event!: GlobalEvent;
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'uploader_user_id' })
    uploaderUser?: User;
  
    /* ---------- Datos de archivo ----- */
    @Column({ name: 'file_url', type: 'text' })
    @IsUrl()
    fileUrl!: string;
  
    @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
    @IsOptional() @IsUrl()
    thumbnailUrl?: string;
  
    @Column({ name: 'file_name', length: 140 })
    @Length(1, 140)
    fileName!: string;
  
    @Column({ name: 'content_type', length: 100 })
    @IsMimeType()
    contentType!: string;
  
    @Column({ name: 'size_bytes', type: 'bigint' })
    @IsInt() @Min(1)
    sizeBytes!: number;
  
    @Column({ name: 'width_px', nullable: true })
    @IsOptional() @IsInt() @Min(1)
    widthPx?: number;
  
    @Column({ name: 'height_px', nullable: true })
    @IsOptional() @IsInt() @Min(1)
    heightPx?: number;
  
    @Column({ length: 200, nullable: true })
    @IsOptional() @Length(1, 200)
    caption?: string;
  
    @Column({ default: 0 })
    @IsInt() @Min(0)
    position!: number;
  
    /* ---------- Metadatos ------------ */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  }
  