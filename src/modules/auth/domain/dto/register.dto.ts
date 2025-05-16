import { IsEmail, Length, IsOptional } from "class-validator";

export class RegisterDto {
  @IsEmail() email!: string;
  @Length(6, 32) password!: string;
  @Length(3, 30) username!: string;
  @IsOptional() @Length(2, 50) displayName?: string;
}
