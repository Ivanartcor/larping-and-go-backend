import { promises as fs } from 'fs';
import { join, relative, sep } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IStoragePort } from '../../application/ports/i-storage.port';
import slugify from 'slugify';

@Injectable()
export class LocalStorageAdapter implements IStoragePort {

  private readonly uploadRoot = join(process.cwd(), 'uploads');
  private readonly avatarDir = join(this.uploadRoot, 'avatars');
  private readonly guildDir = join(this.uploadRoot, 'guilds');
  private readonly chatDir = join(this.uploadRoot, 'chat');

  private async ensureDir(path: string) {
    await fs.mkdir(path, { recursive: true });
  }

  private getExtension(mime: string): string {
    if (mime === 'image/png') return 'png';
    if (mime === 'image/jpeg') return 'jpg';
    return mime.split('/')[1] ?? 'bin';
  }


  async uploadAvatar(userId: string, buffer: Buffer, mime: string): Promise<string> {
    const ext = this.getExtension(mime);
    const filename = `${userId}-${uuid()}.${ext}`;

    try {
      await this.ensureDir(this.avatarDir);
      await fs.writeFile(join(this.avatarDir, filename), buffer);
      /* URL pública en dev → http://localhost:3000/static/avatars/xxx.jpg */

      return `/static/avatars/${filename}`;
    } catch (e) {
      throw new InternalServerErrorException('Could not save avatar file');
    }
  }



  async uploadGuildAsset(guildId: string, kind: string, buffer: Buffer, mime: string): Promise<string> {
    const ext = this.getExtension(mime);
    const filename = `${guildId}-${kind}-${uuid()}.${ext}`;

    await this.ensureDir(this.guildDir);
    await fs.writeFile(join(this.guildDir, filename), buffer);

    return `/static/guilds/${filename}`;
  }

  async uploadChatAttachment(userId: string, buffer: Buffer, mime: string, original: string): Promise<{ id: string; url: string; size: number }> {
    const id = uuid();
    const ext = this.getExtension(mime);
    const safeName = slugify(original, { lower: true, strict: true });
    const filename = `${uuid()}-${safeName}.${ext}`;
    const userDir = join(this.chatDir, userId);

    await this.ensureDir(userDir);
    await fs.writeFile(join(userDir, filename), buffer);

    return { id, url: `/static/chat/${userId}/${filename}`, size: buffer.length };
  }

  /* ------------------------------------------------------------------ */
  /* Borrado seguro (ignora ENOENT)                                     */
  /* ------------------------------------------------------------------ */

  async remove(url: string): Promise<void> {
    try {
      /* 1. quitar prefijo /static/ */
      const rel = url.replace(/^\/static\//, '');

      /* 2. asegurar separadores correctos para el SO */
      //   Windows →  chat\userId\file.jpg
      //   Unix    →  chat/userId/file.jpg
      const safeRel = rel.split('/').join(sep);           // ← ✔️

      /* 3. construir ruta absoluta segura */
      const absPath = join(this.uploadRoot, safeRel);

      await fs.unlink(absPath);
    } catch (e: any) {
      if (e.code !== 'ENOENT') {
        throw new InternalServerErrorException('Error al borrar archivo');
      }
      /* si ya no existe, simplemente lo ignoramos */
    }
  }
}