import {
    Entity, ManyToOne, JoinColumn, PrimaryColumn,
    Index, CreateDateColumn,
} from 'typeorm';

import { ChatMessage } from './chat-message.entity';
import { User } from '../../../users/domain/entities/user.entity';

@Entity('chat_message_reads')
@Index('ix_cmr_user', ['user', 'readAt'])
@Index('ix_cmr_message', ['message'])
export class ChatMessageRead {
    /* --- Clave compuesta --- */
    @PrimaryColumn('uuid', { name: 'message_id' })
    messageId!: string;

    @PrimaryColumn('uuid', { name: 'user_id' })
    userId!: string;

    /* --- Relaciones --- */
    @ManyToOne(() => ChatMessage, (m) => m.reads, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'message_id' })
    message!: ChatMessage;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    /* --- Marca temporal --- */
    @CreateDateColumn({ name: 'read_at', type: 'timestamptz' })
    readAt!: Date;
}
