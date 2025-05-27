// src/modules/guilds/application/use-cases/update-guild.use-case.ts
import {
  Injectable, Inject, ConflictException, ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';
import { UpdateGuildDto } from '../../domain/dto/update-guild.dto';
import { GuildPermission } from '../../domain/entities/guild-role.entity';
import { GuildAccess } from '../../domain/entities/guild.entity';

@Injectable()
export class UpdateGuildUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) { }

  async execute(guildId: string, dto: UpdateGuildDto, membershipPerms: number, isLeader: boolean) {
    /* 1. Permiso */
    const canEdit = isLeader || (membershipPerms & GuildPermission.EDIT_INFO);
    if (!canEdit) throw new ForbiddenException('Permiso EDIT_INFO requerido');

    /* 2. Cargar guild */
    const guild = await this.guilds.findById(guildId);   // añadimos findById al repo o re-use repo.repo.findOne
    if (!guild) throw new NotFoundException('Guild no encontrada');

    /* 3. Unicidad nombre */
    if (dto.name && dto.name !== guild.name) {
      if (await this.guilds.existsByName(dto.name)) {
        throw new ConflictException('Nombre ya en uso');
      }
      guild.name = dto.name;
    }

    /* 4. Resto de campos opcionales */
    if (dto.description !== undefined) guild.description = dto.description;
    if (dto.emblemUrl !== undefined) guild.emblemUrl = dto.emblemUrl;
    if (dto.privacy !== undefined) guild.privacy = dto.privacy;
    if (dto.accessType !== undefined) guild.accessType = dto.accessType;


    /* 5. Gestión de código de acceso --------------------------------- */
    const atype = guild.accessType;                // tras posibles cambios
    const code = dto.accessCode;

    if (atype === GuildAccess.CODE) {
      if (code) {
        const { createHash } = await import('crypto');
        guild.accessCodeHash = createHash('sha256').update(code).digest('hex');
      } else if (!guild.accessCodeHash) {
        // nunca tuvo código y no se proporciona uno nuevo
        throw new BadRequestException(
          'Debes proporcionar "accessCode" cuando accessType = code',
        );
      }
      // else: ya tenía hash y mantenemos el existente
    } else { // atype !== 'code'
      if (code) {
        throw new BadRequestException(
          'No puedes enviar "accessCode" si accessType no es "code"',
        );
      }
      guild.accessCodeHash = null;                 // limpiar hash
    }

    // Response minimal; controller devolverá completo con query
    const saved = await this.guilds.save(guild);
    return { id: saved.id };
  }
}

