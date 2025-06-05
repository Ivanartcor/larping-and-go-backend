import { IsDateString, IsInt, IsOptional, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateInternalEventDto {
  @Length(2, 120)                    title!: string;
  @IsString()                        description!: string;

  /* Fechas obligatorias */
  @IsDateString()                    startAt!: string;          // ISO-8601
  @IsDateString()                    endAt!: string;

  /* Localización opcional */
  @IsOptional() @Length(2, 120)      locationText?: string;
  @IsOptional()                      latitude?: number;         // -90..90
  @IsOptional()                      longitude?: number;        // -180..180

  /* Otros */
  @IsOptional() @IsPositive()        capacity?: number;
  @IsOptional() @Length(2, 255)      bannerUrl?: string;
  @IsOptional()                      highlighted?: boolean;
}