import { Injectable, Inject } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PasswordResetToken } from "../../domain/entities/password-reset-token.entity";
import { RequestResetPasswordCommand } from "../commands/request-reset-password.command";
import { IHasherPort } from "../ports/i-hasher.port";
import { IMailerPort } from "../ports/i-mailer.port";
import { IPasswordTokenRepository } from "../ports/i-password-token.repository";
import { IUserAuthRepository } from "../ports/i-user-auth.repository";
import { addHours } from 'date-fns';      
import { sha256 } from "src/shared/hash/sha256";


@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    @Inject('USER_AUTH_REPO')       private readonly users: IUserAuthRepository,
    @Inject('PASSWORD_TOKEN_REPO')  private readonly tokens: IPasswordTokenRepository,
    @Inject('HASHER')               private readonly hasher: IHasherPort,
    @Inject('MAILER')               private readonly mailer: IMailerPort,
  ) {}

  async execute(cmd: RequestResetPasswordCommand) {
    const user = await this.users.findByEmail(cmd.email.toLowerCase());
    if (!user) return;   // opcional: evitar enumeración de emails

    const rawToken = randomUUID();
    const tokenHash = sha256(rawToken); 
    const expires = addHours(new Date(), 2);

    const entity = new PasswordResetToken();
    entity.user = user;
    entity.tokenHash = tokenHash;
    entity.expiresAt = expires;
    entity.used = false;

    await this.tokens.create(entity);

    const link = `${process.env.FRONT_URL}/reset?token=${rawToken}`;
    await this.mailer.sendPasswordReset(user.email, link);
  }
}
