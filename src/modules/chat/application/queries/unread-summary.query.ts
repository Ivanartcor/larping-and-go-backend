import { Injectable, Inject } from "@nestjs/common";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class UnreadSummaryQuery {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}
  execute(userId: string) {
    return this.chats.sumUnreadByChannel(userId);
  }
}