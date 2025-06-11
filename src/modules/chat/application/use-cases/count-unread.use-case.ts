import { Injectable, Inject } from "@nestjs/common";
import { UnreadItem } from "../../domain/dto/unread-summary.dto";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class CountUnreadUseCase {
  constructor(@Inject('CHAT_REPO') private readonly chat: IChatRepository) {}

  countChannel(channelId: string, userId: string) {
    return this.chat.countUnread(channelId, userId)
      .then(n => ({ unread: n }));
  }

  async summary(userId: string) {
    const rows = await this.chat.sumUnreadByChannel(userId);
    return rows as UnreadItem[];
  }
}
