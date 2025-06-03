import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { IGuildRepository } from "../ports/i-guild.repository";

@Injectable()
export class CloseExpiredPollsJob {
    private readonly log = new Logger('CloseExpiredPolls');

    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }


    @Cron(CronExpression.EVERY_10_MINUTES)
    async handle() {
        const polls = await this.guilds.findExpiredOpenPolls(new Date());
        if (!polls.length) return;

        for (const p of polls) {
            await this.guilds.closePoll(p.id);
            //this.gateway.notifyPollClosed(p.guild.id, p.id); // opcional
        }
    }
}
