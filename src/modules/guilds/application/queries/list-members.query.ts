// src/modules/guilds/application/queries/list-members.query.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGuildRepository }   from '../ports/i-guild.repository';
import { GuildMembership }    from '../../domain/entities/guild-membership.entity';

@Injectable()
export class ListMembersQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  execute(guildId: string): Promise<GuildMembership[]> {
    return this.guilds.listMembers(guildId);
  }
}
