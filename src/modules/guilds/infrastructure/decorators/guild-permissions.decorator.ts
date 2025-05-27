// src/modules/guilds/infrastructure/guards/guild-permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const GUILD_PERMS_KEY = 'guild_perms';
export const GuildPermissions = (...perms: number[]) =>
  SetMetadata(GUILD_PERMS_KEY, perms);
