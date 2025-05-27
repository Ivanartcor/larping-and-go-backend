// src/modules/guilds/guilds.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Guild }               from './domain/entities/guild.entity';
import { GuildRole }           from './domain/entities/guild-role.entity';
import { GuildMembership }     from './domain/entities/guild-membership.entity';

import { GuildRepository } from './infrastructure/repositories/guild.repository';

/* Use-cases (Fase 1) */
import { CreateGuildUseCase } from './application/use-cases/create-guild.use-case';  
import { GetGuildPublicQuery } from './application/queries/get-guild-public.query'; 
import { ListGuildsQuery } from './application/queries/list-guilds.query'; 
import { GetGuildInternalQuery } from './application/queries/get-guild-internal.query';


/* Controller + façade */
import { GuildsController } from './infrastructure/controllers/guilds.controller';   
import { GuildsService } from './application/guilds.service';      

/* UsersModule para comprobar el creador (y reutilizar JwtAuthGuard) */
import { UsersModule } from '../users/users.module';
import { UpdateGuildUseCase } from './application/use-cases/update-guild.use-case';
import { DeleteGuildUseCase } from './application/use-cases/delete-guild.use-case';
import { TransferLeadershipUseCase } from './application/use-cases/transfer-leadership.use-case';
import { GuildMemberGuard } from './infrastructure/guards/guild-member.guard';
import { GuildPermissionsGuard } from './infrastructure/guards/guild-permissions.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([Guild, GuildRole, GuildMembership]),
    UsersModule,
  ],
  controllers: [GuildsController],
  providers: [
    /* Repo DI token */
    { provide: 'GUILD_REPO', useClass: GuildRepository },

    /* Casos de uso / queries */
    CreateGuildUseCase,
    GetGuildPublicQuery,
    ListGuildsQuery,
    GetGuildInternalQuery,
    UpdateGuildUseCase,
    DeleteGuildUseCase,
    TransferLeadershipUseCase,

    /* Guards */
    GuildMemberGuard,
    GuildPermissionsGuard,


    /* Facade */
    GuildsService,
  ],
  exports: [
    'GUILD_REPO',  // otros dominios (Events, Chat…) lo usarán
    GuildsService,
  ],
})
export class GuildsModule {}
