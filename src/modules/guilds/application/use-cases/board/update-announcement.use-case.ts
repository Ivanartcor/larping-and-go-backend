import { Injectable, Inject, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { UpdateAnnouncementDto } from "src/modules/guilds/domain/dto/announcements/update-announcement.dto";
import { AnnouncementType } from "src/modules/guilds/domain/entities/guild-announcement.entity";
import { GuildPollOption } from "src/modules/guilds/domain/entities/guild-poll-option.entity";
import { GuildPermission } from "src/modules/guilds/domain/entities/guild-role.entity";
import { IGuildRepository } from "../../ports/i-guild.repository";

@Injectable()
export class UpdateAnnouncementUseCase {
  constructor(@Inject('GUILD_REPO') private readonly guilds: IGuildRepository) {}

  async execute(
    guildId : string,
    annId   : string,
    dto     : UpdateAnnouncementDto,
    userId  : string,
    perms   : number,
  ) {
    const ann = await this.guilds.findAnnouncement(annId);
    if (!ann || ann.guild.id !== guildId) throw new NotFoundException();

    /* Permisos: autor o POST_ANNOUNCEMENT */
    if (ann.authorUser?.id !== userId &&
        (perms & GuildPermission.POST_ANNOUNCEMENT) === 0) {
      throw new ForbiddenException();
    }

    const wasPoll = ann.type === AnnouncementType.POLL;
    const willBePoll = dto.type ? dto.type === AnnouncementType.POLL : wasPoll;

    /* -------- VALIDACIONES BÁSICAS -------- */
    if (dto.title)   ann.title   = dto.title;
    if (dto.content) ann.content = dto.content;

    /* ===== Caso 1: Cambiar de GENERAL → POLL ===== */
    if (!wasPoll && willBePoll) {
      /* requisitos */
      if (!dto.options || dto.options.length < 2)
        throw new BadRequestException('options ≥ 2 requerido');
      if (!dto.closeAt)
        throw new BadRequestException('closeAt requerido');
      const close = new Date(dto.closeAt);
      if (close <= new Date())
        throw new BadRequestException('closeAt futura');

      /* transformar */
      ann.type        = AnnouncementType.POLL;
      ann.closeAt     = close;
      ann.showResults = dto.showResults ?? true;
      ann.multiSelect = dto.multiSelect ?? false;
      ann.maxChoices  = dto.maxChoices;

      ann.pollOptions = dto.options.map((o, idx) => Object.assign(
        new GuildPollOption(), { optionText: o.optionText, position: idx },
      ));
    }

    /* ===== Caso 2: Cambiar de POLL → GENERAL ===== */
    if (wasPoll && !willBePoll) {
      const votes = await this.guilds.countVotesByOption(annId);
      if (votes > 0)
        throw new ForbiddenException('No puede convertirse: ya hay votos');

      await this.guilds.deletePollOptions(annId);
      await this.guilds.deleteVotesByAnnouncement(annId);

      ann.type        = AnnouncementType.GENERAL;
      ann.closeAt     = null;
      ann.multiSelect = false;
      ann.maxChoices  = null;
    }

    /* ===== Caso 3: sigue siendo POLL y no hay votos estructurales ===== */
    if (wasPoll && willBePoll) {
      const hasVotes = (await this.guilds.countVotesByOption(annId)) > 0;

      if (dto.closeAt) {
        const d = new Date(dto.closeAt);
        if (d <= new Date()) throw new BadRequestException('closeAt futura');
        ann.closeAt = d;
      }
      if (dto.showResults !== undefined) ann.showResults = dto.showResults;

      if (hasVotes &&
          (dto.options || dto.multiSelect !== undefined || dto.maxChoices !== undefined)) {
        throw new BadRequestException('Opciones/reglas bloqueadas: ya hay votos');
      }

      if (!hasVotes) {
        if (dto.multiSelect !== undefined) ann.multiSelect = dto.multiSelect;
        if (dto.maxChoices  !== undefined) ann.maxChoices  = dto.maxChoices;
        if (dto.options) {
          await this.guilds.deletePollOptions(annId);
          ann.pollOptions = dto.options.map((o, idx) => Object.assign(
            new GuildPollOption(), { optionText: o.optionText, position: idx },
          ));
        }
      }
    }

    /* ===== Guardar y devolver ===== */
    await this.guilds.updateAnnouncement(ann);
    return this.guilds.findAnnouncement(annId);
  }
}
