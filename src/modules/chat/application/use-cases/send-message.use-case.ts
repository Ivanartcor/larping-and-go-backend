// src/modules/chat/application/use-cases/send-message.use-case.ts
import {
    Inject, Injectable,
    ForbiddenException, BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';
import { SendMessageDto } from '../../domain/dto/send-message.dto';
import {
    ChatMessage, MessageType,
} from '../../domain/entities/chat-message.entity';
import { ChatAttachment } from '../../domain/entities/chat-attachment.entity';

@Injectable()
export class SendMessageUseCase {
    constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) { }

    /**
   * Envía un mensaje a un canal (texto y/o adjuntos).
   *
   * Reglas de negocio:
   * ──────────────────────────────────────────────────────────
   * 1. El usuario debe ser participante ACTIVO del canal.
   * 2. Solo se permiten MessageType.TEXT o MEDIA (SYSTEM reservado).
   * 3. Máx 10 adjuntos por mensaje.
   * 4. Un mensaje es válido cuando se cumple:
   *      (content ⩾ 1 carácter)  OR  (≥1 adjuntos)
   * 5. Si type = MEDIA  ⇒  al menos 1 adjunto obligatorio.
   * 6. Los adjuntos referenciados deben existir y NO estar ya vinculados
   *    a otro mensaje.
   * 7. replyToId (si viene) debe pertenecer al mismo canal.
   */
    async execute(
        channelId: string,
        userId: string,
        dto: SendMessageDto,
        charId: string | undefined,
        
    ) {
        /* 1. Seguridad extra: pertenece al canal */
        const ok = await this.chats.isActiveParticipant(channelId, userId);
        if (!ok) throw new ForbiddenException('No participas en el canal');

        /* 0 ─ asegurar que el participant tiene su máscara */
        await this.chats.upsertParticipant(channelId, userId, charId);

        /* 2. Sólo TEXT o MEDIA de momento */
        if (![MessageType.TEXT, MessageType.MEDIA].includes(dto.type))
            throw new BadRequestException('Tipo de mensaje no soportado');


        if (dto.attachments?.length && dto.attachments.length > 10)
            throw new BadRequestException('Máx 10 adjuntos');

        /* 4 ─ Validar combinación content / adjuntos */
        const hasContent = dto.content?.trim().length ?? 0;
        const attaches = dto.attachments ?? [];
        const hasAssets = attaches.length > 0;

        if (!hasContent && !hasAssets)
            throw new BadRequestException('El mensaje está vacío');

        if (dto.type === MessageType.MEDIA && !hasAssets)
            throw new BadRequestException('Un mensaje MEDIA necesita al menos un adjunto');


        /* 5 ─ Cargar y verificar adjuntos (si hay) */
        let attachmentEntities: ChatAttachment[] = [];
        if (hasAssets) {
            const ids = attaches.map(a => a.fileId);
            attachmentEntities = await this.chats.findAttachments(ids);

            if (attachmentEntities.length !== ids.length)
                throw new BadRequestException('Algún adjunto no existe');

            /* Evitar que un mismo adjunto se envíe dos veces */
            const alreadyLinked = attachmentEntities.find(a => a.message);
            if (alreadyLinked)
                throw new BadRequestException(
                    `El archivo ${alreadyLinked.fileName} ya está asociado a otro mensaje`,
                );
        }

        /* 6 ─ Si hay replyTo, comprobar que esté en el mismo canal */
        let reply: ChatMessage | null;
        if (dto.replyToId) {
            reply = await this.chats.findMessageById(dto.replyToId);
            if (!reply || reply.channel.id !== channelId)
                throw new NotFoundException('Mensaje citado inexistente');
        }

        const msg = new ChatMessage();
        msg.channel = { id: channelId } as any;
        msg.senderUser = { id: userId } as any;
        msg.senderCharacter = charId ? ({ id: charId } as any) : undefined;
        msg.type = dto.type;
        msg.content = dto.content?.trim() ?? '';
        msg.replyTo = dto.replyToId ? ({ id: dto.replyToId } as any) : undefined;
        msg.attachments = attachmentEntities;

        /* 8 ─ Vincular adjuntos → message antes de guardar */
        attachmentEntities.forEach(a => (a.message = msg));

        /* 9 ─ Persistir (cascade guarda adjuntos) */
        const saved = await this.chats.saveMessage(msg);
        /* 10. El trigger SQL actualiza last_message_at automáticamente */

        return saved; // Devuelve entidad completa (controlador la serializa)
    }
}
