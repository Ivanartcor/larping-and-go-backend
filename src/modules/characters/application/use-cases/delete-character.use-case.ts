import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';

@Injectable()
export class DeleteCharacterUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
  ) {}

  /**
   * Soft-delete: marca isActive=false.
   * Si falla el update (nada afectado), lanza 404.
   */
  async execute(charId: string) {
    await this.chars.softDelete(charId);
  }
}
