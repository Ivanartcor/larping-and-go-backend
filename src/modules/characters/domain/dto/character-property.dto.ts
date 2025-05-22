// dto/character-property.dto.ts
import { IsIn, IsOptional, Length, Min } from 'class-validator';

export class CharacterPropertyDto {
  @IsIn(['physical', 'social', 'general', 'relation', 'custom'])
  group!: string;

  @Length(1, 50)
  key!: string;

  // value: string | number | boolean | unknown[]
  value!: unknown;

  @IsIn(['text', 'number', 'boolean', 'list'])
  valueType!: string;

  @IsOptional() @Min(0)
  order?: number;
}
