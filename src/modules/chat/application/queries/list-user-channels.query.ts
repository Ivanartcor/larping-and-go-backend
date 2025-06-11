// src/modules/chat/application/queries/list-user-channels.query.ts
import { Inject, Injectable } from '@nestjs/common';
import { IChatRepository }    from '../ports/i-chat.repository';

@Injectable()
export class ListUserChannelsQuery {
  constructor(
    @Inject('CHAT_REPO') private readonly chats: IChatRepository,
  ) {}

  execute(userId: string, page = 1, perPage = 100) {
    const take = perPage;
    const skip = (page - 1) * perPage;
    return this.chats.listUserChannels(userId, take, skip);
  }
}
