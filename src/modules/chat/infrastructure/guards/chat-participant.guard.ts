import { Injectable, CanActivate, Inject, ExecutionContext, ForbiddenException, NotFoundException } from "@nestjs/common";
import { IChatRepository } from "../../application/ports/i-chat.repository";
import { ParticipantStatus } from "../../domain/entities/chat-participant.entity";

// src/modules/chat/infrastructure/guards/chat-participant.guard.ts
@Injectable()
export class ChatParticipantGuard implements CanActivate {
  constructor(
    @Inject('CHAT_REPO') private readonly chats: IChatRepository,
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const channelId = req.params.channelId;


    /* 1.  Cargar canal con participantes ----------------------- */
    const chan = await this.chats.findChannelById(channelId);
    if (!chan) throw new NotFoundException('Canal inexistente');

    /* 2.  ¿Usuario activo en el canal? ------------------------- */
    let isMember = chan.participants?.some(
      p => p.status === ParticipantStatus.ACTIVE && p.user?.id === userId,
    );

    if (!isMember)
      //segunda comprobación
      if (! await this.chats.isActiveParticipant(channelId, userId))
      throw new ForbiddenException('No participas en el canal');
     

    /* 3.  Adjuntar a la request para evitar nueva consulta ----- */
    req.chatChannel = chan;
    return true;
  }
}
