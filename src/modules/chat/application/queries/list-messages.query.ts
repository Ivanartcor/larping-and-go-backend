// src/modules/chat/application/queries/list-messages.query.ts
import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';

@Injectable()
export class ListMessagesQuery {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) { }

  async execute(
    channelId: string,
    userId: string,
    limit: number,
    before?: Date,
  ) {
    /** Verificamos participación (guard ya lo hace, pero por si se reutiliza en WS) */
    if (!(await this.chats.isActiveParticipant(channelId, userId)))
      throw new ForbiddenException('No participas en el canal');

    /* carga “hacia atrás” → el repo ya revierte para devolver asc */
    return this.chats.listMessages(channelId, limit, before);
  }
}
