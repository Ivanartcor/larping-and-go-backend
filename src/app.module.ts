import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';    // 👈 nuevo
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { validationSchema } from './config/validation.schema';
import configuration from './config/configuration';
import { UsersModule } from './modules/users/users.module';
import { CharactersModule } from './modules/characters/characters.module';

@Module({
  imports: [
    // 1. Variables de entorno (sigue igual)
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration],
    }),


    // 2. Conexión a PostgreSQL gestionada por DatabaseModule
    DatabaseModule, // 👈 reemplaza a TypeOrmModule.forRoot
    AuthModule,
    UsersModule,
    CharactersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
