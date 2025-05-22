import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';
import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';

@Injectable()
export class UpsertPropertyUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
  ) {}

  /**
   * 1. Llama al repositorio para insertar o actualizar una property en el personaje.
   * 2. Si falta personaje, lanza NotFound.
   */
  async execute(charId: string, dto: CharacterPropertyDto) {
    try {
      return await this.chars.upsertProperty(charId, dto);
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException('Personaje no encontrado');
      }
      throw e;
    }
  }
}
