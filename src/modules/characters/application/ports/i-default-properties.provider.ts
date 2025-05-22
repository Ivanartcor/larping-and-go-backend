import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';

export interface IDefaultCharacterPropertiesProvider {
  /** Devuelve el array de propiedades base para cada personaje */
  getDefaults(): CharacterPropertyDto[];
}