import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../users/domain/entities/user.entity';
import { IUserAuthRepository } from '../../application/ports/i-user-auth.repository';

@Injectable()
export class UserAuthRepository implements IUserAuthRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) { }

  existsByEmail(email: string): Promise<boolean> {
    return this.repo.exist({ where: { email } });
  }

  existsByUsername(username: string): Promise<boolean> {
    return this.repo.exist({ where: { username } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  save(user: User): Promise<User> {
    return this.repo.save(user);
  }
}
