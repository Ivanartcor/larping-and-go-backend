import {
  Injectable, Inject, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { IGuildRepository }        from '../../ports/i-guild.repository';
import { CreateAnnouncementDto }   from '../../../domain/dto/announcements/create-announcement.dto';
import {
  GuildAnnouncement, AnnouncementType,
} from '../../../domain/entities/guild-announcement.entity';
import { GuildPollOption }         from '../../../domain/entities/guild-poll-option.entity';
import { GuildPermission }         from '../../../domain/entities/guild-role.entity';

@Injectable()
export class CreateAnnouncementUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId      : string,
    dto          : CreateAnnouncementDto,
    authorUserId : string,
    authorCharId : string | undefined,
    perms        : number,           // permisos de la membresía
  ) {
    /* ───── 1. Permiso ───── */
    if ((perms & GuildPermission.POST_ANNOUNCEMENT) === 0) {
      throw new ForbiddenException('POST_ANNOUNCEMENT requerido');
    }

    /* ───── 2. Validación de reglas ───── */
    const isPoll = dto.type === AnnouncementType.POLL;

    if (isPoll) {
      // opciones
      if (!dto.options || dto.options.length < 2)
        throw new BadRequestException('Un poll necesita ≥ 2 opciones');
      // fecha de cierre
      if (!dto.closeAt)
        throw new BadRequestException('closeAt requerido para polls');
      const closeAt = new Date(dto.closeAt);
      if (closeAt <= new Date())
        throw new BadRequestException('closeAt debe ser futura');

      // multiSelect / maxChoices coherentes (DTO ya obliga min=2)
      if (dto.multiSelect === false && dto.maxChoices !== undefined)
        throw new BadRequestException('maxChoices solo con multiSelect=true');
    } else {
      // type = general
      if (dto.options)   throw new BadRequestException('“options” solo para polls');
      if (dto.closeAt)   throw new BadRequestException('“closeAt” solo para polls');
      if (dto.multiSelect || dto.maxChoices)
        throw new BadRequestException('multiSelect/maxChoices solo en polls');
    }

    /* ───── 3. Construir entidad ───── */
    const ann = new GuildAnnouncement();
    ann.guild            = { id: guildId } as any;
    ann.authorUser       = { id: authorUserId } as any;
    if (authorCharId) ann.authorCharacter = { id: authorCharId } as any;

    ann.title        = dto.title;
    ann.content      = dto.content;
    ann.type         = dto.type;
    ann.showResults  = dto.showResults ?? true;
    ann.closeAt      = isPoll ? new Date(dto.closeAt!) : undefined;
    ann.multiSelect  = dto.multiSelect ?? false;
    ann.maxChoices   = dto.maxChoices;

    /* Opciones del poll */
    if (isPoll) {
      ann.pollOptions = dto.options!.map((o, idx) => {
        const opt = new GuildPollOption();
        opt.optionText = o.optionText;
        opt.position   = idx;
        return opt;
      });
    }

    /* ───── 4. Persistir ───── */
    const saved = await this.guilds.createAnnouncement(ann);
    return this.guilds.findAnnouncement(saved.id); // con relaciones
  }
}