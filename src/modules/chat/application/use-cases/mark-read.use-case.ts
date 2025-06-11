// src/modules/chat/application/use-cases/mark-read.use-case.ts
import {
    Inject, Injectable,
    ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';
import { ChatMessageRead } from '../../domain/entities/chat-message-read.entity';

@Injectable()
export class MarkReadUseCase {
    constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) { }

    async execute(messageId: string, userId: string) {
        /* 1. Ya está leído → nada */
        if (await this.chats.hasRead(messageId, userId)) return;

        /* 2.  Cargar mensaje aislado */
        const msg = await this.chats.findMessageById(messageId);
        if (!msg) throw new NotFoundException('Mensaje no encontrado');

        /* 3.  Verificar participación */
        const channelId = msg.channel.id;
        const isMember = await this.chats.isActiveParticipant(channelId, userId);
        if (!isMember) throw new ForbiddenException('No participas en el canal');

        /* 4.  Insertar marca de lectura (ON CONFLICT DO NOTHING en el repo) */
        await this.chats.createRead(Object.assign(new ChatMessageRead(), {
            messageId,
            userId,
        }));

        return this.chats.countUnread(msg.channel.id, userId);
    }
}
