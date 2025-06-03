import {
  Injectable, Inject,
  ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { IGuildRepository }     from '../../ports/i-guild.repository';
import { GuildPermission }      from '../../../domain/entities/guild-role.entity';

@Injectable()
export class DeleteAnnouncementUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId  : string,
    annId    : string,
    userId   : string,
    perms    : number,
  ) {
    const ann = await this.guilds.findAnnouncement(annId);
    if (!ann || ann.guild.id !== guildId) throw new NotFoundException();

    const canDel = ann.authorUser?.id === userId ||
                   (perms & GuildPermission.POST_ANNOUNCEMENT);
    if (!canDel) throw new ForbiddenException('Sin permiso');

    await this.guilds.deleteAnnouncement(annId);
  }
}