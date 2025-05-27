// src/modules/guilds/application/queries/list-roles.query.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGuildRepository }   from '../ports/i-guild.repository';
import { GuildRole }          from '../../domain/entities/guild-role.entity';

@Injectable()
export class ListRolesQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  execute(guildId: string): Promise<GuildRole[]> {
    return this.guilds.listRoles(guildId);
  }
}
