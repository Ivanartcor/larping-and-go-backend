
// src/modules/guilds/application/queries/list-guilds.query.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { PublicGuildDto } from '../../domain/dto/public-guild.dto';

@Injectable()
export class ListGuildsQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(search?: string): Promise<PublicGuildDto[]> {
    const list = await this.guilds.listPublic(search);
    return list.map(g => ({
      id: g.id,
      slug: g.slug,
      name: g.name,
      description: g.description,
      emblemUrl: g.emblemUrl,
      memberCount: g.memberCount,
    }));
  }
}