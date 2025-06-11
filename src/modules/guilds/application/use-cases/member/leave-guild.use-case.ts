// src/modules/guilds/application/use-cases/member/leave-guild.use-case.ts
import {
  Injectable, Inject, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository }  from '../../ports/i-guild.repository';
import { MembershipStatus }  from '../../../domain/entities/guild-membership.entity';
import { IChatRepository } from 'src/modules/chat/application/ports/i-chat.repository';

@Injectable()
export class LeaveGuildUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
        @Inject('CHAT_REPO') private readonly chats: IChatRepository,
    
  ) {}

  async execute(userId: string, guildId: string) {
    const m = await this.guilds.findMembership(userId, guildId);
    if (!m || m.status !== MembershipStatus.ACTIVE) {
      throw new NotFoundException('No perteneces a la guild');
    }
    if (m.role.isLeader) {
      throw new ForbiddenException('Debes transferir liderazgo antes de salir');
    }

    m.status = MembershipStatus.LEFT;
    m.leftAt = new Date();

            /* marcar LEFT sólo en sub-canales auto_sync = true */
        const subChannels = await this.chats.listGuildSubchannels(guildId, true); // true→autoSync
        for (const c of subChannels) {
            await this.chats.leaveChannel(c.id, m.user.id);
        }

    await this.guilds.updateMembership(m);

    m.guild.memberCount -= 1;
    await this.guilds.save(m.guild);
  }
}
