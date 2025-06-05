import {
  Injectable, Inject,
  BadRequestException, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository }       from '../../ports/i-guild.repository';
import { UpdateInternalEventDto } from '../../../domain/dto/events/update-internal-event.dto';
import { EventStatus             } from '../../../domain/entities/guild-internal-event.entity';
import { GuildPermission         } from '../../../domain/entities/guild-role.entity';

@Injectable()
export class UpdateInternalEventUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId   : string,
    eventId   : string,
    dto       : UpdateInternalEventDto,
    perms     : number,
    isLeader  : boolean,
  ) {
    /* 1️⃣ permisos */
    if (!isLeader && (perms & GuildPermission.CREATE_EVENTS) === 0)
      throw new ForbiddenException('CREATE_EVENTS requerido');

    /* 2️⃣ evento existe */
    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId)
      throw new NotFoundException('Evento no encontrado');

    if (ev.status !== EventStatus.SCHEDULED)
      throw new BadRequestException('Solo eventos scheduled pueden editarse');

    /* 3️⃣ validaciones de fechas si se editan */
    if (dto.startAt) {
      const s = new Date(dto.startAt);
      if (dto.endAt && new Date(dto.endAt) <= s)
        throw new BadRequestException('endAt debe ser posterior a startAt');
      ev.startAt = s;
    }
    if (dto.endAt) {
      const e = new Date(dto.endAt);
      if (e <= ev.startAt)
        throw new BadRequestException('endAt debe ser posterior a startAt');
      ev.endAt = e;
    }

    /* 4️⃣ resto de campos simples */
    if (dto.title        !== undefined) ev.title        = dto.title;
    if (dto.description  !== undefined) ev.description  = dto.description;
    if (dto.locationText !== undefined) ev.locationText = dto.locationText;
    if (dto.latitude     !== undefined) ev.latitude     = dto.latitude;
    if (dto.longitude    !== undefined) ev.longitude    = dto.longitude;
    if (dto.bannerUrl    !== undefined) ev.bannerUrl    = dto.bannerUrl;
    if (dto.capacity     !== undefined) {
      if (dto.capacity !== null && dto.capacity! < ev.attendeeCount)
        throw new BadRequestException('capacity menor que asistentes actuales');
      ev.capacity = dto.capacity;
    }

    /* 5️⃣ persistir y devolver */
    return this.guilds.saveInternalEvent(ev);
  }
}