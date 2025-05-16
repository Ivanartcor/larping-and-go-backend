import { createHash } from 'crypto';
export const sha256 = (plain: string) =>
  createHash('sha256').update(plain).digest('hex');
