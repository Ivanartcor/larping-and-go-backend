// use-cases/board/get-poll-results.use-case.ts
import {
  Injectable, Inject,
  NotFoundException, ForbiddenException,
} from '@nestjs/common';
import {
  IGuildRepository,
} from '../../ports/i-guild.repository';
import {
  AnnouncementType,
} from '../../../domain/entities/guild-announcement.entity';
import {
  PollResultsDto,
} from '../../../domain/dto/announcements/poll-results.dto';
import { GuildPermission } from '../../../domain/entities/guild-role.entity';

@Injectable()
export class GetPollResultsUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId : string,
    annId   : string,
    userId  : string,
    perms   : number,
  ): Promise<PollResultsDto> {
    const ann = await this.guilds.findAnnouncementWithOptions(annId);
    if (!ann || ann.guild.id !== guildId)
      throw new NotFoundException('Encuesta no encontrada');

    /* ¿Se pueden mostrar resultados? */
    const pollClosed = ann.closeAt && ann.closeAt <= new Date();
    const canSee = ann.showResults || pollClosed ||
                   (perms & GuildPermission.POST_ANNOUNCEMENT);
    if (!canSee) throw new ForbiddenException('Resultados ocultos');

    /* Totales */
    const totalVotes = ann.pollOptions?.reduce((s, o) => s + o.votesCount, 0) ?? 0;

    const options =  (ann.pollOptions ?? []).sort((a,b) => a.position - b.position)
      .map(o => ({
        id: o.id,
        optionText: o.optionText,
        votes: o.votesCount,
        percentage: totalVotes ? Math.round(o.votesCount * 100 / totalVotes) : 0,
      }));

    /* Votos propios (para UI) */
    const myVotes = (await this.guilds.findVote(userId, annId))
                      .map(v => v.pollOption.id);

    return {
      id: ann.id,
      title: ann.title,
      closeAt: ann.closeAt ?? null,
      isClosed: ann.isClosed,
      totalVotes : totalVotes,
      options : options,
      myVotes : myVotes,
    };
  }
}
