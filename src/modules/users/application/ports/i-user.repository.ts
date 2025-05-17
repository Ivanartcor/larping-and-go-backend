import { PublicUserDto } from '../../domain/dto/public-user.dto';
import { User } from '../../domain/entities/user.entity';


export interface IUserRepository {


  /** Operaciones propias de Users */
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;

  /** Graba cambios en la entidad y devuelve la versión persistida */
  save(user: User): Promise<User>;

  /** Proyección pública del perfil */
  getPublicProfile(userId: string): Promise<PublicUserDto | null>;

  /** Cambia el personaje activo y devuelve el user actualizado */
  setActiveCharacter(userId: string, characterId: string): Promise<User>;
}
