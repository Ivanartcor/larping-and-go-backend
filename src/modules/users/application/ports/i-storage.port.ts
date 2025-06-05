// modules/users/application/ports/i-storage.port.ts
/**
 * Abstracción mínima de almacenamiento de archivos.
 * Desarrollo => disco local ; Producción => S3, Cloud Storage…
 */
export interface IStoragePort {
  /** Sube un buffer y devuelve la URL pública */
  uploadAvatar(userId: string, buffer: Buffer, filename: string): Promise<string>;
  /** (futuro) remove(key) para limpieza */

    uploadGuildAsset(
    guildId: string,
    kind: 'emblem' | 'role-icon',
    buffer: Buffer,
    mime: string,
  ): Promise<string>;

    /* ---------- Utilidad genérica ---------- */
  /** Elimina un archivo dado su URL pública (ignora si no existe). */
  remove(url: string): Promise<void>;
}
