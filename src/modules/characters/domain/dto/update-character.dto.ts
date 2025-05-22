// dto/update-character.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

/**
 * Todas las propiedades son opcionales;
 * extendemos CreateCharacterDto con PartialType de Nest.
 */
export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
