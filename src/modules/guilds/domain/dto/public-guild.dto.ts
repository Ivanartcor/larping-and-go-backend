// src/modules/guilds/domain/dto/public-guild.dto.ts
export class PublicGuildDto {
  id!: string;
  slug!: string;
  name!: string;
  description?: string;
  emblemUrl?: string;
  memberCount!: number;
}