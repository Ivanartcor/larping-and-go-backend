import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { IStoragePort } from "src/modules/users/application/ports/i-storage.port";
import { ChatAttachment } from "../../domain/entities/chat-attachment.entity";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class UploadAttachmentUseCase {
  constructor(
    @Inject('CHAT_REPO') private readonly chats: IChatRepository,
    @Inject('STORAGE')   private readonly storage: IStoragePort,
  ) {}

  async execute(userId: string, file: Express.Multer.File) {

     if (!file) throw new BadRequestException('Falta archivo');
     
    const meta = await this.storage.uploadChatAttachment(
      userId, file.buffer, file.mimetype, file.originalname,
    );

    const att = await this.chats.saveAttachment(
      Object.assign(new ChatAttachment(), {
        id          : meta.id,
        fileUrl     : meta.url,
        fileName    : file.originalname,
        contentType : file.mimetype,
        sizeBytes   : meta.size,
      }),
    );

    return att;   // se serializa tal cual (o vía DTO público)
  }
}
