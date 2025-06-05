import { IsOptional, IsUUID } from 'class-validator';

export class AttendanceDto {
  /** Personaje con el que se confirma (≠ activo por defecto) */
  @IsOptional() @IsUUID()
  characterId?: string;
}