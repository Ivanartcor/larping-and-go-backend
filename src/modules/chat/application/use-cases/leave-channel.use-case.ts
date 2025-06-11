import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class LeaveChannelUseCase {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}

  async execute(channelId: string, userId: string) {
    const isIn = await this.chats.isActiveParticipant(channelId, userId);
    if (!isIn) throw new ForbiddenException('No estás en el canal');

    await this.chats.leaveChannel(channelId, userId);
    return { channelId };
  }
}
