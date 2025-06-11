/*
// src/modules/chat/application/use-cases/join-guild-channel.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';

@Injectable()
export class JoinGuildDefaultChannelUseCase {
  constructor(@Inject('CHAT_REPO') private readonly chats: IChatRepository) {}

  async execute(guildId: string, userId: string, charId?: string) {
    /* 1. Encontrar canal general 
    const chan = await this.chats.findGuildDefaultChannel(guildId);
    if (!chan) throw new NotFoundException('Canal de guild no encontrado');

    /* 2. Upsert participante 
    await this.chats.upsertParticipant(chan.id, userId, charId ?? null);

    /* 3. (opcional) → devolver id para navegar 
    return { channelId: chan.id };
  }
}
//(Podrás llamar a este UC desde el Membership Service cuando cambie el estado a ACTIVE).
*/