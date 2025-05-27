// src/modules/guilds/application/use-cases/delete-guild.use-case.ts
import {
  Injectable, Inject, ForbiddenException,
} from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';

@Injectable()
export class DeleteGuildUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, isLeader: boolean) {
    if (!isLeader) throw new ForbiddenException('Solo el líder puede desactivar la guild');
    await this.guilds.softDelete(guildId);
  }
}