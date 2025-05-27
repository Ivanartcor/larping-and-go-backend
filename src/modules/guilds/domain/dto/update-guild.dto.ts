// src/modules/guilds/domain/dto/update-guild.dto.ts
import {
  Length, IsOptional, IsEnum, Matches,
} from 'class-validator';
import { GuildPrivacy, GuildAccess } from '../entities/guild.entity';

export class UpdateGuildDto {
  @IsOptional() @Length(2, 60)
  name?: string;

  @IsOptional() @Length(0, 255)
  description?: string;

  @IsOptional() @IsEnum(GuildPrivacy)
  privacy?: GuildPrivacy;

  @IsOptional() @IsEnum(GuildAccess)
  accessType?: GuildAccess;

  /** Solo relevante si accessType = 'code' */
  @IsOptional() @Matches(/^[A-Za-z0-9]{6,20}$/)
  accessCode?: string;

  @IsOptional() @Length(2, 80)
  emblemUrl?: string;
}

