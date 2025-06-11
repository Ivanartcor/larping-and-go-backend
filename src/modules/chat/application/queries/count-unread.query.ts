import { Injectable, Inject } from "@nestjs/common";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class CountUnreadQuery {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}
  execute(channelId: string, userId: string) {
    return this.chats.countUnread(channelId, userId);
  }
}
