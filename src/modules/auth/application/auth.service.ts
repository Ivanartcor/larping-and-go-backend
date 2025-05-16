import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* DTO ─–––––––––––––––––––––––––––––––– */
import { RegisterDto } from '../domain/dto/register.dto';
import { LoginDto }    from '../domain/dto/login.dto';
import { ConfirmPasswordResetDto } from '../domain/dto/password-confirm.dto';
import { RequestPasswordResetDto } from '../domain/dto/password-request.dto';
import { RefreshTokenDto } from '../domain/dto/refresh.dto';

/* Commands ─––––––––––––––––––––––––––– */
import { ConfirmResetPasswordCommand } from './commands/confirm-reset-password.command';
import { LoginCommand } from './commands/login.command';
import { RegisterCommand } from './commands/register.command';
import { RequestResetPasswordCommand } from './commands/request-reset-password.command';


/* Use-cases ─–––––––––––––––––––––––––– */
import { RegisterUserUseCase }          from './use-cases/register-user.use-case';
import { LoginUserUseCase }             from './use-cases/login-user.use-case';
import { RequestPasswordResetUseCase } from './use-cases/request-reset-password.use-case'; 
import { ConfirmPasswordResetUseCase } from './use-cases/confirm-reset-password.use-case';  

/* Ports ─–––––––––––––––––––––––––––––– */
import { IJwtPort } from './ports/i-jwt.port';
import { JwtRefreshGuard } from '../infrastructure/guards/jwt-refresh.guard';


@Injectable()
export class AuthService {
  constructor(
    /* Use-cases */
    private readonly registerUC:  RegisterUserUseCase,
    private readonly loginUC:     LoginUserUseCase,
    private readonly requestUC:   RequestPasswordResetUseCase,
    private readonly confirmUC:   ConfirmPasswordResetUseCase,

    /* Puertos genéricos */
    @Inject('JWT')
    private readonly jwt: IJwtPort,
    private readonly cfg: ConfigService,
  ) {}

  /* ------------------------------------------------------------------ */
  /* Registro                                                           */
  /* ------------------------------------------------------------------ */

  async register(dto: RegisterDto) {
    const cmd = new RegisterCommand(
      dto.email, dto.password, dto.username, dto.displayName,
    );
    const user = await this.registerUC.execute(cmd);
    return this.issueTokens(user.id);
  }

  /* ------------------------------------------------------------------ */
  /* Login                                                               */
  /* ------------------------------------------------------------------ */

  async login(dto: LoginDto) {
    const cmd = new LoginCommand(dto.email, dto.password);
    return this.loginUC.execute(cmd);       // use-case ya devuelve tokens
  }

  /* ------------------------------------------------------------------ */
  /* Refresh                                                             */
  /* ------------------------------------------------------------------ */

  /** Se llama desde el controlador protegido con JwtRefreshGuard */
  @UseGuards(JwtRefreshGuard)
  refresh(_dto: RefreshTokenDto, userId: string) {   // _dto solo para validar firma
    return this.issueTokens(userId);
  }


  /* ------------------------------------------------------------------ */
  /* Restablecer contraseña                                              */
  /* ------------------------------------------------------------------ */

  /** Paso-1: enviar correo con enlace */
  requestPasswordReset(dto: RequestPasswordResetDto) {
    const cmd = new RequestResetPasswordCommand(dto.email);
    return this.requestUC.execute(cmd);
  }

  /** Paso-2: confirmar nueva contraseña */
 confirmPasswordReset(dto: ConfirmPasswordResetDto) {
    const cmd = new ConfirmResetPasswordCommand(dto.token, dto.newPassword);
    return this.confirmUC.execute(cmd);
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  private issueTokens(userId: string) {
    const payload = { sub: userId };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.cfg.get<string>('config.jwt.expiresIn'),
    });

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: '7d',
      secret: this.cfg.get<string>('config.jwt.secret') + '_refresh',
    });


      
    return { accessToken, refreshToken };
  }
}
