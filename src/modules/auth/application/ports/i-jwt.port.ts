/**
 * Wrapper sobre la librería JWT.
 * Así separamos el dominio de 'jsonwebtoken' o '@nestjs/jwt'.
 */
export interface IJwtPort {
  /** Firma un token síncrono (access o refresh). */
  sign(payload: Record<string, any>, options?: { expiresIn?: string; secret?: string }): string;

  /** Verifica token y devuelve payload genérico o lanza excepción. */
  verify<T = unknown>(token: string, secret?: string): T;
}
