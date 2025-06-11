// src/modules/chat/infrastructure/gateways/chat.gateway.ts
import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  ConnectedSocket, MessageBody, OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import {
  WS_NS, E_CHANNELS_LIST, E_MESSAGES_LIST, E_MESSAGE_SEND,
  E_MESSAGE_NEW, E_MESSAGE_READ, E_MESSAGE_READACK,
  E_CHANNEL_JOIN,
  E_CHANNEL_LEAVE,
  E_CHANNEL_UNREAD,
  E_CHANNEL_UPDATE,
  E_CHANNEL_JOIN_ACK,
  E_CHANNEL_JOINED,
  E_CHANNEL_LEFT,
  E_MESSAGE_EDIT,
  E_MESSAGE_EDITED,
  E_MESSAGE_DELETE,
  E_MESSAGE_DELETED,
  E_TYPING_START,
  E_TYPING_STOP,
  E_PRESENCE_OFFLINE,
  E_PRESENCE_ONLINE,
} from '../../application/ws/chat.events';
import { ChatService } from '../../application/chat.service';
import { SendMessageDto } from '../../domain/dto/send-message.dto';
import { MarkReadDto } from '../../domain/dto/mark-read.dto';
import { PresenceService } from '../../application/presence.service';
import { JwtWsGuard } from '../guards/jwt-ws.guard';
import { UseGuards } from '@nestjs/common';

interface ChatSocketData {
  userId: string;
  activeCharacterId?: string;
}
type ChatSocket = Socket<          // importa de socket.io
  Record<string, any>,             // eventos server→client
  Record<string, any>,             // eventos client→server
  Record<string, any>,
  ChatSocketData
>;

@UseGuards(JwtWsGuard)
@WebSocketGateway({ namespace: WS_NS })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io!: Server;

  constructor(
    private readonly jwt: JwtService,
    private readonly chat: ChatService,
    private readonly pres: PresenceService,
  ) { }

  /* ───── Init ───── */
  afterInit() {
    console.log('✅ ChatGateway ready');
  }

  /* ───── Handshake & auth ───── */
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token ?? client.handshake.headers.authorization?.split('Bearer ')[1];
      if (!token) throw new Error('missing token');

      const payload: any = await this.jwt.verifyAsync(token);
      client.data.userId = payload.sub;                // guardamos id para futuras llamadas

       await client.join(`u:${payload.sub}`);

      this.pres.connect(payload.sub, client.id);

      client.emit('connected');
    } catch {
      client.disconnect(true);
    }
  }



  /* ─────────────────────────────────────────────────────────── */
  /* 1 · Lista de canales                                        */
  /* ─────────────────────────────────────────────────────────── */
  @SubscribeMessage(E_CHANNELS_LIST)
  async onChannelsList(
    @ConnectedSocket() client: Socket,
    @MessageBody('page') page = 1,
    @MessageBody('perPage') perPage = 100,
  ) {
    const channels = await this.chat.listUserChannels(
      client.data.userId, page, perPage,
    );
    client.emit(E_CHANNELS_LIST, channels);
  }

  /* ─────────────────────────────────────────────────────────── */
  /* 2 · Mensajes de un canal                                    */
  /* ─────────────────────────────────────────────────────────── */
  @SubscribeMessage(E_MESSAGES_LIST)
  async onMessagesList(
    @ConnectedSocket() client: Socket,
    @MessageBody('channelId') channelId: string,
    @MessageBody('limit') limit = 50,
    @MessageBody('before') beforeStr?: string,
  ) {
    const before = beforeStr ? new Date(beforeStr) : undefined;
    const msgs = await this.chat.listMessages(
      channelId, client.data.userId, Math.min(limit, 100), before,
    );
    client.emit(E_MESSAGES_LIST, { channelId, msgs });
  }

  /* ─────────────────────────────────────────────────────────── */
  /* 3 · Enviar mensaje                                          */
  /* ─────────────────────────────────────────────────────────── */
  @SubscribeMessage(E_MESSAGE_SEND)
  async onMessageSend(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() payload: SendMessageDto & { channelId: string },
  ) {
    const { channelId, ...dto } = payload;

    const msg = await this.chat.sendMessage(
      channelId,
      client.data.userId,     // uid
      dto,                    // DTO en 3er lugar
      client.data.activeCharacterId,   // charId (puede ser undefined)
    );

    /* serializador trivial */
    const msgDto = { ...msg };    // TODO map o class-transformer

    /* broadcast */
    this.io.to(channelId).emit(E_MESSAGE_NEW, msgDto);

    /* badges */
    // 1) emisor
    this.io.to(`u:${client.data.userId}`).emit(E_CHANNEL_UPDATE, {
      channelId,
      unread: 0,
      lastMessage: msgDto,
    });

    // 2) resto
    const unreadList = await this.chat.sumUnreadForBroadcast(channelId, client.data.userId);
    unreadList.forEach(u => {
      this.io.to(`u:${u.userId}`).emit(E_CHANNEL_UPDATE, {
        channelId,
        unread: u.unread,
        lastMessage: msgDto,
      });
    });
  }


  /* ─────────────────────────────────────────────────────────── */
  /* 4 · Marcar leído                                            */
  /* ─────────────────────────────────────────────────────────── */


  @SubscribeMessage(E_MESSAGE_READ)
  async onReadMessage(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() body: MarkReadDto,
  ) {
    await this.chat.markRead(body.messageId, client.data.userId);
    /* contador = 0 para ese user & canal */
    this.io.to(`u:${client.data.userId}`).emit(E_CHANNEL_UPDATE, {
      channelId: body.channelId,
      unread: 0,
    });
    /* notificar a los demás (opcional, puede omitirse) */
    this.io.to(body.channelId).emit(E_MESSAGE_READACK, {
      channelId: body.channelId,
      messageId: body.messageId,
      userId: client.data.userId,
    });
  }



  /* ───────────── 5 · Entrar en un canal ───────────── */
  @SubscribeMessage(E_CHANNEL_JOIN)
  async onJoinChannel(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody('channelId') channelId: string,
  ) {
    await this.chat.joinChannel(
      channelId,
      client.data.userId,
      client.data.activeCharacterId,
    );

    /* 1- unir socket a la sala */
    await client.join(channelId);

    /* 2- registrar presencia */
    this.pres.join(channelId, client.data.userId);

    const first = this.pres.isFirstJoin(channelId, client.data.userId);   // ✔️
    if (first) {
      this.io.to(channelId).emit(E_PRESENCE_ONLINE, {
        channelId,
        userId: client.data.userId,
        charId: client.data.activeCharacterId,
      });
    }

    /* 3- ACK al emisor */
    client.emit(E_CHANNEL_JOIN_ACK, { channelId });

    /* 4- aviso de que se unió (opcional si ya mandas presence) */
    client.to(channelId).emit(E_CHANNEL_JOINED, {
      channelId,
      userId: client.data.userId,
    });
  }

  /* ───────────── 6 · Salir de un canal ───────────── */
  @SubscribeMessage(E_CHANNEL_LEAVE)
  async onLeaveChannel(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody('channelId') channelId: string,
  ) {
    await this.chat.leaveChannel(channelId, client.data.userId);
    await client.leave(channelId);

    this.pres.leave(channelId, client.data.userId);
    this.io.to(channelId).emit(E_PRESENCE_OFFLINE, {
      channelId,
      userId: client.data.userId,
    });

    this.io.to(channelId).emit(E_CHANNEL_LEFT, {
      channelId,
      userId: client.data.userId,
    });
  }


  @SubscribeMessage(E_CHANNEL_UNREAD)     // opcional: petición WS
  async onUnread(@ConnectedSocket() c: ChatSocket,
    @MessageBody('channelId') chId: string) {
    const unread = await this.chat.countUnread(chId, c.data.userId);
    c.emit(E_CHANNEL_UNREAD, { channelId: chId, unread });
  }




  /* ─────────────  hook opcional: auto-leave al desconectar ───────────── */
  async handleDisconnect(client: Socket) {
    /* Podemos iterar client.rooms y notificar leave,
       o simplemente confiar en frontend para reconectar. */
    /* futuro: set user “offline” */
    const last = this.pres.disconnect(client.data.userId, client.id);
    if (last) {
      /* Emitir OFFLINE globalmente (u:<id> room) */
      this.io.to(`u:${client.data.userId}`).emit(E_PRESENCE_OFFLINE, {
        userId: client.data.userId,
      });
    }
  }


  @SubscribeMessage(E_MESSAGE_EDIT)
  async onEdit(
    @ConnectedSocket() c: ChatSocket,
    @MessageBody() payload: { messageId: string; content: string },
  ) {
    const isMod = await this.chat.isModerator(payload.messageId, c.data.userId);
    const updated = await this.chat.editMessage(
      payload.messageId,
      c.data.userId,
      { content: payload.content },
      isMod,
    );
    this.io.to(updated.channel.id).emit(E_MESSAGE_EDITED, updated);
  }

  /* borrar */
  @SubscribeMessage(E_MESSAGE_DELETE)
  async onDel(
    @ConnectedSocket() c: ChatSocket,
    @MessageBody('messageId') messageId: string,
  ) {
    const isMod = await this.chat.isModerator(messageId, c.data.userId);
    await this.chat.deleteMessage(messageId, c.data.userId, isMod);
    this.io.to(Array.from(c.rooms)).emit(E_MESSAGE_DELETED, { id: messageId });


  }



  @SubscribeMessage(E_TYPING_START)
  async onTypingStart(
    @ConnectedSocket() c: ChatSocket,
    @MessageBody('channelId') channelId: string,
  ) {
    this.pres.startTyping(channelId, c.data.userId, () => {
      this.io.to(channelId).emit(E_TYPING_START, {
        channelId, userId: c.data.userId,
      });
    });
  }

  @SubscribeMessage(E_TYPING_STOP)
  async onTypingStop(
    @ConnectedSocket() c: ChatSocket,
    @MessageBody('channelId') channelId: string,
  ) {
    this.pres.stopTyping(channelId, c.data.userId);
    this.io.to(channelId).emit(E_TYPING_STOP, {
      channelId, userId: c.data.userId,
    });
  }



}
