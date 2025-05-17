import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../ports/i-user.repository';
import { PublicUserDto } from '../../domain/dto/public-user.dto';

@Injectable()
export class GetPublicProfileQuery {
  constructor(
    @Inject('USER_REPO') private readonly users: IUserRepository,
  ) {}

  async execute(userId: string): Promise<PublicUserDto> {
    const profile = await this.users.getPublicProfile(userId);
    if (!profile) throw new NotFoundException('Perfil no encontrado');
    return profile;
  }
}
