import { PasswordResetToken } from "../../domain/entities/password-reset-token.entity";

/**
 * Persistencia de tokens para restablecer contraseña.
 */
export interface IPasswordTokenRepository {
  /** Guarda un token nuevo.  */
  create(token: PasswordResetToken): Promise<void>;

  /**
   * Busca un token válido (no usado y no expirado) por hash.
   * Se espera que devuelva null si no es válido o no existe.
   */
  findValid(tokenHash: string): Promise<PasswordResetToken | null>;

  /** Marca un token como usado y setea usedAt.  */
  markUsed(id: string): Promise<void>;
}