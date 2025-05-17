import { Injectable } from "@nestjs/common";
import { ChangeActiveCharacterDto } from "../domain/dto/change-active-character.dto";
import { UpdateProfileDto } from "../domain/dto/update-profile.dto";
import { ChangeActiveCharacterUseCase } from "./use-cases/change-active-character.use-case";
import { UpdateProfileUseCase } from "./use-cases/update-profile.user-case";
import { GetPublicProfileQuery } from "./queries/get-public-profile.query";

@Injectable()
export class UsersService {
  constructor(
    private readonly updateUC: UpdateProfileUseCase,
    private readonly changeUC: ChangeActiveCharacterUseCase,
    private readonly profileQ: GetPublicProfileQuery, //delega a userRepo.getPublicProfile.
  ) {}

  updateProfile(id: string, dto: UpdateProfileDto, file?: Express.Multer.File) {
    return this.updateUC.execute(id, dto, file);
  }

  changeActive(id: string, dto: ChangeActiveCharacterDto) {
    return this.changeUC.execute(id, dto);
  }

  getPublicProfile(id: string) {
    return this.profileQ.execute(id);
  }
}
