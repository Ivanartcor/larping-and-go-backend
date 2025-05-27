import {
  CanActivate, ExecutionContext, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IGuildRepository } from '../../application/ports/i-guild.repository';

@Injectable()
export class GuildMemberGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('GUILD_REPO')  
    private readonly guilds: IGuildRepository,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;            // ← inyectado por JwtAuthGuard
    const guildId = request.params.id;   // todas rutas fase 2 usan :id

    const membership = await this.guilds.findMembership(user.id, guildId);
    if (!membership) throw new NotFoundException('No perteneces a la hermandad');

    request.guildMembership = membership;    // adelante para otros guards
    return true;
  }
}