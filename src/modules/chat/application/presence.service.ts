import { Injectable } from "@nestjs/common";

// chat/application/presence.service.ts
@Injectable()
export class PresenceService {
  /** sockets por userId */
  private userSockets = new Map<string, Set<string>>();
  /** users por channelId  */
  private channelUsers = new Map<string, Set<string>>();
  /** typing timers         */
  private typingTimeout = new Map<string, NodeJS.Timeout>();  // key: userId|channelId

  /* === conexiones === */
  connect(uid: string, sid: string) {
    this.userSockets.set(uid, (this.userSockets.get(uid) ?? new Set()).add(sid));
  }
  disconnect(uid: string, sid: string) {
    const set = this.userSockets.get(uid);
    if (!set) return false;
    set.delete(sid);
    if (!set.size) { this.userSockets.delete(uid); return true; }  // last socket
    return false;
  }

  /* === salas === */
  join(channelId: string, uid: string) {
    this.channelUsers.set(channelId, (this.channelUsers.get(channelId) ?? new Set()).add(uid));
  }
  leave(channelId: string, uid: string) {
    const set = this.channelUsers.get(channelId);
    if (!set) return;
    set.delete(uid);
    if (!set.size) this.channelUsers.delete(channelId);
  }
  isFirstJoin(channelId: string, uid: string) {
    return (this.channelUsers.get(channelId)?.size ?? 0) === 1;
  }

  /* === typing === */
  startTyping(channelId: string, uid: string, cb: ()=>void) {
    const key = `${uid}|${channelId}`;
    clearTimeout(this.typingTimeout.get(key));
    cb();                                   // emitir typing:start
    this.typingTimeout.set(key,
      setTimeout(() => { cb();              // emit typing:stop
                    this.typingTimeout.delete(key);
                  }, 4000));                // 4 s sin “stop” explícito
  }
  stopTyping(channelId: string, uid: string) {
    clearTimeout(this.typingTimeout.get(`${uid}|${channelId}`));
    this.typingTimeout.delete(`${uid}|${channelId}`);
  }
}
