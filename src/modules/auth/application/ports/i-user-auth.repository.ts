//src\modules\auth\application\ports\i-user-auth.repository.ts
import { User } from "src/modules/users/domain/entities/user.entity"; 
/**
 * Acceso a usuarios para los flujos de autenticación.
 * NO expone findAll / delete / etc.; sólo lo que Auth necesita.
 */
export interface IUserAuthRepository {
  /** ¿Existe un usuario con ese e-mail?  →  true/false */
  existsByEmail(email: string): Promise<boolean>;

  /** ¿Existe con el mismo nombre? */
  existsByUsername(username: string): Promise<boolean>;

  /** Devuelve el usuario o null si no lo encuentra (activo o no) */
  findByEmail(email: string): Promise<User | null>;

  /** Persiste cambios y devuelve la entidad resultante */
  save(user: User): Promise<User>;
}
