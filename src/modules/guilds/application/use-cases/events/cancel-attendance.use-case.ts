import { Injectable, Inject, NotFoundException, BadRequestException } from "@nestjs/common";
import { AttendanceStatus } from "src/modules/guilds/domain/entities/guild-event-attendance.entity";
import { IGuildRepository } from "../../ports/i-guild.repository";

@Injectable()
export class CancelAttendanceUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, eventId: string, userId: string) {
    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId) throw new NotFoundException();

    const att = await this.guilds.findAttendance(eventId, userId);
    if (!att || att.status !== AttendanceStatus.CONFIRMED)
      throw new BadRequestException('No tenías asistencia confirmada');

    att.status    = AttendanceStatus.CANCELLED;
    att.changedAt = new Date();
    await this.guilds.saveAttendance(att);

    return this.guilds.findInternalEvent(eventId);
  }
}