import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, OneToMany, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn, Check,
} from 'typeorm';
import { Length, IsEnum, IsBoolean, IsOptional } from 'class-validator';

import { ChatChannel } from './chat-channel.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { Character } from '../../../characters/domain/entities/character.entity';
import { ChatAttachment } from './chat-attachment.entity';
import { ChatMessageRead } from './chat-message-read.entity';

export enum MessageType {
    TEXT = 'text',
    SYSTEM = 'system',
    MEDIA = 'media',
}

@Entity('chat_messages')
@Index('ix_cm_channel_sent', ['channel', 'sentAt'])
@Index('gin_cm_content', { synchronize: false }) // creado por SQL puro
@Check(`(
    (type = 'system' AND sender_user_id IS NULL) OR
    (type <> 'system' AND sender_user_id IS NOT NULL)
  )`)
export class ChatMessage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /* -------- Relaciones -------- */

    @ManyToOne(() => ChatChannel, (c) => c.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'channel_id' })
    channel!: ChatChannel;

    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sender_user_id' })
    senderUser?: User;

    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'sender_character_id' })
    senderCharacter?: Character;

    @ManyToOne(() => ChatMessage, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'reply_to_id' })
    @IsOptional()
    replyTo?: ChatMessage;

    @OneToMany(() => ChatAttachment, (a) => a.message, { cascade: true })
    attachments?: ChatAttachment[];

    @OneToMany(() => ChatMessageRead, (r) => r.message, { cascade: true })
    reads?: ChatMessageRead[];


    /* -------- Datos ------------ */

    @Column({ type: 'enum', enum: MessageType })
    @IsEnum(MessageType)
    type!: MessageType;

    @Column({ type: 'text' })
    @Length(1, 4000)
    content!: string;

    @Column({ name: 'sent_at', type: 'timestamptz', default: () => 'now()' })
    sentAt!: Date;

    @Column({ name: 'edited_at', type: 'timestamptz', nullable: true })
    editedAt?: Date;

    @Column({ name: 'is_deleted', default: false })
    @IsBoolean()
    isDeleted!: boolean;

    /* -------- Metadatos --------- */

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
}
