import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { validationSchema } from './config/validation.schema';
import configuration from './config/configuration';
import { UsersModule } from './modules/users/users.module';
import { CharactersModule } from './modules/characters/characters.module';
import { GuildsModule } from './modules/guilds/guilds.module';
import { ChatModule } from './modules/chat/chat.module';
import { JwtWsGuard } from './modules/chat/infrastructure/guards/jwt-ws.guard';
import { ThrottlerModule } from '@nestjs/throttler';

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
    GuildsModule,
    ChatModule,


    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,  // ventana de 60 s
          limit: 80 // 80 peticiones por IP/uid
        },        // throttler global
      ],
    }),

  ],
  controllers: [AppController],
  providers: [
    AppService,
      // se aplica a TODAS las gateways
  ],
})
export class AppModule { }
