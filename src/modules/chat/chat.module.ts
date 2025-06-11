// src/modules/chat/chat.module.ts
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharactersModule } from "../characters/characters.module";
import { GuildsModule } from "../guilds/guilds.module";
import { UsersModule } from "../users/users.module";
import { ChatAttachment } from "./domain/entities/chat-attachment.entity";
import { ChatChannel } from "./domain/entities/chat-channel.entity";
import { ChatMessageRead } from "./domain/entities/chat-message-read.entity";
import { ChatMessage } from "./domain/entities/chat-message.entity";
import { ChatParticipant } from "./domain/entities/chat-participant.entity";
import { ChatRepository } from "./infrastructure/repositories/chat.repository";
import { SendMediaMessageUseCase } from "./application/use-cases/send-media-message.use-case";
import { CountUnreadUseCase } from "./application/use-cases/count-unread.use-case";
import { SendMessageUseCase } from "./application/use-cases/send-message.use-case";
import { MarkReadUseCase } from "./application/use-cases/mark-read.use-case";
import { ListMessagesQuery } from "./application/queries/list-messages.query";
import { ListUserChannelsQuery } from "./application/queries/list-user-channels.query";
import { UploadAttachmentUseCase } from "./application/use-cases/upload-attachment.use-case";
import { ChatController } from "./infrastructure/controllers/chat.controller";
import { ChatService } from "./application/chat.service";
import { ChatGateway } from "./infrastructure/gateways/chat.gateway";
import { ListParticipantsQuery } from "./application/queries/list-participants.query";
import { CountUnreadQuery } from "./application/queries/count-unread.query";
import { UnreadSummaryQuery } from "./application/queries/unread-summary.query";
import { JoinChannelUseCase } from "./application/use-cases/join-channel.use-case";
import { LeaveChannelUseCase } from "./application/use-cases/leave-channel.use-case";
import { JwtWsGuard } from "./infrastructure/guards/jwt-ws.guard";
import { JwtModule } from "@nestjs/jwt";
import { ChatParticipantGuard } from "./infrastructure/guards/chat-participant.guard";
import { UpdateMessageUseCase } from "./application/use-cases/update-message.use-case";
import { DeleteMessageUseCase } from "./application/use-cases/delete-message.use-case";
import { CreateGuildSubChannelUseCase } from "./application/use-cases/create-guild-sub-channel.use-case";
import { PruneAttachmentsJob } from "./application/jobs/prune-attachments.job";
import { IsModeratorQuery } from "./application/queries/is-moderator.query";
import { PresenceService } from "./application/presence.service";
import { OpenDirectChannelUseCase } from "./application/use-cases/open-direct-channel.use-case";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatChannel, ChatParticipant, ChatMessage, ChatMessageRead, ChatAttachment,
    ]),
    forwardRef(() => GuildsModule),
    UsersModule, CharactersModule,   // para posibles servicios
    JwtModule.register({ secret: process.env.JWT_SECRET, })
  ],
  controllers: [ChatController],
  providers: [
    { provide: 'CHAT_REPO', useClass: ChatRepository },
    /* casos de uso se añadirán en la Fase 2 */

    ListUserChannelsQuery,
    ListMessagesQuery,
    ListParticipantsQuery,
    CountUnreadQuery,
    UnreadSummaryQuery,
    IsModeratorQuery,


    SendMessageUseCase,
    MarkReadUseCase,
    UploadAttachmentUseCase,
    SendMediaMessageUseCase,
    JoinChannelUseCase,
    LeaveChannelUseCase,
    CountUnreadUseCase,
    UpdateMessageUseCase,
    DeleteMessageUseCase,
    CreateGuildSubChannelUseCase,
    OpenDirectChannelUseCase,


    ChatService,
    ChatGateway,
    PresenceService,

    JwtWsGuard,
    ChatParticipantGuard,

    PruneAttachmentsJob,

  ],
  exports: [
    'CHAT_REPO',
    ChatService,
    ChatGateway,
    PresenceService,
  ],
})
export class ChatModule { }
