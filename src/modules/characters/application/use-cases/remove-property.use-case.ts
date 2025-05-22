import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';

@Injectable()
export class RemovePropertyUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
  ) {}

  /**
   * 1. Pide al repo borrar la propiedad por ID.
   * 2. Si no existe, salta NotFound.
   */
  async execute(charId: string, propId: string) {
    try {
      await this.chars.removeProperty(charId, propId);
    } catch (e) {
      throw new NotFoundException('Propiedad no encontrada');
    }
  }
}
