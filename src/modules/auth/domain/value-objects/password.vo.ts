import * as bcrypt from 'bcryptjs';

export class PasswordHash {
  private constructor(private readonly hash: string) {}

  static async hash(plain: string): Promise<PasswordHash> {
    const h = await bcrypt.hash(plain, 12);
    return new PasswordHash(h);
  }
  async compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.hash);
  }
  toString() { return this.hash; }          // cuidado: no exponer fuera del dominio
}
