// src/modules/characters/application/use-cases/update-character.use-case.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UpdateCharacterDto } from '../../domain/dto/update-character.dto';
import { PublicCharacterDto } from '../../domain/dto/public-character.dto';
import { Character } from '../../domain/entities/character.entity';
import { ICharacterRepository } from '../ports/i-character.repository';
import { Slug } from '../../domain/value-objects/slug.vo';

@Injectable()
export class UpdateCharacterUseCase {
  constructor(
    @Inject('CHAR_REPO')
    private readonly chars: ICharacterRepository,
  ) {}

  /**
   * Actualiza campos de un personaje existente.
   * - Verifica existencia.
   * - Valida cambio de nombre.
   * - Aplica modificaciones y guarda.
   */
  async execute(
    characterId: string,
    dto: UpdateCharacterDto,
  ): Promise<PublicCharacterDto> {
    //  Obtener personaje
    const char = await this.chars.findById(characterId);
    if (!char) throw new NotFoundException('Personaje no encontrado');

    //  Si cambia nombre, comprobar duplicado
    if (dto.name && dto.name !== char.name) {
      if (await this.chars.existsNameForUser(char.user.id, dto.name)) {
        throw new ConflictException('Ya existe otro personaje con ese nombre');
      }
      char.name = dto.name;
      // slug regenerará en BeforeInsert? o mantén antiguo si no importa
      char.slug = Slug.create(dto.name).toString();
    }

    //  Otros campos opcionales
    if (dto.bio !== undefined)      char.bio = dto.bio;
    if (dto.backstory !== undefined) char.backstory = dto.backstory;
    if (dto.visibility !== undefined) char.visibility = dto.visibility;

    //  Guardar y devolver proyecto público
    const updated = await this.chars.save(char);
    return this.chars.project(updated);
  }
}