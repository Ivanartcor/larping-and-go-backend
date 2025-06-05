import { Injectable, Inject, ForbiddenException, NotFoundException } from "@nestjs/common";
import { GuildPermission } from "src/modules/guilds/domain/entities/guild-role.entity";
import { IGuildRepository } from "../../ports/i-guild.repository";

@Injectable()
export class ToggleHighlightUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId : string,
    eventId : string,
    perms   : number,
    isLeader: boolean,
  ) {
    if (!isLeader && (perms & GuildPermission.CREATE_EVENTS) === 0)
      throw new ForbiddenException('CREATE_EVENTS requerido');

    const ev = await this.guilds.findInternalEvent(eventId);
    if (!ev || ev.guild.id !== guildId)
      throw new NotFoundException('Evento no encontrado');

    ev.highlighted = !ev.highlighted;
    return this.guilds.saveInternalEvent(ev);
  }
}