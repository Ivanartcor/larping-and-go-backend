// value-objects/slug.vo.ts
import { BadRequestException } from '@nestjs/common';

export class Slug {
  private constructor(readonly value: string) {}

  static create(raw: string): Slug {
    const slug = raw.trim().toLowerCase()
      .replace(/[^\w\s-]/g, '')     // quita símbolos raros
      .replace(/\s+/g, '-');        // espacios → guiones

    if (!/^[a-z0-9-]{2,80}$/.test(slug)) {
      throw new BadRequestException('Nombre inválido para slug');
    }
    return new Slug(slug);
  }

  toString() {
    return this.value;
  }
}
