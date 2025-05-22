import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Entidades */
import { Character } from './domain/entities/character.entity';
import { CharacterProperty } from './domain/entities/character-property.entity';

/* Infraestructura */
import { CharacterRepository } from './infrastructure/repositories/character.repository';

/* Casos de uso */
import { CreateCharacterUseCase } from './application/use-cases/create-character.use-case';
import { UpdateCharacterUseCase } from './application/use-cases/update-character.use-case';
import { DeleteCharacterUseCase } from './application/use-cases/delete-character.use-case';
import { UpsertPropertyUseCase } from './application/use-cases/upsert-property.use-case';
import { RemovePropertyUseCase } from './application/use-cases/remove-property.use-case';
import { UploadAvatarUseCase } from './application/use-cases/upload-avatar.use-case';
import { GetPublicCharacterQuery } from './application/queries/get-public-character.query'; 

/* Storage adapter importado de UsersModule */
import { LocalStorageAdapter } from '../users/infrastructure/adapters/local-storage.adapter';

/* Servicio façade y controlador */
import { CharactersService } from './application/characters.service';
import { CharactersController } from './infrastructure/controllers/characters.controller';
import { UsersModule } from '../users/users.module';
import { DefaultPropertiesProvider } from './infrastructure/providers/default-properties.provider';
import { ListCharactersUseCase } from './application/use-cases/list-characters.use-case';
import { ListCharacterPropertiesUseCase } from './application/use-cases/list-character-properties.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, CharacterProperty]),
    UsersModule, // 📌 Recomendado para reutilizar el STORAGE port
  ],
  controllers: [CharactersController],
  providers: [
    /* Repositorio y StoragePort */
    { provide: 'CHAR_REPO', useClass: CharacterRepository },
    //{ provide: 'STORAGE',  useExisting: 'STORAGE' },     // Mejor reutilizar el STORAGE exportado por UsersModule:
    { provide: 'DEFAULT_PROPS', useClass: DefaultPropertiesProvider },

    /* Use-cases */
    CreateCharacterUseCase,
    UpdateCharacterUseCase,
    DeleteCharacterUseCase,
    UpsertPropertyUseCase,
    RemovePropertyUseCase,
    UploadAvatarUseCase,
    GetPublicCharacterQuery,
    ListCharactersUseCase,
    ListCharacterPropertiesUseCase,
    /* Servicio façade */
    CharactersService,
  ],
})
export class CharactersModule {}
