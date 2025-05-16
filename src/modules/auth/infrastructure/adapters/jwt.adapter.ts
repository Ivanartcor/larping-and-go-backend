import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPort } from '../../application/ports/i-jwt.port';

@Injectable()
export class JwtAdapter implements IJwtPort {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: Record<string, any>, opts?: { expiresIn?: string; secret?: string }): string {
    return this.jwt.sign(payload, opts);
  }

  verify<T = any>(token: string, secret?: string): T {
    return this.jwt.verify(token, { secret }) as T;
  }
}
