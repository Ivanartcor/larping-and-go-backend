import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IHasherPort } from '../../application/ports/i-hasher.port';

@Injectable()
export class BcryptAdapter implements IHasherPort {
  private readonly rounds = 12;

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
