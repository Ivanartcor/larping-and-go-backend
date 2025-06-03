import {
  Injectable, Inject, ForbiddenException, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { VoteDto } from '../../../domain/dto/announcements/vote.dto';
import { AnnouncementType } from '../../../domain/entities/guild-announcement.entity';
import { GuildVote } from '../../../domain/entities/guild-vote.entity';

@Injectable()
export class VotePollUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) { }

  async execute(
    guildId: string,
    annId: string,
    userId: string,
    charId: string | undefined,
    dto: VoteDto,
  ) {
    const ann = await this.guilds.findAnnouncement(annId);
    if (!ann || ann.guild.id !== guildId) throw new NotFoundException();
    if (ann.type !== AnnouncementType.POLL) throw new BadRequestException('No es una encuesta');

    if (ann.isClosed || (ann.closeAt && ann.closeAt <= new Date()))
      throw new ForbiddenException('La encuesta está cerrada');

    /* reglas de selección */
    if (!ann.multiSelect && dto.optionIds.length !== 1)
      throw new BadRequestException('Debe votar exactamente una opción');

    if (ann.multiSelect && ann.maxChoices && dto.optionIds.length > ann.maxChoices)
      throw new BadRequestException(`Máximo ${ann.maxChoices} opciones`);

    /* eliminar votos previos */
    const prev = await this.guilds.findVote(userId, annId);
    await Promise.all(prev.map(v => this.guilds.deleteVote(v.id)));

    /* insertar nuevos */
    for (const optId of dto.optionIds) {
      const v = new GuildVote();
      v.announcement = { id: annId } as any;
      v.pollOption = { id: optId } as any;
      v.user = { id: userId } as any;
      if (charId) v.character = { id: charId } as any;
      await this.guilds.createVote(v);
    }
  }
}