import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateInviteDto {
  /** Puede ser userId (inv. directa) o email */
  @IsOptional() @IsUUID() targetUserId?: string;
  @IsOptional() @IsEmail() email?: string;
  /** Caducidad en horas (opcional) */
  @IsOptional() expiresInHours?: number;
}