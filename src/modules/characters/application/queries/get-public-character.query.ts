// src/modules/characters/application/queries/get-public-character.query.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PublicCharacterDto } from '../../domain/dto/public-character.dto';
import { ICharacterRepository } from '../ports/i-character.repository';

@Injectable()
export class GetPublicCharacterQuery {
  constructor(
    @Inject('CHAR_REPO')
    private readonly chars: ICharacterRepository,
  ) {}

  /**
   * Devuelve la vista pública (DTO) de un personaje por slug, solo visibility=true.
   */
  async execute(slug: string): Promise<PublicCharacterDto> {
    const char = await this.chars.findBySlug(slug);
    if (!char) throw new NotFoundException('Personaje no encontrado');
    return this.chars.project(char);
  }
}