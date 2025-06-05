import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IGuildRepository } from '../../application/ports/i-guild.repository';

@Injectable()
export class CompletePastEventsJob {
  private readonly log = new Logger(CompletePastEventsJob.name);

  constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
) {}

  /** Ejecuta cada 15 min a los mm:00,15,30,45 pero lo cambiamos a 10 min*/
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handle() {
    const now = new Date();
    const affected = await this.guilds.completePastEvents(now);

    if (affected) {
      this.log.verbose(`Eventos completados automáticamente: ${affected}`);

      // (Opcional) fetch ids y emitir WS / notificaciones
      // const ids = await this.guilds.findJustCompleted(new Date(Date.now() - 60_000));
      // this.wsGateway.notifyEventsCompleted(ids);
    }
  }
}