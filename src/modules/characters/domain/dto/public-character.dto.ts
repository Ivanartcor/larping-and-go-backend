// dto/public-character.dto.ts
export class PublicCharacterDto {
  id!: string;
  name!: string;
  slug!: string;
  avatarUrl?: string;
  bio?: string;
}
