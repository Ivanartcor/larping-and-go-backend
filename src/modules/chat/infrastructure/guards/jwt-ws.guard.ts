import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    const client: Socket = ctx.switchToWs().getClient();

    const token =
      client.handshake?.auth?.token ||
      client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Missing token');

    try {
      const payload = this.jwt.verify(token);
      client.data.userId = payload.sub;  // Aquí lo corriges: guarda directamente el ID
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

