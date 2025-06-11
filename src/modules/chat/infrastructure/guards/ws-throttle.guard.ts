// src/common/guards/ws-throttle.guard.ts
/*
import {
  CanActivate, Injectable, ExecutionContext, TooManyRequestsException,
} from '@nestjs/common';
import { ThrottlerStorageMemoryService } from '@nestjs/throttler-storage-memory';
import { Socket } from 'socket.io';

@Injectable()
export class WsThrottleGuard implements CanActivate {
  private readonly ttl   = 10;    // seg
  private readonly limit = 100;    // msgs / ttl / canal

  constructor(private readonly storage: ThrottlerStorageMemoryService) {}

  async canActivate(ctx: ExecutionContext) {
    const client : Socket = ctx.switchToWs().getClient();
    const body             = ctx.switchToWs().getData();
    const event            = ctx.switchToWs().getHandler().name; // handler name
    const channelId        = body?.channelId ?? 'global';

    const key = `ws:${client.data.userId}:${channelId}:${event}`;

    const record = await this.storage.getRecord(key);

    if (record.length >= this.limit) {
      const ttl = record[0].expireAt - Date.now();
      throw new TooManyRequestsException(`Rate limit. Retry in ${Math.ceil(ttl/1e3)}s`);
    }
    await this.storage.addRecord(key, this.ttl);
    return true;
  }
}
*/
