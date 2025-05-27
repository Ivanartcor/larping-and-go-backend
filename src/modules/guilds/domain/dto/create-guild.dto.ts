// src/modules/guilds/domain/dto/create-guild.dto.ts
import {
  Length, IsOptional, IsEnum, Matches,
} from 'class-validator';
import { GuildPrivacy, GuildAccess } from '../entities/guild.entity';

export class CreateGuildDto {
  @Length(2, 60)
  name!: string;

  @IsOptional()
  @Length(0, 255)
  description?: string;

  @IsOptional()
  @IsEnum(GuildPrivacy)
  privacy?: GuildPrivacy;

  @IsOptional()
  @IsEnum(GuildAccess)
  accessType?: GuildAccess;

  @IsOptional()
  /* Solo requerido si accessType = 'code' */
  @Matches(/^[A-Za-z0-9]{6,20}$/)
  accessCode?: string;
}