import { Injectable } from '@nestjs/common';

import { CreateCharacterUseCase } from './use-cases/create-character.use-case';
import { UpdateCharacterUseCase } from './use-cases/update-character.use-case';
import { DeleteCharacterUseCase } from './use-cases/delete-character.use-case';
import { UpsertPropertyUseCase } from './use-cases/upsert-property.use-case';
import { RemovePropertyUseCase } from './use-cases/remove-property.use-case';
import { UploadAvatarUseCase } from './use-cases/upload-avatar.use-case';
import { GetPublicCharacterQuery } from './queries/get-public-character.query';
import { CharacterPropertyDto } from '../domain/dto/character-property.dto';
import { CreateCharacterDto } from '../domain/dto/create-character.dto';
import { UpdateCharacterDto } from '../domain/dto/update-character.dto';
import { ListCharactersUseCase } from './use-cases/list-characters.use-case';
import { ListCharacterPropertiesUseCase } from './use-cases/list-character-properties.use-case';

@Injectable()
export class CharactersService {
  constructor(
    private readonly createUC: CreateCharacterUseCase,
    private readonly updateUC: UpdateCharacterUseCase,
    private readonly deleteUC: DeleteCharacterUseCase,
    private readonly upsertPropUC: UpsertPropertyUseCase,
    private readonly removePropUC: RemovePropertyUseCase,
    private readonly uploadAvatarUC: UploadAvatarUseCase,
    private readonly listUC: ListCharactersUseCase,
    private readonly getPublicQ: GetPublicCharacterQuery,
    private readonly listPropsUC: ListCharacterPropertiesUseCase,) { }

  /** Crea un nuevo personaje para el usuario */
  createCharacter(userId: string, dto: CreateCharacterDto) {
    return this.createUC.execute(userId, dto);
  }

  /** Actualiza datos básicos del personaje */
  updateCharacter(charId: string, dto: UpdateCharacterDto) {
    return this.updateUC.execute(charId, dto);
  }

  /** Soft-delete del personaje */
  deleteCharacter(charId: string) {
    return this.deleteUC.execute(charId);
  }

  /** Crea o actualiza una propiedad estructurada */
  upsertProperty(charId: string, dto: CharacterPropertyDto) {
    return this.upsertPropUC.execute(charId, dto);
  }

  /** Elimina una propiedad por su ID */
  removeProperty(charId: string, propertyId: string) {
    return this.removePropUC.execute(charId, propertyId);
  }

  /** Sube un avatar desde buffer y devuelve DTO público */
  uploadAvatar(charId: string, buffer: Buffer, mimeType: string) {
    return this.uploadAvatarUC.execute(charId, buffer, mimeType);
  }

  /** Recupera la representación pública (por slug) */
  getPublicCharacter(slug: string) {
    return this.getPublicQ.execute(slug);
  }

  /** Lista los personajes propios del usuario */
  listMyCharacters(userId: string) {
    return this.listUC.execute(userId);
  }

  /** Lista propiedades estructuradas de un personaje propio */
  listProperties(userId: string, charId: string) {
    return this.listPropsUC.execute(userId, charId);
  }
}
