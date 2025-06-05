import {
  Injectable, Inject,
  BadRequestException, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { AttendanceDto }    from '../../../domain/dto/events/attendance.dto';
import {
  AttendanceStatus, GuildEventAttendance,
} from '../../../domain/entities/guild-event-attendance.entity';
import { EventStatus }      from '../../../domain/entities/guild-internal-event.entity';

@Injectable()
export class ConfirmAttendanceUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId   : string,
    eventId   : string,
    userId    : string,
    dto       : AttendanceDto,
  ) {
    /* 1️⃣ evento existe y pertenece a la guild */
    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId) throw new NotFoundException('Evento no encontrado');

    if (ev.status !== EventStatus.SCHEDULED)
      throw new ForbiddenException('Evento no admite confirmaciones');

    /* 2️⃣ aforo */
    if (ev.capacity && ev.attendeeCount >= ev.capacity)
      throw new BadRequestException('Aforo completo');

    /* 3️⃣ asistencia previa */
    const prev = await this.guilds.findAttendance(eventId, userId);

    if (prev && prev.status === AttendanceStatus.CONFIRMED) {
      throw new BadRequestException('Ya habías confirmado');
    }

    const now = new Date();

    const membership = await this.guilds.findMembership(userId, guildId);

const fallbackCharacter = membership?.user?.activeCharacter?.id
      ? { id: membership.user.activeCharacter.id }
      : undefined;


    if (prev) {
      /* había registro cancelado → reactivar */
      prev.status    = AttendanceStatus.CONFIRMED;
      prev.changedAt = now;
      prev.character = dto?.characterId ? { id: dto.characterId } as any : fallbackCharacter;
      await this.guilds.saveAttendance(prev);
    } else {
      /* crear nuevo */
      const att = new GuildEventAttendance();
      att.event      = { id: eventId } as any;
      att.user       = { id: userId } as any;
      att.character  = dto?.characterId ? { id: dto.characterId } as any : fallbackCharacter;
      att.status     = AttendanceStatus.CONFIRMED;
      att.changedAt  = now;
      await this.guilds.createAttendance(att);
    }

    /* attendee_count se actualiza vía trigger */
    return this.guilds.findInternalEvent(eventId);   // devolver estado actualizado
  }
}