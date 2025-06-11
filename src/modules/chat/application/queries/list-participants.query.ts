// src/modules/chat/application/queries/list-participants.query.ts
import { Injectable, Inject } from '@nestjs/common';
import { IChatRepository }   from '../ports/i-chat.repository';

@Injectable()
export class ListParticipantsQuery {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}

  execute(channelId: string) {
    return this.chats.listParticipants(channelId);
  }
}
