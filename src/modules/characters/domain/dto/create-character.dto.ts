// dto/create-character.dto.ts
import { IsBoolean, IsOptional, Length } from 'class-validator';
import { CharacterPropertyDto } from './character-property.dto'; 

export class CreateCharacterDto {
  @Length(2, 60)
  name!: string;

  @IsOptional() @Length(0, 5000)
  bio?: string;

  @IsOptional() @Length(0, 100000)
  backstory?: string;

  /** Visible públicamente (galería, búsquedas) */
  @IsOptional() @IsBoolean()
  visibility: boolean = true;

  /** Propiedades estructuradas opcionales en la creación */
  @IsOptional()
  properties?: CharacterPropertyDto[];
}
