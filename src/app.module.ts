import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';    // 👈 nuevo
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Variables de entorno (sigue igual)
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Conexión a PostgreSQL gestionada por DatabaseModule
    DatabaseModule, // 👈 reemplaza TypeOrmModule.forRoot
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
