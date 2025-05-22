import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';
import { IUserRepository } from '../../../users/application/ports/i-user.repository';
import { CreateCharacterDto } from '../../domain/dto/create-character.dto';
import { Character } from '../../domain/entities/character.entity';
import { Slug } from '../../domain/value-objects/slug.vo';
import { CharacterProperty } from '../../domain/entities/character-property.entity';
import { IDefaultCharacterPropertiesProvider } from '../ports/i-default-properties.provider';
import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';
import { PublicCharacterDto } from '../../domain/dto/public-character.dto';

@Injectable()
export class CreateCharacterUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
    @Inject('USER_REPO') private readonly users: IUserRepository,
    @Inject('DEFAULT_PROPS') private readonly defaults: IDefaultCharacterPropertiesProvider,
  ) { }

  /**
   * 1. Verifica que el usuario exista.
   * 2. Asegura nombre único por usuario.
   * 3. Valida y genera el slug.
   * 4. Construye entidad y persiste.
   */
  async execute(userId: string, dto: CreateCharacterDto): Promise<PublicCharacterDto> {
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (await this.chars.existsNameForUser(userId, dto.name)) {
      throw new ConflictException('Ya tienes un personaje con ese nombre');
    }

    const char = new Character();
    char.user = user;
    char.name = dto.name;
    char.slug = Slug.create(dto.name).toString();
    char.visibility = dto.visibility ?? true;
    char.bio = dto.bio;
    char.backstory = dto.backstory;

    // 1) Partimos de los defaults
    const defaults = this.defaults.getDefaults();

    // 2) Filtramos aquellos que el usuario pasó explícitamente
    const passedKeys = new Set(dto.properties?.map(p => p.key) ?? []);
    const mergedProps: CharacterPropertyDto[] = [];

    for (const def of defaults) {
      if (!passedKeys.has(def.key)) {
        mergedProps.push({ ...def }); // clonamos el default (value=null)
      }
    }

    // 3) Añadimos al final las propiedades del DTO (sobrescriben valores default)
    if (dto.properties?.length) {
      mergedProps.push(...dto.properties);
    }

    // 4) Asignamos al personaje
    char.properties = mergedProps.map(p => {
      const ent = new CharacterProperty();
      ent.group     = p.group;
      ent.key       = p.key;
      ent.value     = p.value;
      ent.valueType = p.valueType;
      ent.order     = p.order;
      return ent;
    });

    //return this.chars.create(char);
    const saved = await this.chars.create(char);
    return this.chars.project(saved);
  }
}
