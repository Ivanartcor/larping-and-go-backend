/**
 * Servicio de hashing (BCrypt, Argon2, etc.).
 * Permite testear la lógica sin dependencia directa de la librería.
 */
export interface IHasherPort {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}
