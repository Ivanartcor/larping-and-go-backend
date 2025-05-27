// src/modules/guilds/infrastructure/guards/guild-permissions.guard.ts
import {
  CanActivate, ExecutionContext, Injectable, ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GUILD_PERMS_KEY } from '../decorators/guild-permissions.decorator'; 
import { GuildPermission } from '../../domain/entities/guild-role.entity';

@Injectable()
export class GuildPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const required: number[] = this.reflector.get(GUILD_PERMS_KEY, ctx.getHandler()) ?? [];
    if (!required.length) return true;   // sin requisitos

    const request = ctx.switchToHttp().getRequest();
    const membership = request.guildMembership;
    const rolePerms  = membership.role.permissions;
    const isLeader   = membership.role.isLeader;

    const ok = isLeader || required.every((bit) => (rolePerms & bit) === bit);
    if (!ok) throw new ForbiddenException('Permisos insuficientes');
    return true;
  }
}