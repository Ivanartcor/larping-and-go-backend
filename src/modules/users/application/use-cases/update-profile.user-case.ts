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

  async execute(userId: string, dto?: UpdateProfileDto, file?: Express.Multer.File) {
    dto = dto ?? {};     
    
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!user.activeCharacter)
      throw new BadRequestException('Necesitas un personaje activo');

    /* locale se puede cambiar; displayName lo sincronizamos ↓ */
    if (dto.locale !== undefined) user.locale = dto.locale;

    /* ---------- avatar ---------- */
    if (file) {
      const newUrl = await this.storage.uploadAvatar(
        userId, file.buffer, file.mimetype,
      );
      const oldUrl =
        user.activeCharacter.avatarUrl?.startsWith('/static/avatars/')
          ? user.activeCharacter.avatarUrl
          : undefined;

      user.activeCharacter.avatarUrl = newUrl;

      try {
        await this.users.save(user);
        if (oldUrl) await this.storage.remove(oldUrl);   // ya guardado → borro
      } catch (e) {
        await this.storage.remove(newUrl);              // rollback
        throw e;
      }
    } else if (dto.avatarUrl !== undefined) {
      user.activeCharacter.avatarUrl = dto.avatarUrl;
      await this.users.save(user);
    }

    /* ---------- displayName sincr. ---------- */
    user.displayName = user.activeCharacter.name;
    await this.users.save(user);

    return this.users.getPublicProfile(user.id);
  }
}