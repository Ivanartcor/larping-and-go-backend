// modules/characters/application/use-cases/list-characters.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';
import { Character } from '../../domain/entities/character.entity';

@Injectable()
export class ListCharactersUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
  ) {}

  /** Devuelve todos los personajes activos de un usuario */
  execute(userId: string): Promise<Character[]> {
    return this.chars.listByUser(userId);
  }
}
