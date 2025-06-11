import { Injectable, Inject, NotFoundException, ForbiddenException } from "@nestjs/common";
import { UpdateMessageDto } from "../../domain/dto/update-message.dto";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class UpdateMessageUseCase {
  private WINDOW = 160_000;      // 160 s

  constructor(@Inject('CHAT_REPO') private readonly repo: IChatRepository) {}

  async execute(
    msgId   : string,
    userId  : string,
    dto     : UpdateMessageDto,
    isMod   : boolean,
  ) {
    const msg = await this.repo.findMessageWithAuthor(msgId);
    if (!msg) throw new NotFoundException('Mensaje no existe');

    /* permisos */
    const isAuthor    = msg.senderUser?.id === userId;
    const withinWindow= Date.now() - +msg.sentAt <= this.WINDOW;

    if (!(isMod || (isAuthor && withinWindow)))
      throw new ForbiddenException('No puedes editar este mensaje');

    /* solo texto; no tocamos attachments */
    if (dto.content) msg.content = dto.content.trim();
    msg.editedAt = new Date();

    return this.repo.updateMessage(msg);
  }
}
