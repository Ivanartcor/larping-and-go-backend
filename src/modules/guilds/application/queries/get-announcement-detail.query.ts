import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AnnouncementType } from "../../domain/entities/guild-announcement.entity";
import { GuildPermission } from "../../domain/entities/guild-role.entity";
import { IGuildRepository } from "../ports/i-guild.repository";

// queries/board/get-announcement-detail.query.ts
@Injectable()
export class GetAnnouncementDetailQuery {
  constructor(@Inject('GUILD_REPO') private readonly guilds: IGuildRepository) {}

  async execute(guildId: string, annId: string, userId: string, perms: number) {
    const ann = await this.guilds.findAnnouncementWithOptions(annId);
    if (!ann || ann.guild.id !== guildId) throw new NotFoundException();

    /* ---- proyección básica ---- */
    const detail: AnnouncementDetailDto = {
      id       : ann.id,
      title    : ann.title,
      content  : ann.content,
      type     : ann.type,
      createdAt: ann.createdAt,
      author   : ann.authorUser
        ? { id: ann.authorUser.id, username: ann.authorUser.username }
        : null,
    };

    /* ---- si es encuesta ---- */
    if (ann.type === AnnouncementType.POLL) {
      const pollClosed = ann.isClosed ||
                         (!!ann.closeAt && ann.closeAt <= new Date());

      const canSeeResults =
          ann.showResults || pollClosed ||
          (perms & GuildPermission.POST_ANNOUNCEMENT);

      detail.isClosed     = pollClosed;
      detail.closeAt      = ann.closeAt ?? null;
      detail.showResults  = ann.showResults;
      detail.multiSelect  = ann.multiSelect;
      detail.maxChoices   = ann.maxChoices ?? null;

      /* Opciones con o sin votos según permisos */
      const totalVotes = ann.pollOptions?.reduce((s,o)=>s+o.votesCount,0);
      detail.options = ann.pollOptions?.sort((a,b)=>a.position-b.position)
        .map(o => ({
          id         : o.id,
          optionText : o.optionText,
          votes      : canSeeResults ? o.votesCount : 0,
          percentage : canSeeResults && totalVotes
                        ? Math.round(o.votesCount*100/totalVotes)
                        : 0,
        }));

      /* votos propios */
      const myVotes = await this.guilds.findVotesByUser(ann.id, userId);
      detail.myVotes = myVotes.map(v => v.pollOption.id);
    }

    return detail;
  }
}
