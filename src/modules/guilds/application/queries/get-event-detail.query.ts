// src/modules/guilds/application/queries/get-event-detail.query.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';

@Injectable()
export class GetEventDetailQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, eventId: string) {
    const ev = await this.guilds.findEventWithCreator(eventId);
    if (!ev || ev.guild.id !== guildId)
      throw new NotFoundException('Evento no encontrado');

    const sample = await this.guilds.sampleConfirmed(eventId);
    const total  = ev.attendeeCount;          // mantenido por trigger

    return {
      event: ev,
      confirmedPreview: {
        total,
        sample: sample.map(s => ({
          userId   : s.userId,
          username : s.username,
          character: s.charId ? {
            id       : s.charId,
            name     : s.charName,
            avatarUrl: s.charAvatar,
          } : undefined,
        })),
      },
    };
  }
}
