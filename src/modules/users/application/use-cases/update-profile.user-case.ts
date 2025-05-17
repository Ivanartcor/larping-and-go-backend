import { Injectable, Inject, NotFoundException, BadRequestException } from "@nestjs/common";
import { UpdateProfileDto } from "../../domain/dto/update-profile.dto";
import { IStoragePort } from "../ports/i-storage.port";
import { IUserRepository } from "../ports/i-user.repository";

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject('USER_REPO') private readonly users: IUserRepository,
    @Inject('STORAGE') private readonly storage: IStoragePort,   // para avatar
  ) { }

  async execute(userId: string, dto: UpdateProfileDto, file?: Express.Multer.File) {
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    /* displayName / locale */
    if (dto.displayName !== undefined) user.displayName = dto.displayName;
    if (dto.locale !== undefined) user.locale = dto.locale;

    /* avatar */
    if (file) {

      if (!user.activeCharacter) {
        throw new BadRequestException('Debes tener un personaje activo para subir un avatar.');
      }

      const url = await this.storage.uploadAvatar(userId, file.buffer, file.mimetype);


      user.activeCharacter!.avatarUrl = url;   // asegura relación cargada
    } else if (dto.avatarUrl) {
      if (!user.activeCharacter) {
        throw new BadRequestException('Debes tener un personaje activo para establecer un avatar.');
      }
      user.activeCharacter!.avatarUrl = dto.avatarUrl;
    }

    const saved = await this.users.save(user);
    return this.users.getPublicProfile(saved.id);   // respuesta consistente
  }
}
