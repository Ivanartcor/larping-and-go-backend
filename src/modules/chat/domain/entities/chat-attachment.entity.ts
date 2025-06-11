import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn,
  } from 'typeorm';
  import { IsUrl, Length, IsMimeType, IsInt, Min } from 'class-validator';
  
  import { ChatMessage } from './chat-message.entity';
import { Exclude } from 'class-transformer';
  
  @Entity('chat_attachments')
  @Index('ix_ca_message', ['message'])
  @Index('ix_ca_mime', ['contentType'])
  export class ChatAttachment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ---- Relación con el mensaje ---- */
    @ManyToOne(() => ChatMessage, (m) => m.attachments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'message_id' })
    @Exclude() 
    message?: ChatMessage;
  
    /* ---- Datos de archivo ---- */
    @Column({ name: 'file_url', type: 'text' })
    @IsUrl()
    fileUrl!: string;
  
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
    @IsInt() @Min(1)
    widthPx?: number;
  
    @Column({ name: 'height_px', nullable: true })
    @IsInt() @Min(1)
    heightPx?: number;
  
    /* ---- Metadatos ---- */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  }
  