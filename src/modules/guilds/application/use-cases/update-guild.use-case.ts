// src/modules/guilds/application/use-cases/update-guild.use-case.ts
import {
  Injectable, Inject,
  ConflictException, ForbiddenException, NotFoundException,
  BadRequestException, InternalServerErrorException,
} from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { UpdateGuildDto }   from '../../domain/dto/update-guild.dto';
import { GuildPermission }  from '../../domain/entities/guild-role.entity';
import { GuildAccess }      from '../../domain/entities/guild.entity';
import { IStoragePort }     from 'src/modules/users/application/ports/i-storage.port';

@Injectable()
export class UpdateGuildUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds:   IGuildRepository,
    @Inject('STORAGE')    private readonly storage:  IStoragePort,
  ) {}

  /**  
   * @param emblemFile  buffer del nuevo emblema (opcional)
   *  
   * Flujo seguro:  
   *  1. Sube el fichero nuevo → obtiene `newUrl`.  
   *  2. Asigna `guild.emblemUrl = newUrl` y **persiste** la guild.  
   *  3. Si el paso 2 tiene éxito, elimina el emblema anterior (`oldUrl`).  
   *  4. Si el save falla, borra el **nuevo** fichero para no dejar huérfanos
   *     y relanza el error; el URL en DB seguirá apuntando al antiguo.
   */
  async execute(
    guildId:         string,
    dto:             UpdateGuildDto,
    membershipPerms: number,
    isLeader:        boolean,
    emblemFile?:     Express.Multer.File,
  ) {

    /* ---------- 1· Permisos ---------- */
    const canEdit = isLeader || (membershipPerms & GuildPermission.EDIT_INFO);
    if (!canEdit) throw new ForbiddenException('Permiso EDIT_INFO requerido');

    /* ---------- 2· Carga ------------ */
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Guild no encontrada');

    /* ---------- 3· Nombre único ----- */
    if (dto.name && dto.name !== guild.name) {
      if (await this.guilds.existsByName(dto.name)) {
        throw new ConflictException('Nombre ya en uso');
      }
      guild.name = dto.name;
    }

    /* ---------- 4· Campos básicos ---- */
    if (dto.description !== undefined) guild.description = dto.description;
    if (dto.privacy     !== undefined) guild.privacy     = dto.privacy;
    if (dto.accessType  !== undefined) guild.accessType  = dto.accessType;

    /* ---------- 5· Emblema seguro ---- */
    let oldUrl: string | undefined;
    let newUrl: string | undefined;

    if (emblemFile) {
      // 5-a) Subir primero el fichero NUEVO
      newUrl = await this.storage.uploadGuildAsset(
        guildId, 'emblem', emblemFile.buffer, emblemFile.mimetype,
      );

      // 5-b) Guardar la URL anterior por si debemos borrarla más tarde
      oldUrl       = guild.emblemUrl;
      guild.emblemUrl = newUrl;
    } else if (dto.emblemUrl !== undefined) {
      guild.emblemUrl = dto.emblemUrl;   // URL externa ya subida
    }

    /* ---------- 6· Código de acceso -- */
    const code = dto.accessCode;
    if (guild.accessType === GuildAccess.CODE) {
      if (code) {
        const { createHash } = await import('crypto');
        guild.accessCodeHash = createHash('sha256').update(code).digest('hex');
      } else if (!guild.accessCodeHash) {
        throw new BadRequestException(
          'Debes proporcionar "accessCode" cuando accessType = code',
        );
      }
    } else {
      if (code) {
        throw new BadRequestException(
          'No puedes enviar "accessCode" si accessType ≠ code',
        );
      }
      guild.accessCodeHash = null;
    }

    /* ---------- 7· Persistencia con rollback manual -------- */
    try {
      const saved = await this.guilds.save(guild);

      // 7-a) Eliminamos el fichero antiguo *después* de que la BD se haya guardado
      if (oldUrl) {
        await this.storage.remove(oldUrl).catch(() => {/* silent */});
      }

      return { id: saved.id };
    } catch (err) {
      // 7-b) Algo falló: limpiamos el fichero NUEVO para no dejar basura
      if (newUrl) {
        await this.storage.remove(newUrl).catch(() => {/* silent */});
      }
      throw new InternalServerErrorException('No se pudo actualizar la guild', err as any);
    }
  }
}
