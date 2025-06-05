import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICharacterRepository } from '../ports/i-character.repository';
import { IStoragePort } from 'src/modules/users/application/ports/i-storage.port';

@Injectable()
export class UploadAvatarUseCase {
  constructor(
    @Inject('CHAR_REPO') private readonly chars: ICharacterRepository,
    @Inject('STORAGE') private readonly storage: IStoragePort,
  ) { }

  /**
   * 1. Verifica personaje existe y es propiedad del user en el controller.
   * 2. Sube buffer a storage → devuelve URL.
   * 3. Asigna avatarUrl, persiste y devuelve DTO público.
   */
  async execute(charId: string, buffer: Buffer, mime: string) {
    // 1) Obtener personaje
    const char = await this.chars.findById(charId);
    if (!char) throw new NotFoundException('Personaje no encontrado');

    // 2) Subir archivo y obtener URL
    const newUrl = await this.storage.uploadAvatar(charId, buffer, mime);
    const oldUrl =
      char.avatarUrl?.startsWith('/static/avatars/') ? char.avatarUrl : undefined;

    char.avatarUrl = newUrl;

    try {
      const saved = await this.chars.save(char);
      if (oldUrl) await this.storage.remove(oldUrl);
      return this.chars.project(saved);
    } catch (e) {
      await this.storage.remove(newUrl);
      throw e;
    }
  }
}
