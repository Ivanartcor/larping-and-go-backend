import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';

import { PasswordResetToken } from '../../domain/entities/password-reset-token.entity';
import { IPasswordTokenRepository } from '../../application/ports/i-password-token.repository';

@Injectable()
export class PasswordTokenRepository implements IPasswordTokenRepository {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly repo: Repository<PasswordResetToken>,
  ) {}

  async create(token: PasswordResetToken): Promise<void> {
    await this.repo.save(token);
  }

  findValid(hash: string): Promise<PasswordResetToken | null> {
    return this.repo.findOne({
      where: {
        tokenHash: hash,
        used: false,
        expiresAt: MoreThan(new Date()),
      },
      relations: { user: true },
    });
  }

  async markUsed(id: string): Promise<void> {
    await this.repo.update(id, { used: true, usedAt: new Date() });
  }

  /** Limpieza opcional (cron) */
  purgeExpired(): Promise<void> {
    return this.repo.delete({ expiresAt: LessThan(new Date()) }).then();
  }
}
