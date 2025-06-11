import { IsUUID, IsOptional, Length } from "class-validator";

export class AttachmentDto {
  @IsUUID() fileId!: string;          // futuro: referencia al micro-servicio de storage
  @IsOptional() @Length(1,140) fileName?: string;
}
