// src/modules/guilds/domain/dto/guild-details.dto.ts
export class GuildDetailsDto {
  id!: string;
  slug!: string;
  name!: string;
  description?: string;
  emblemUrl?: string;
  privacy!: string;
  accessType!: string;
  memberCount!: number;
}