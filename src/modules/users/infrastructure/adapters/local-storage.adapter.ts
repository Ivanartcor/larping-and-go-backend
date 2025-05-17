import { promises as fs } from 'fs';
import { join } from 'path';
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
}
