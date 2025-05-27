// src/modules/guilds/application/queries/get-guild-internal.query.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { GuildDetailsDto }  from '../../domain/dto/guild-details.dto';

@Injectable()
export class GetGuildInternalQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(id: string): Promise<GuildDetailsDto> {
    const g = await this.guilds.findById(id);        // no privacy filter
    if (!g) throw new NotFoundException('Guild no encontrada');

    return {
      id: g.id,
      slug: g.slug,
      name: g.name,
      description: g.description,
      emblemUrl: g.emblemUrl,
      privacy: g.privacy,
      accessType: g.accessType,
      memberCount: g.memberCount,
    };
  }
}
