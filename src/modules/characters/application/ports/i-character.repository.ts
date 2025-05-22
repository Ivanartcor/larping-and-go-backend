import { Character } from '../../domain/entities/character.entity';
import { CharacterProperty } from '../../domain/entities/character-property.entity';
import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';
import { PublicCharacterDto } from '../../domain/dto/public-character.dto';

/**
 * Contrato de acceso al agregado “Character”.
 * Incluye operaciones sobre propiedades porque comparten transacción.
 */
export interface ICharacterRepository {
    
  /* -------- Lectura -------- */
  listByUser(userId: string): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  findBySlug(slug: string): Promise<Character | null>;
  existsNameForUser(userId: string, name: string): Promise<boolean>;

  /* -------- Escritura / ciclo de vida -------- */
  create(char: Character): Promise<Character>;          // insertar nuevo
  save(char: Character): Promise<Character>;            // actualizar
  softDelete(id: string): Promise<void>;                // marcar isActive=false

  /* -------- Propiedades estructuradas -------- */
  upsertProperty(
    charId: string,
    dto: CharacterPropertyDto,
  ): Promise<CharacterProperty>;

  removeProperty(charId: string, propertyId: string): Promise<void>;


   listProperties(charId: string): Promise<CharacterProperty[]>;
  /* -------- Proyección -------- */
  project(char: Character): PublicCharacterDto;
}
