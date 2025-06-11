import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { IChatRepository } from "../ports/i-chat.repository";

// application/use-cases/join-channel.use-case.ts
@Injectable()
export class JoinChannelUseCase {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}

  async execute(channelId: string, userId: string, charId?: string) {
    const channel = await this.chats.findChannelById(channelId);
    if (!channel) throw new NotFoundException('Canal inexistente');

    /* Reactivamos o creamos el participante */
    await this.chats.upsertParticipant(channelId, userId, charId);

    return { channelId };                    // respuesta minimal para ACK
  }
}
