// src/modules/chat/infrastructure/repositories/chat.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Repository, DataSource, LessThan, MoreThan,
    In,
    Brackets,
    IsNull,
    ILike,
    Not,
} from 'typeorm';

import { IChatRepository } from '../../application/ports/i-chat.repository';
import { ChatChannel, ChannelType } from '../../domain/entities/chat-channel.entity';
import { ChatMessageRead } from '../../domain/entities/chat-message-read.entity';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ChatParticipant, ParticipantStatus } from '../../domain/entities/chat-participant.entity';
import { ChatAttachment } from '../../domain/entities/chat-attachment.entity';


@Injectable()
export class ChatRepository implements IChatRepository {
    constructor(
        @InjectRepository(ChatChannel) private readonly channels: Repository<ChatChannel>,
        @InjectRepository(ChatParticipant) private readonly participants: Repository<ChatParticipant>,
        @InjectRepository(ChatMessage) private readonly messages: Repository<ChatMessage>,
        @InjectRepository(ChatMessageRead) private readonly reads: Repository<ChatMessageRead>,
        @InjectRepository(ChatAttachment) private readonly attachments: Repository<ChatAttachment>,
        private readonly ds: DataSource,
    ) { }

    /* ────────── Canales ────────── */

    findChannelById(id: string) {
        return this.channels.findOne({
            where: { id },
            relations: { participants: { user: true }, guild: true },
        });
    }

    async getOrCreateDirectChannel(userA: string, userB: string,
        charA?: string, charB?: string,
    ) {
        // 1) hash determinista: encode(digest(...,'sha256'),'hex')
        const { createHash } = await import('crypto');
        const [min, max] = [userA, userB].sort();   // LEAST / GREATEST
        const hash = createHash('sha256').update(`${min}:${max}`).digest('hex');

        let chan = await this.channels.findOne({ where: { directHash: hash } });
        if (chan) return chan;

        // 2) crear dentro de una transacción
        return this.ds.transaction(async (mgr) => {
            chan = mgr.create(ChatChannel, {
                type: ChannelType.DIRECT,
                directHash: hash,
                lastMessageAt: new Date(),
            });
            chan = await mgr.save(chan);

            // participantes activos
            const p1 = mgr.create(ChatParticipant, {
                channel: chan, user: { id: userA } as any,
                //character: null, // se añadirá luego al enviar mensaje si es null
                character: charA ? { id: charA } as any : null,
            });
            const p2 = mgr.create(ChatParticipant, {
                channel: chan, user: { id: userB } as any,
                character: charB ? { id: charB } as any : null,
            });
            await mgr.save([p1, p2]);
            return chan;
        });
    }

    listUserChannels(userId: string, limit = 100, offset = 0) {
        return this.channels.query(`
    SELECT c.*,
           COALESCE(u.unread, 0) AS unread
    FROM   chat_channels c
    JOIN   chat_participants p
           ON p.channel_id = c.id AND p.user_id = $1 AND p.status = 'active'
    LEFT JOIN LATERAL (
       SELECT COUNT(*) AS unread
       FROM   chat_messages m
       WHERE  m.channel_id = c.id
         AND  m.sender_user_id <> $1
         AND  m.is_deleted = FALSE
         AND  m.sent_at >
              COALESCE( (SELECT MAX(r.read_at)
                         FROM chat_message_reads r
                         WHERE r.message_id = m.id
                           AND r.user_id = $1), 'epoch')
    ) u ON TRUE
    ORDER BY c.last_message_at DESC NULLS LAST, c.id DESC
    LIMIT  $2
    OFFSET $3;
  `, [userId, limit, offset]);
    }

    /* ─────── Participantes ─────── */

    async upsertParticipant(channelId: string, userId: string, characterId: string) {
        let part = await this.participants.findOne({
            where: { channel: { id: channelId }, user: { id: userId } },
        });
        if (part) {
            part.status = ParticipantStatus.ACTIVE;
            part.leftAt = undefined;
            if (characterId) part.character = { id: characterId } as any;
        } else {
            part = this.participants.create({
                channel: { id: channelId } as any,
                user: { id: userId } as any,
                character: characterId ? ({ id: characterId } as any) : null,
            });
        }
        return this.participants.save(part);
    }

    async leaveChannel(channelId: string, userId: string) {
        await this.participants.update(
            { channel: { id: channelId }, user: { id: userId } },
            { status: ParticipantStatus.LEFT, leftAt: () => 'now()' },
        );
    }

    /* ────────── Mensajes ───────── */

    async saveMessage(msg: ChatMessage) {
        const saved = await this.messages.save(msg);
        await this.channels.update(msg.channel.id, { lastMessageAt: saved.sentAt });
        return saved;
    }

    saveAttachment(att: ChatAttachment) {
        return this.attachments.save(att);
    }

    findAttachments(ids: string[]) {
        return this.attachments.find({
            where: { id: In(ids), message: IsNull() },   // <── import { IsNull }
        });
    }

    listMessages(channelId: string, limit: number, before?: Date) {
        const where: any = { channel: { id: channelId } };
        if (before) where.sentAt = LessThan(before);
        return this.messages.find({
            where,
            relations: { attachments: true, senderUser: true, senderCharacter: true },
            order: { sentAt: 'DESC' },
            take: limit,
        }).then(arr => arr.reverse());              // orden ascendente para UI
    }

    findMessageById(id: string) {
        return this.messages.findOne({
            where: { id },
            relations: { channel: true },
        });
    }

    /* ──────── Lecturas ─────────── */

    async markRead(messageId: string, userId: string) {
        await this.reads
            .createQueryBuilder()
            .insert()
            .values({ messageId, userId })
            .onConflict('DO NOTHING')
            .execute();
    }

    async createRead(r: ChatMessageRead) {
        await this.reads.save({
            messageId: r.messageId,
            userId: r.userId,
        }).catch(() => { });              // conflicto ⇒ ya estaba leído
    }

    lastReadMessage(channelId: string, userId: string) {
        return this.reads.createQueryBuilder('r')
            .innerJoin('r.message', 'm', 'm.channel_id = :c', { c: channelId })
            .where('r.user_id = :u', { u: userId })
            .orderBy('r.read_at', 'DESC')
            .getOne();
    }

    async hasRead(msgId: string, userId: string) {
        return this.reads.exist({ where: { messageId: msgId, userId } });
    }

    /** ¿sigue activo ese usuario en el canal? */
    isActiveParticipant(channelId: string, userId: string) {
        return this.participants.exist({
            where: {
                channel: { id: channelId },
                user: { id: userId },
                status: ParticipantStatus.ACTIVE,
            },
        });
    }

    /* Nº no leídos en un canal */
    async countUnread(chId: string, uid: string) {
        // última lectura
        const sub = this.reads.createQueryBuilder('r')
            .select('MAX(r.read_at)', 'last')
            .innerJoin('r.message', 'm', 'm.channel_id = :cid', { cid: chId })
            .where('r.user_id = :uid', { uid });

        const count = await this.messages.createQueryBuilder('m')
            .select('COUNT(*)', 'count')
            .where('m.channel_id = :cid', { cid: chId })
            .andWhere('m.sender_user_id <> :uid', { uid })
            .andWhere('m.is_deleted = FALSE')
            .andWhere('m.sent_at > COALESCE((' + sub.getQuery() + `),'epoch')`)
            .setParameters(sub.getParameters())
            .getRawOne<{ count: string }>();

        return Number(count?.count);
    }

    /* totals agrupados */
    async sumUnreadByChannel(userId: string) {
        const subQuery = this.reads.createQueryBuilder('r')
            .select('MAX(r.read_at)')
            .where('r.message_id = m.id')
            .andWhere('r.user_id = :uid', { uid: userId });

        const rows = await this.messages
            .createQueryBuilder('m')
            .select('m.channel_id', 'channelId')
            .addSelect('COUNT(*)', 'unread')
            .innerJoin('chat_participants', 'p', 'p.channel_id = m.channel_id AND p.user_id = :uid AND p.status = :status', {
                uid: userId,
                status: 'active',
            })
            .where('m.sender_user_id <> :uid', { uid: userId })
            .andWhere('m.is_deleted = FALSE')
            .andWhere(`m.sent_at > COALESCE((${subQuery.getQuery()}), 'epoch')`)
            .setParameters(subQuery.getParameters())
            .groupBy('m.channel_id')
            .getRawMany<{ channelId: string; user_id: string; unread: string }>();

        return rows.map(r => ({
            channelId: r.channelId,
            userId: r.user_id,
            unread: Number(r.unread),
        }));
    }


    /* Guild ⇒ canal “general” */
    findGuildChannel(gid: string) {
        return this.channels.findOne({
            where: { type: ChannelType.GUILD, guild: { id: gid } },
            relations: { guild: true },
        });
    }

    /* Participantes activos + orden alfabético de username (útil para UI) */
    listParticipants(cid: string) {
        return this.participants.find({
            where: { channel: { id: cid }, status: ParticipantStatus.ACTIVE },
            relations: { user: true, character: true },
            order: { user: { username: 'ASC' } },
        });
    }

    countActiveParticipants(cid: string) {
        return this.participants.count({
            where: { channel: { id: cid }, status: ParticipantStatus.ACTIVE },
        });
    }

    async updateMessage(msg: ChatMessage) {
        return this.messages.save(msg);          // persiste editedAt/isDeleted
    }


    /* Helper */
    findMessageWithAuthor(id: string) {
        return this.messages.findOne({
            where: { id },
            relations: { senderUser: true, channel: true },
        });
    }


    countGuildSubchannels(gid) {
        return this.channels.count({ where: { guild: { id: gid }, parent: Not(IsNull()) } });
    }
    topicExists(gid, topic) {
        return this.channels.exist({ where: { guild: { id: gid }, topic: ILike(topic) } });
    }
    createChannel(data) { return this.channels.save(this.channels.create(data)); }

    listGuildSubchannels(gid: string, onlyAutoSync = false) {
        const where: any = { guild: { id: gid }, parent: Not(IsNull()) };
        if (onlyAutoSync) where.autoSync = true;
        return this.channels.find({ where });
    }

    bulkInsertParticipants(cid, members) {
        return this.participants
            .createQueryBuilder().insert()
            .values(members.map(m => ({
                channel: { id: cid },
                user: { id: m.userId },
                character: m.charId ? { id: m.charId } : null
            })))
            .onConflict('DO NOTHING').execute();
    }


    findOrphanAttachments(cutoff: Date) {
        return this.attachments.createQueryBuilder('a')
            .leftJoin('a.message', 'm')
            .where('m.id IS NULL OR m.isDeleted = TRUE')
            .andWhere('a.created_at < :cut', { cut: cutoff })
            .getMany();
    }

    async deleteAttachments(ids: string[]) {
        await this.attachments.delete(ids);
    }

}
