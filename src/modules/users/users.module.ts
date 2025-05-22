import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Character } from '../characters/domain/entities/character.entity';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { ChangeActiveCharacterUseCase } from './application/use-cases/change-active-character.use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.user-case';
import { UsersController } from './infrastructure/controllers/users.controller';
import { LocalStorageAdapter } from './infrastructure/adapters/local-storage.adapter';
import { UsersService } from './application/users.service';
import { GetPublicProfileQuery } from './application/queries/get-public-profile.query';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Character]),
    AuthModule,                // para JwtAuthGuard si lo reutilizas
  ],
  controllers: [UsersController],
  providers: [
    { provide: 'USER_REPO', useClass: UserRepository },
    { provide: 'STORAGE',   useClass: LocalStorageAdapter },

    UpdateProfileUseCase,
    ChangeActiveCharacterUseCase,
    GetPublicProfileQuery,

    UsersService,
  ],
  exports: [UsersService,
    'STORAGE',
    'USER_REPO',
  ],
})
export class UsersModule {}
