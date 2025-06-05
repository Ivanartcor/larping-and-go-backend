// src/modules/guilds/application/queries/list-attendances.query.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';

@Injectable()
export class ListAttendancesQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId : string,
    eventId : string,
    filter  = 'confirmed',
  ) {
    /* 1 Comprobar que el evento pertenece a la guild */
    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId)
      throw new NotFoundException('Evento no encontrado');

    /* 2 Obtener asistencias */
    const confirmedOnly = filter !== 'all';
    return this.guilds.listAttendances(eventId, confirmedOnly);
  }
}
