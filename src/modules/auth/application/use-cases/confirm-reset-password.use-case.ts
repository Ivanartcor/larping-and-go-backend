import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { ConfirmResetPasswordCommand } from "../commands/confirm-reset-password.command";
import { IHasherPort } from "../ports/i-hasher.port";
import { IPasswordTokenRepository } from "../ports/i-password-token.repository";
import { IUserAuthRepository } from "../ports/i-user-auth.repository";
import { sha256 } from "src/shared/hash/sha256";

@Injectable()
export class ConfirmPasswordResetUseCase {
  constructor(
    @Inject('PASSWORD_TOKEN_REPO')  private readonly tokens: IPasswordTokenRepository,
    @Inject('USER_AUTH_REPO')       private readonly users: IUserAuthRepository,
    @Inject('HASHER')               private readonly hasher: IHasherPort,
  ) {}

  async execute(cmd: ConfirmResetPasswordCommand) {
    // hasheamos como se hizo al guardar
    const tokenHash = sha256(cmd.token);


    const token = await this.tokens.findValid(tokenHash);
    if (!token || token.used || token.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido o expirado');
    }

    token.used = true;
    token.usedAt = new Date();
    await this.tokens.markUsed(token.id);

    token.user.passwordHash = await this.hasher.hash(cmd.newPassword);
    await this.users.save(token.user);
  }
}
