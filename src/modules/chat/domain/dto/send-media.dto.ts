// send-media.dto.ts
import { IsOptional, Length } from 'class-validator';
export class SendMediaDto {
  @IsOptional() @Length(0, 4000)
  caption?: string;
}