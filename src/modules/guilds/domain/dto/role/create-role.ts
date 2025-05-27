import {
  Length, IsHexColor, IsInt, Min, Max, IsOptional,
} from 'class-validator';

export class CreateRoleDto {
  @Length(2, 40) name!: string;
  @IsHexColor() color!: string;
  @IsOptional() icon?: string;

  /** ≥ 1, nunca 0 (reservado al líder) */
  @IsInt() @Min(1) position!: number;

  /** Máscara 0-127 */
  @IsInt() @Min(0) @Max(127) permissions!: number;
}