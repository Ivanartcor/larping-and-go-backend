import { IsString, Length } from "class-validator";

export class ConfirmPasswordResetDto {
  @IsString()
  token!: string; // token recibido por e‑mail

  @Length(6, 32)
  newPassword!: string;
}
