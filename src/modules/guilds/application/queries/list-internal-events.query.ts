// src/modules/guilds/application/queries/list-internal-events.query.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';

@Injectable()
export class ListInternalEventsQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId: string,
    filter  = 'upcoming',
    pageStr = '1',
  ) {
    const page = Math.max(parseInt(pageStr, 10) || 1, 1);

    if (!['upcoming', 'past', 'highlighted','all'].includes(filter))
      throw new BadRequestException('Filtro inválido');

    const perPage = 20;
    const { items, total } = await this.guilds.listInternalEvents(
      guildId,
      { type: filter as any, page, perPage },
    );

    return {
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage) || 1,
      },
      items,
    };
  }
}
