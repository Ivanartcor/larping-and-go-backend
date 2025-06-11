// src/modules/chat/infrastructure/controllers/chat.controller.ts
import {
    Controller, Get, Post, Param, Body, Query,
    UseGuards, Req, ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    Patch,
    Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { ChatParticipantGuard } from '../guards/chat-participant.guard';
import { ChatService } from '../../application/chat.service';
import { SendMessageDto } from '../../domain/dto/send-message.dto';
import { MarkReadDto } from '../../domain/dto/mark-read.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuildMemberGuard } from 'src/modules/guilds/infrastructure/guards/guild-member.guard';
import { UpdateMessageDto } from '../../domain/dto/update-message.dto';
import { GuildPermissions } from 'src/modules/guilds/infrastructure/decorators/guild-permissions.decorator';
import { GuildPermissionsGuard } from 'src/modules/guilds/infrastructure/guards/guild-permissions.guard';
import { GuildPermission } from 'src/modules/guilds/domain/entities/guild-role.entity';
import { CreateSubChannelDto } from '../../domain/dto/create-sub-channel.dto';


@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)                              // todas las rutas exigen login

export class ChatController {
    constructor(private readonly chat: ChatService) { }

    /* ─────────────────────────────────────────────────────────── */
    /*  1 · Lista de canales para el usuario logueado              */
    /* ─────────────────────────────────────────────────────────── */
    @Get('channels')
    listChannels(
        @Query('page', ParseIntPipe) page = 1,
        @Query('perPage', ParseIntPipe) perPage = 100,
        @Req() req,
    ) {
        return this.chat.listUserChannels(req.user.id, page, perPage);
    }

    /* ─────────────────────────────────────────────────────────── */
    /*  2 · Mensajes de un canal (lazy-infinite scroll)           */
    /* ─────────────────────────────────────────────────────────── */
    @UseGuards(ChatParticipantGuard)
    @Get('channels/:channelId/messages')
    listMessages(
        @Param('channelId') channelId: string,
        @Req() req,
        @Query('limit', ParseIntPipe) limit = 50,
        @Query('before') before?: string,            // ISO string o undefined


    ) {
        const beforeDate = before ? new Date(before) : undefined;      // ← conversión segura

        return this.chat.listMessages(
            channelId,
            req.user.id,
            Math.min(limit, 100),                      // tope de seguridad
            beforeDate,
        );
    }


    /* ─────────────────────────────────────────────────────────── */
    /*  3 · Enviar mensaje                                        */
    /*    (para adjuntos binarios , adjuntamos el id de los attachments subidos en subir archivo en chat*/
    /* ─────────────────────────────────────────────────────────── */
    @UseGuards(ChatParticipantGuard)
    @Post('channels/:channelId/messages')
    sendMessage(
        @Param('channelId') channelId: string,
        @Body() dto: SendMessageDto,
        @Req() req,
    ) {
        return this.chat.sendMessage(channelId, req.user.id, dto, req.user.activeCharacter?.id);
    }

    /* ──────── 3b · Subir archivo en chat ───────── */
    @Post('attachments')
    @UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: 10_000_000 },          // 10 MB
        fileFilter: (_, _f, cb) => cb(null, true),    // validar MIME si quieres
    }))
    uploadAttachment(
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
    ) {
        return this.chat.uploadAttachment(req.user.id, file);
    }

    

    /* ─────────────────────────────────────────────────────────── */
    /*  4 · Marcar un mensaje como leído                          */
    /* ─────────────────────────────────────────────────────────── */
    @Post('messages/read')
    markRead(
        @Body() dto: MarkReadDto,
        @Req() req,
    ) {
        return this.chat.markRead(dto.messageId, req.user.id);
    }


    //versión con querys
    /** contador no leídos de un canal */
    @UseGuards(ChatParticipantGuard)
    @Get('channels/:id/unread')
    unreadCount(
        @Param('id') chId: string,
        @Req() req) {
        return this.chat.countUnread(chId, req.user.id);
    }

    /** resumen global */
    @Get('unread-summary')
    unreadSummary(@Req() req) {
        return this.chat.sumUnread(req.user.id);
    }



    
/* ─── Abrir / recuperar canal directo ─────────────────── */
  @Post('direct/:targetUserId')
  openDirect(
    @Param('targetUserId') targetId: string,
    @Req() req,
  ) {
    return this.chat.openDirect(
      req.user.id,
      targetId,
      req.user.activeCharacter?.id,
    );
  }

 
  

    /* ─── Participantes de un canal (para el panel lateral) ── */
    @UseGuards(ChatParticipantGuard)
    @Get('channels/:channelId/participants')
    participants(
        @Param('channelId') cid: string,
    ) {
        return this.chat.listParticipants(cid);
    }



    @UseGuards(ChatParticipantGuard)
    @Patch('messages/:id')
    editMsg(@Param('id') id, @Body() dto: UpdateMessageDto, @Req() req) {
        return this.chat.editMessage(id, req.user.id, dto, false);
    }

    @UseGuards(ChatParticipantGuard)
    @Delete('messages/:id')
    delMsg(@Param('id') id, @Req() req) {
        return this.chat.deleteMessage(id, req.user.id, false);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, GuildMemberGuard, GuildPermissionsGuard)
    @GuildPermissions(GuildPermission.CREATE_EVENTS)   // ó MANAGE_ROLES
    @Post('guilds/:gid/chat-channels')
    createSubChannel(
        @Param('gid') gid: string,
        @Body() dto: CreateSubChannelDto,
        @Req() req,
    ) {
        return this.chat.createSubChannel(
            { ...dto, guildId: gid },
            req.user.id,
        );
    }


}
