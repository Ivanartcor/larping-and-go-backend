import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityNotFoundError } from 'typeorm';

import { User } from '../../domain/entities/user.entity';
import { PublicUserDto } from '../../domain/dto/public-user.dto';
import { IUserRepository } from '../../application/ports/i-user.repository';
import { Character } from 'src/modules/characters/domain/entities/character.entity';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private readonly ds: DataSource,                    // para transacciones
    ) { }

    /* ---------- lecturas ---------- */

    findById(id: string) {
        return this.repo.findOne({
            where: { id, isActive: true },
            relations: { activeCharacter: true },
        });
    }

    findByUsername(username: string) {
        return this.repo.findOne({ where: { username, isActive: true } });
    }

    async getPublicProfile(userId: string): Promise<PublicUserDto | null> {
        const user = await this.repo.findOne({
            where: { id: userId, isActive: true },
            relations: { activeCharacter: true },
        });
        if (!user) return null;

        const { id, username, displayName, avatarUrl, activeCharacter } = user;
        return {
            id, username, displayName, avatarUrl,
            activeCharacter: activeCharacter ? {
                id: activeCharacter.id,
                name: activeCharacter.name,
                slug: activeCharacter.slug,
                avatarUrl: activeCharacter.avatarUrl,
            } : null,
        };
    }

    /* ---------- escritura ---------- */

    save(user: User) {
        return this.repo.save(user);
    }

    /**
     * Asigna un personaje como activo
     * y devuelve el usuario con la relación actualizada.
     */
    async setActiveCharacter(userId: string, characterId: string): Promise<User> {
        return this.ds.transaction(async (tx) => {

            let char: Character;
            try {
                // 1. Verifica propiedad y estado del personaje
                char = await tx.getRepository(Character).findOneOrFail({
                    where: {
                        id: characterId,
                        user: { id: userId },
                        isActive: true,
                    },
                    relations: {
                        user: true,
                    },
                });
            } catch (err) {
                if (err instanceof EntityNotFoundError) {
                    throw new NotFoundException('Personaje no encontrado o no válido');
                }
                throw err; // otros errores se lanzan igual
            }

            // 2. Actualiza FK
            await tx.update(User, { id: userId }, { activeCharacter: { id: char.id } });

            // 3. Devuelve el usuario con relaciones
            return tx.findOneOrFail(User, {
                where: { id: userId },
                relations: { activeCharacter: true },
            });
        });
    }

    /* ---------- utilidades ---------- */

    existsByUsername(username: string) {
        return this.repo.exist({ where: { username } });
    }
}
