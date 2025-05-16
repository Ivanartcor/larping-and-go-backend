import {
  Injectable, Inject, UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoginCommand } from '../commands/login.command';

/* Ports (contratos) */
import { IUserAuthRepository } from '../ports/i-user-auth.repository';
import { IHasherPort }         from '../ports/i-hasher.port';
import { IJwtPort }            from '../ports/i-jwt.port';

/**
 * Caso de uso · Iniciar sesión
 * ----------------------------------------------------
 *  1. Normaliza el e-mail y busca al usuario.
 *  2. Compara la contraseña en claro con el hash guardado.
 *  3. Si pasa, emite par (access / refresh) de JWT.
 */
@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('USER_AUTH_REPO') private readonly users : IUserAuthRepository,
    @Inject('HASHER')         private readonly hasher: IHasherPort,
    @Inject('JWT')            private readonly jwt   : IJwtPort,
    private readonly cfg      : ConfigService,
  ) {}

  async execute(cmd: LoginCommand) {
    /* 1. Buscar usuario (e-mail en minúsculas) */
    const email = cmd.email.toLowerCase();
    const user  = await this.users.findByEmail(email);

    /* 2. Validar credenciales */
    const isValid = user && await this.hasher.compare(cmd.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Credenciales incorrectas');

    /* 3. Emitir tokens */
    const payload       = { sub: user.id };
    const accessExpiry  = this.cfg.get<string>('config.jwt.expiresIn');      // p. ej. '15m'
    const refreshSecret = this.cfg.get<string>('config.jwt.secret') + '_refresh';

    return {
      accessToken : this.jwt.sign(payload, { expiresIn: accessExpiry }),
      refreshToken: this.jwt.sign(payload, { expiresIn: '7d', secret: refreshSecret }),
    };
  }
}
