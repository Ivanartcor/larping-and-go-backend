import { Injectable, Inject } from "@nestjs/common";
import { ChangeActiveCharacterDto } from "../../domain/dto/change-active-character.dto";
import { IUserRepository } from "../ports/i-user.repository";

@Injectable()
export class ChangeActiveCharacterUseCase {
  constructor(
    @Inject('USER_REPO') private readonly users: IUserRepository,
  ) {}

  async execute(userId: string, dto: ChangeActiveCharacterDto) {
    const updated = await this.users.setActiveCharacter(userId, dto.characterId);
    return this.users.getPublicProfile(updated.id);
  }
}
