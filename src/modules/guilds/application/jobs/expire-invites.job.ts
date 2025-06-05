import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron }               from '@nestjs/schedule';
import { CronExpression }     from '@nestjs/schedule';
import { IGuildRepository }   from '../../application/ports/i-guild.repository';

@Injectable()
export class ExpireInvitesJob {
  private readonly log = new Logger(ExpireInvitesJob.name);

  constructor(@Inject('GUILD_REPO') private readonly guilds: IGuildRepository) {}

  /** Ejecuta al minuto 0 de cada hora */
  @Cron(CronExpression.EVERY_HOUR)
  async handle() {
    const now = new Date();
    const expired = await this.guilds.expireInvites(now);

    if (expired) {
      this.log.verbose(`Invitaciones expiradas automáticamente: ${expired}`);
    }
  }
}
