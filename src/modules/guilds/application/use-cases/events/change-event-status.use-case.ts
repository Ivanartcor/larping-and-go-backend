import {
  Injectable, Inject,
  ForbiddenException, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { IGuildRepository }     from '../../ports/i-guild.repository';
import { EventStatusChange }    from '../../../domain/dto/events/change-status.dto';
import { EventStatus }          from '../../../domain/entities/guild-internal-event.entity';
import { GuildPermission }      from '../../../domain/entities/guild-role.entity';

@Injectable()
export class ChangeEventStatusUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId : string,
    eventId : string,
    change  : EventStatusChange,
    perms   : number,
    isLeader: boolean,
  ) {
    if (!isLeader && (perms & GuildPermission.CREATE_EVENTS) === 0)
      throw new ForbiddenException('CREATE_EVENTS requerido');

    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId)
      throw new NotFoundException('Evento no encontrado');

    if (ev.status !== EventStatus.SCHEDULED)
      throw new BadRequestException('Solo eventos scheduled pueden cambiar');

    ev.status = change === EventStatusChange.CANCELLED
      ? EventStatus.CANCELLED
      : EventStatus.COMPLETED;

    return this.guilds.saveInternalEvent(ev);
  }
}