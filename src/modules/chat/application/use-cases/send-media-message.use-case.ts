import { Injectable, Inject, ForbiddenException, BadRequestException } from "@nestjs/common";
import { IStoragePort } from "src/modules/users/application/ports/i-storage.port";
import { SendMediaDto } from "../../domain/dto/send-media.dto";
import { ChatAttachment } from "../../domain/entities/chat-attachment.entity";
import { ChatMessage, MessageType } from "../../domain/entities/chat-message.entity";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class SendMediaMessageUseCase {
  constructor(
    @Inject('CHAT_REPO') private readonly chat: IChatRepository,
    @Inject('STORAGE')   private readonly storage: IStoragePort,
  ) {}

  async execute(
    channelId: string,
    userId   : string,
    charId   : string | undefined,
    file     : Express.Multer.File,
    dto      : SendMediaDto,
  ) {
    /* 1. participante activo */
    const active = await this.chat.isActiveParticipant(channelId, userId);
    if (!active) throw new ForbiddenException('No participas en el chat');

    /* 2. reglas de archivo simples, de momento solo imagenes o pdf*/
    const okTypes = ['image/png','image/jpeg','application/pdf'];
    if (!okTypes.includes(file.mimetype))
      throw new BadRequestException('Tipo de archivo no permitido');
    if (file.size > 20_000_000)
      throw new BadRequestException('Máx 20 MB');

    /* 3. subir a storage */
    const meta = await this.storage.uploadChatAttachment(
      userId, file.buffer, file.mimetype, file.originalname,
    );

    /* 4. crear mensaje + attachment */
    const msg = new ChatMessage();
    msg.channel = { id: channelId } as any;
    msg.senderUser = { id: userId } as any;
    if (charId) msg.senderCharacter = { id: charId } as any;
    msg.type = MessageType.MEDIA;
    msg.content = dto.caption ?? '';
    msg.sentAt = new Date();

    const att = new ChatAttachment();
    att.fileUrl     = meta.url;
    att.fileName    = file.originalname;
    att.contentType = file.mimetype;
    att.sizeBytes   = file.size;

    msg.attachments = [att];

    const saved = await this.chat.saveMessage(msg);   // repo cascade salva att

    return saved;   // entity con relaciones → controller mapper → DTO público
  }
}
