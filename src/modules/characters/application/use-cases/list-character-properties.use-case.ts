// src/modules/characters/application/use-cases/list-character-properties.use-case.ts

import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';

@Injectable()
export class ListCharacterPropertiesUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
  ) {}

  /**
   * 1. Busca el personaje por id (incluye relación properties y user).
   * 2. Si no existe → 404.
   * 3. Si no pertenece al userId → 403.
   * 4. Devuelve `character.properties` (array).
   */
  async execute(userId: string, charId: string) {
    const char = await this.chars.findById(charId);
    if (!char) {
      throw new NotFoundException('Personaje no encontrado');
    }
    if (char.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para ver estas propiedades');
    }
    return char.properties ?? [];
  }
}
