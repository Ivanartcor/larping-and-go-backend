import {
  Injectable, NotFoundException, ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import {
  InjectRepository,
} from '@nestjs/typeorm';
import {
  DataSource, Repository, FindOptionsWhere, MoreThan,
} from 'typeorm';

import { Character } from '../../domain/entities/character.entity';
import { CharacterProperty } from '../../domain/entities/character-property.entity';
import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';
import { PublicCharacterDto } from '../../domain/dto/public-character.dto';
import { ICharacterRepository } from '../../application/ports/i-character.repository';

@Injectable()
export class CharacterRepository implements ICharacterRepository {
  constructor(
    @InjectRepository(Character)
    private readonly repo: Repository<Character>,

    @InjectRepository(CharacterProperty)
    private readonly propRepo: Repository<CharacterProperty>,

    private readonly ds: DataSource,
  ) { }

  /* ---------- Lectura ---------- */

  listByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId }, isActive: true },
      order: { createdAt: 'DESC' },
      relations: { properties: true },
    });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id, isActive: true },
      relations: { properties: true, user: true },
    });
  }

  findBySlug(slug: string) {
    return this.repo.findOne({
      where: { slug, isActive: true, visibility: true },
      relations: { properties: true, user: true },
    });
  }

  existsNameForUser(userId: string, name: string) {
    return this.repo.exist({
      where: { user: { id: userId }, name, isActive: true },
    });
  }

  /* ---------- Escritura ---------- */

  create(char: Character) {
    return this.repo.save(char);
  }

  save(char: Character) {
    return this.repo.save(char);
  }

  /** Soft-delete ⇒ isActive=false */
  async softDelete(id: string) {
    const ok = await this.repo.update({ id }, { isActive: false });
    if (!ok.affected) throw new NotFoundException('Character not found');
  }

  /* ---------- Propiedades ---------- */

  async upsertProperty(
    charId: string,
    dto: CharacterPropertyDto,
  ): Promise<CharacterProperty> {
    return this.ds.transaction(async (manager) => {
      /** Verifica pertenencia */
      const char = await manager.getRepository(Character).findOneBy({
        id: charId,
      });
      if (!char) {
        throw new NotFoundException('Personaje no encontrado');
      }
      /** Intenta localizar existente */
      let prop = await manager.getRepository(CharacterProperty).findOne({
        where: { character: { id: charId }, key: dto.key },
      });

      if (!prop) {
        // 3a) Crear nueva
        prop = manager.getRepository(CharacterProperty).create({
          character: char,
          ...dto,
        });
      } else {
        // 3b) Actualizar existente
        Object.assign(prop, dto);
      }

      // 4) Guardar y devolver
      return manager.getRepository(CharacterProperty).save(prop);
    });
  }

  async removeProperty(charId: string, propertyId: string) {
    const result = await this.propRepo.delete({
      id: propertyId,
      character: { id: charId },
    });
    if (!result.affected) throw new NotFoundException('Property not found');
  }

  /** Devuelve solo character.properties sin cargar el usuario completo */
  async listProperties(charId: string): Promise<CharacterProperty[]> {
    return this.propRepo.find({
      where: { character: { id: charId } },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  /* ---------- Proyección ---------- */

  project(char: Character): PublicCharacterDto {
    return {
      id: char.id,
      name: char.name,
      slug: char.slug,
      avatarUrl: char.avatarUrl,
      bio: char.bio,
      // properties: las expones aparte si quieres incluirlas aquí
    };
  }


  //Utilidades

  /** Valida que el personaje existe y pertenece al usuario. */
  async findOwnedByUserOrFail(userId: string, charId: string): Promise<Character> {
    const char = await this.repo.findOne({
      where: { id: charId, isActive: true, user: { id: userId } },
      relations: { user: true },
    });
    if (!char) throw new ForbiddenException('Este personaje no te pertenece o no existe');
    return char;
  }
}