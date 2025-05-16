import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { User } from "src/modules/users/domain/entities/user.entity";
import { RegisterCommand } from "../commands/register.command";
import { IHasherPort } from "../ports/i-hasher.port";
import { IUserAuthRepository } from "../ports/i-user-auth.repository";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('USER_AUTH_REPO') private readonly users: IUserAuthRepository,
    @Inject('HASHER') private readonly hasher: IHasherPort,
  ) { }

  async execute(cmd: RegisterCommand): Promise<User> {
    
    if (await this.users.existsByEmail(cmd.email.toLowerCase())) {
      throw new ConflictException('E-mail ya registrado');
    }

    if (await this.users.existsByUsername(cmd.username)) {
      throw new ConflictException('Nombre de usuario en uso');
    }


    const hash = await this.hasher.hash(cmd.password);

    const user = new User();
    user.email = cmd.email.toLowerCase();
    user.passwordHash = hash;
    user.username = cmd.username;
    user.displayName = cmd.displayName;
    user.locale = 'es';

    return this.users.save(user);
  }
}
