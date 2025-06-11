// src/modules/chat/application/ports/i-chat.repository.ts
import { ChatChannel, ChannelType } from '../../domain/entities/chat-channel.entity';
import { ChatParticipant, ParticipantStatus } from '../../domain/entities/chat-participant.entity';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ChatMessageRead } from '../../domain/entities/chat-message-read.entity';
import { ChatAttachment } from '../../domain/entities/chat-attachment.entity';

export interface IChatRepository {

    /* ────────── Canales ────────── */

    /** Busca un canal por ID con participantes cargados */
    findChannelById(id: string): Promise<ChatChannel | null>;

    /** Devuelve (o crea) el canal directo entre dos usuarios */
    getOrCreateDirectChannel(userA: string, userB: string,  charA?: string, charB?: string): Promise<ChatChannel>;

    createChannel(data: Partial<ChatChannel>);

    countGuildSubchannels(gid);

    topicExists(gid, topic);

    listGuildSubchannels(gid, onlyAutoSync?: boolean);

    /** Lista canales de un usuario (participante active) ordenados por lastMessageAt DESC */
    listUserChannels(userId: string, limit?: number, offset?: number): Promise<ChatChannel[]>;

    /* ─────── Participantes ─────── */

    /** Añade participante (o reactiva si estaba LEFT) */
    upsertParticipant(channelId: string, userId: string, characterId?: string): Promise<ChatParticipant>;

    /** Cambia status a LEFT (+ marca leftAt) */
    leaveChannel(channelId: string, userId: string): Promise<void>;

    isActiveParticipant(channelId: string, userId: string): Promise<boolean>;


    bulkInsertParticipants(channelId, members: { userId; charId }[]);
    /* ────────── Mensajes ───────── */

    /** Inserta un mensaje y actualiza lastMessageAt */
    saveMessage(msg: ChatMessage): Promise<ChatMessage>;

    saveAttachment(att: ChatAttachment): Promise<ChatAttachment>

    findAttachments(ids: string[]): Promise<ChatAttachment[]>;

    /** Paginación hacia atrás: los N mensajes anteriores a `before` (o últimos) */
    listMessages(
        channelId: string,
        limit: number,
        before?: Date,
    ): Promise<ChatMessage[]>;

    /* helper opcional para MarkReadUseCase */
    findMessageById(id: string): Promise<ChatMessage | null>;

    /* ──────── Lecturas ─────────── */

    /** Marca un mensaje como leído (insert on conflict do nothing) */
    markRead(messageId: string, userId: string): Promise<void>;

    /** Inserta la marca; si ya existe no hace nada */
    createRead(read: ChatMessageRead): Promise<void>;

    /** Último mensaje leído por el usuario en ese canal */
    lastReadMessage(channelId: string, userId: string): Promise<ChatMessageRead | null>;

    /** ¿El usuario ya leyó ese mensaje? */
    hasRead(messageId: string, userId: string): Promise<boolean>;

    /* Número de mensajes sin leer para un user en un canal concreto */
    countUnread(channelId: string, userId: string): Promise<number>

    /* Resumen global: array { channelId, unread } */
    sumUnreadByChannel(userId: string): Promise<{ channelId: string, userId: string, unread: number }[]>

    /** Devuelve el canal “general” de una guild (type='guild') */
    findGuildChannel(guildId: string): Promise<ChatChannel | null>;
    listParticipants(channelId: string): Promise<ChatParticipant[]>;
    countActiveParticipants(channelId: string): Promise<number>;


    updateMessage(msg: ChatMessage): Promise<ChatMessage>;

    findMessageWithAuthor(id: string): Promise<ChatMessage | null>;


    findOrphanAttachments(cutoff: Date): Promise<ChatAttachment[]>;
    deleteAttachments(ids: string[]): Promise<void>;


}
