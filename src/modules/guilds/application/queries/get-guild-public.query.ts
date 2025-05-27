// src/modules/guilds/application/queries/get-guild-public.query.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { PublicGuildDto } from '../../domain/dto/public-guild.dto';

@Injectable()
export class GetGuildPublicQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(slug: string): Promise<PublicGuildDto> {
    const g = await this.guilds.findBySlug(slug);
    if (!g) throw new NotFoundException('Guild no encontrada');

    return {
      id: g.id,
      slug: g.slug,
      name: g.name,
      description: g.description,
      emblemUrl: g.emblemUrl,
      memberCount: g.memberCount,
    };
  }
}