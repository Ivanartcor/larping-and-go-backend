import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';

@Injectable()
export class OpenDirectChannelUseCase {
  constructor(
    @Inject('CHAT_REPO') private readonly chats: IChatRepository,
  ) {}

  /**
   * Devuelve el canal directo entre userId y targetId;
   * si no existe lo crea junto con los participantes.
   * Valida que userId ≠ targetId.
   */
  async execute(
    userId   : string,
    targetId : string,
    charId   : string | undefined,  // máscara del emisor
  ) {
    if (userId === targetId)
      throw new ForbiddenException('No puedes abrir chat contigo mismo');

    /* crea | recupera canal y participantes */
    const channel = await this.chats.getOrCreateDirectChannel(userId, targetId, charId);

    /* nos aseguramos de que el caller está ACTIVE */
    await this.chats.upsertParticipant(channel.id, userId, charId);

    return channel;              // entidad completa (con participants)
  }
}
