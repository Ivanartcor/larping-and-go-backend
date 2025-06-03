import { Injectable, Inject } from '@nestjs/common';
import { IGuildRepository } from '../ports/i-guild.repository';

@Injectable()
export class ListAnnouncementsQuery {
    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }

    async execute(guildId: string, page = 1, perPage = 20) {
        const total = await this.guilds.countAnnouncements(guildId);
        const items = await this.guilds.listAnnouncements(
            guildId, (page - 1) * perPage, perPage);
        return {
            page, perPage,
            total, totalPages: Math.ceil(total / perPage),
            items,
        };
    }
}
