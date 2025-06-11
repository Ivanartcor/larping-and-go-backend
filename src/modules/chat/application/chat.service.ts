import { Inject, Injectable } from "@nestjs/common";
import { SendMessageDto } from "../domain/dto/send-message.dto";
import { ListMessagesQuery } from "./queries/list-messages.query";
import { ListUserChannelsQuery } from "./queries/list-user-channels.query";
import { MarkReadUseCase } from "./use-cases/mark-read.use-case";
import { SendMessageUseCase } from "./use-cases/send-message.use-case";
import { SendMediaMessageUseCase } from "./use-cases/send-media-message.use-case";
import { CountUnreadUseCase } from "./use-cases/count-unread.use-case";
import { UploadAttachmentUseCase } from "./use-cases/upload-attachment.use-case";
import { ListParticipantsQuery } from "./queries/list-participants.query";
//import { JoinGuildDefaultChannelUseCase } from "./use-cases/join-guild-channel.use-case";
//import { OpenDirectChannelUseCase } from "./use-cases/open-direct-channel.use-case";
import { IChatRepository } from "./ports/i-chat.repository";
import { JoinChannelUseCase } from "./use-cases/join-channel.use-case";
import { LeaveChannelUseCase } from "./use-cases/leave-channel.use-case";
import { CountUnreadQuery } from "./queries/count-unread.query";
import { UnreadSummaryQuery } from "./queries/unread-summary.query";
import { UpdateMessageUseCase } from "./use-cases/update-message.use-case";
import { DeleteMessageUseCase } from "./use-cases/delete-message.use-case";
import { CreateSubChannelDto } from "../domain/dto/create-sub-channel.dto";
import { CreateGuildSubChannelUseCase } from "./use-cases/create-guild-sub-channel.use-case";
import { IsModeratorQuery } from "./queries/is-moderator.query";
import { OpenDirectChannelUseCase } from "./use-cases/open-direct-channel.use-case";

@Injectable()
export class ChatService {
    constructor(
        private readonly listChanQ: ListUserChannelsQuery,
        private readonly listMsgQ: ListMessagesQuery,
        private readonly sendUC: SendMessageUseCase,
        private readonly readUC: MarkReadUseCase,
        private readonly sendMedUC: SendMediaMessageUseCase,
        private readonly unreadUC: CountUnreadUseCase,
        private readonly uploadAttUC: UploadAttachmentUseCase,
        private readonly openDirectUC: OpenDirectChannelUseCase,
        //private readonly joinGuildUC: JoinGuildDefaultChannelUseCase,
        private readonly listPartsQ: ListParticipantsQuery,
        //@Inject('CHAT_REPO') private readonly chatRepo: IChatRepository,
        private readonly joinUC: JoinChannelUseCase,
        private readonly leaveUC: LeaveChannelUseCase,
        private readonly countUnreadQ: CountUnreadQuery,
        private readonly unreadSummaryQ: UnreadSummaryQuery,
        private readonly editUC: UpdateMessageUseCase,
        private readonly delUC: DeleteMessageUseCase,
        private readonly createSubUC: CreateGuildSubChannelUseCase,
        private readonly modCheckQ: IsModeratorQuery,
    ) { }



    listUserChannels(uid: string, page = 1, perPage = 100) {
        return this.listChanQ.execute(uid, page, perPage);
    }
    listMessages(channelId: string, userId: string, limit: number, before?: Date) {
        // controlador ya pasó uid por guard
        return this.listMsgQ.execute(channelId, userId, limit, before);
    }
    sendMessage(cid: string, uid: string, dto: SendMessageDto, charId?: string) {
        return this.sendUC.execute(cid, uid, dto, charId);
    }
    markRead(msgId: string, uid: string) {
        return this.readUC.execute(msgId, uid);
    }

    uploadAttachment(uid: string, file: Express.Multer.File) {
        return this.uploadAttUC.execute(uid, file);
    }



    /*

    /** Activa (o crea) participante y devuelve la entidad completa del canal 
    async joinChannel(userId: string, charId: string, channelId: string) {
        await this.chats.upsertParticipant(channelId, userId, charId);
        return this.chats.findChannelById(channelId);      // refresco para la UI
    }

    /** Marca LEFT; no borramos fila para conservar historial 
    async leaveChannel(userId: string, channelId: string) {
        await this.chats.leaveChannel(channelId, userId);
    }

    
    */
    openDirect(myId: string, targetId: string, charId?: string) {
        return this.openDirectUC.execute(myId, targetId, charId);
    }

    /*
    joinGuildChannel(gid: string, uid: string, charId?: string) {
        return this.joinGuildUC.execute(gid, uid, charId);
    }
        
    */

    listParticipants(cid: string) {
        return this.listPartsQ.execute(cid);
    }


    /*
    /** Comprueba que el usuario sigue activo en el canal 
    async isParticipant(channelId: string, userId: string) {
        return this.chatRepo.isActiveParticipant(channelId, userId);   // usa el repo existente
    }

    /** Llama al repo para volver a activar (LEFT → ACTIVE) o insertar 
    async ensureParticipant(channelId: string, userId: string, charId: string) {
        return this.chatRepo.upsertParticipant(channelId, userId, charId);
    }
    */

    joinChannel(cid: string, uid: string, charId?: string) {
        return this.joinUC.execute(cid, uid, charId);
    }
    leaveChannel(cid: string, uid: string) {
        return this.leaveUC.execute(cid, uid);
    }

    countUnread(chId: string, uid: string) {
        return this.countUnreadQ.execute(chId, uid);
    }
    sumUnread(uid: string) {
        return this.unreadSummaryQ.execute(uid);
    }

    /* broadcast helper usado por gateway */
    async sumUnreadForBroadcast(channelId: string, exclude: string) {
        const summary = await this.unreadSummaryQ.execute(exclude);
        return summary.filter(s => s.channelId === channelId && s.userId !== exclude);
    }

    editMessage(id, uid, dto, isMod) { return this.editUC.execute(id, uid, dto, isMod); }
    deleteMessage(id, uid, isMod) { return this.delUC.execute(id, uid, isMod); }

    createSubChannel(dto: CreateSubChannelDto, uid: string) {
        return this.createSubUC.execute(dto, uid);      // inyecta el UC
    }

    isModerator(msgId: string, userId: string) {
        return this.modCheckQ.execute(msgId, userId);  // nuevo Query/UC
    }

}
