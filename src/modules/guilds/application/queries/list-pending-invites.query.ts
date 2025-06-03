// src/modules/guilds/application/queries/list-pending-invites.query.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { GuildInvite } from '../../domain/entities/guild-invite.entity';
import { PublicInviteDto } from '../../domain/dto/invites/public-invite.dto';

@Injectable()
export class ListPendingInvitesQuery {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) { }

  execute(guildId: string): Promise<PublicInviteDto[]> {
    return this.guilds.listPendingInvites(guildId).then((invites) =>
      invites.map<PublicInviteDto>((i) => ({
        id: i.id,
        type: i.type,
        status: i.status,
        expiresAt: i.expiresAt ?? null,        
        createdAt: i.createdAt,
        sender: {
          id: i.senderUser.id,
          username: i.senderUser.username,
          displayName: i.senderUser.displayName ?? null,
        },
        target: i.targetUser
          ? {
            id: i.targetUser.id,
            username: i.targetUser.username,
            displayName: i.targetUser.displayName ?? null,
          }
          : undefined,
        email: i.email ?? null,                
      })),
    );
  }
}
