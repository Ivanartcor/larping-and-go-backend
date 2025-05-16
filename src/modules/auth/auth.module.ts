import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

/* Entidades */
import { User } from '../users/domain/entities/user.entity';
import { PasswordResetToken } from './domain/entities/password-reset-token.entity';

/* Infra – controllers */
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PasswordResetController } from './infrastructure/controllers/password-reset.controller';

/* Infra – adapters & repos */
import { UserAuthRepository }     from './infrastructure/repositories/user-auth.repository';
import { PasswordTokenRepository }from './infrastructure/repositories/password-token.repository';
import { BcryptAdapter }          from './infrastructure/adapters/bcrypt.adapter';
import { JwtAdapter }             from './infrastructure/adapters/jwt.adapter';
import { MailerAdapter }          from './infrastructure/adapters/mailer.adapter';

/* Infra – strategies & guards */
import { JwtAccessStrategy }  from './infrastructure/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './infrastructure/strategies/jwt-refresh.strategy';
import { JwtAuthGuard }       from './infrastructure/guards/jwt-auth.guard';
import { JwtRefreshGuard }    from './infrastructure/guards/jwt-refresh.guard';

/* Application – use-cases */
import { RegisterUserUseCase }          from './application/use-cases/register-user.use-case';
import { LoginUserUseCase }             from './application/use-cases/login-user.use-case';
import { RequestPasswordResetUseCase }  from './application/use-cases/request-reset-password.use-case';
import { ConfirmPasswordResetUseCase }  from './application/use-cases/confirm-reset-password.use-case';

/* Application – façade */
import { AuthService } from './application/auth.service';


@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, PasswordResetToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('config.jwt.secret'),
        signOptions: { expiresIn: cfg.get<string>('config.jwt.expiresIn') },
      }),
    }),
  ],

  controllers: [AuthController, PasswordResetController],

  providers: [
    /* Ports -> adapters */
    { provide: 'USER_AUTH_REPO',      useClass: UserAuthRepository },
    { provide: 'PASSWORD_TOKEN_REPO', useClass: PasswordTokenRepository },
    { provide: 'HASHER',              useClass: BcryptAdapter },
    { provide: 'JWT',                 useClass: JwtAdapter },
    { provide: 'MAILER',              useClass: MailerAdapter },

    /* Strategies & guards */
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,

    /* Use-cases */
    RegisterUserUseCase,
    LoginUserUseCase,
    RequestPasswordResetUseCase,
    ConfirmPasswordResetUseCase,

    /* Facade service */
    AuthService,
  ],

  exports: [
    AuthService,
    JwtAuthGuard,      // otros módulos podrán usar este guard
  ],
})
export class AuthModule {}
