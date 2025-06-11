// chat/application/jobs/prune-attachments.job.ts
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { IChatRepository } from '../ports/i-chat.repository';
import { IStoragePort } from 'src/modules/users/application/ports/i-storage.port';

@Injectable()
export class PruneAttachmentsJob {
  private readonly log = new Logger('PruneJob');
  private readonly MAX_AGE = 60 * 60 * 1000;            // 1 hour

  constructor(
    @Inject('CHAT_REPO') private readonly chats: IChatRepository,
    @Inject('STORAGE')   private readonly storage: IStoragePort,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handle() {
    const cutoff = new Date(Date.now() - this.MAX_AGE);
    const orphans = await this.chats.findOrphanAttachments(cutoff);
    if (!orphans.length) return;

 /* Eliminar ficheros en paralelo pero sin abortar todo el job si falla uno */
  const results = await Promise.allSettled(
    orphans.map(o => this.storage.remove(o.fileUrl)),
  );

  /* Registra cualquier error no-ENOENT */
  results.forEach((r, idx) => {
    if (r.status === 'rejected') this.log.warn(
      `No se pudo borrar "${orphans[idx].fileUrl}": ${r.reason}`,
    );
  });

    // 2. borrar filas
    await this.chats.deleteAttachments(orphans.map(o => o.id));

    this.log.log(`Pruned ${orphans.length} orphan chat attachments`);
  }
}
