import { CharacterPropertyDto } from "src/modules/characters/domain/dto/character-property.dto";

export const DEFAULT_CHARACTER_PROPERTIES: CharacterPropertyDto[] = [
  { group: 'general', key: 'gender',       valueType: 'text',    value: null },
  { group: 'general', key: 'race',       valueType: 'text',    value: null },
  { group: 'social',   key: 'religion',   valueType: 'text',    value: null },
  { group: 'physical', key: 'hair_color', valueType: 'text',    value: null },
  // …añade aquí todas las que consideres base…
];