// dto/change-avatar.dto.ts
import { IsString, Length } from 'class-validator';

/** Simple DTO usado en multipart—recibe la URL resultante del Storage */
export class ChangeAvatarDto {
  @IsString() @Length(10, 255)
  avatarUrl!: string;
}
