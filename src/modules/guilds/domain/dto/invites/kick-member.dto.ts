import { IsUUID } from 'class-validator';

export class KickMemberDto {
  @IsUUID() memberId!: string;
}