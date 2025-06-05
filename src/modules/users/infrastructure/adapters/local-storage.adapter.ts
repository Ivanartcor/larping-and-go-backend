import { promises as fs } from 'fs';
import { join, relative } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IStoragePort } from '../../application/ports/i-storage.port';

@Injectable()
export class LocalStorageAdapter implements IStoragePort {
  private readonly base = join(process.cwd(), 'uploads', 'avatars');

  async uploadAvatar(userId: string, buffer: Buffer, mime: string): Promise<string> {
    const ext = mime === 'image/png' ? 'png' : mime === 'image/jpeg' ? 'jpg' : 'bin';
    const filename = `${userId}-${uuid()}.${ext}`;
    try {
      await fs.mkdir(this.base, { recursive: true });
      await fs.writeFile(join(this.base, filename), buffer);
      /* URL pública en dev → http://localhost:3000/static/avatars/xxx.jpg */
      return `/static/avatars/${filename}`;
    } catch (e) {
      throw new InternalServerErrorException('Could not save avatar file');
    }
  }

  async uploadGuildAsset(guildId: string, kind: string, buffer: Buffer, mime: string) {
  const ext  = mime === 'image/png' ? 'png' : mime === 'image/jpeg' ? 'jpg' : 'bin';
  const file = `${guildId}-${kind}-${uuid()}.${ext}`;

  const dir  = join(this.base, '..', 'guilds');          // uploads/guilds
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(join(dir, file), buffer);
  return `/static/guilds/${file}`;
}

/* ------------------------------------------------------------------ */
  /* Borrado seguro (ignora ENOENT)                                     */
  /* ------------------------------------------------------------------ */
  async remove(url: string): Promise<void> {
    try {
      // url pública → ruta absoluta en uploads/
      //  /static/avatars/xxx.jpg -> uploads/avatars/xxx.jpg
      //  /static/guilds/xxx.png  -> uploads/guilds/xxx.png
      const rel = url.replace(/^\/static\//, '');
      const abs = join(process.cwd(), 'uploads', relative('.', rel));
      await fs.unlink(abs);
    } catch (e: any) {
      if (e.code !== 'ENOENT') throw e;          // silencia “no existe”
    }
  }
}
