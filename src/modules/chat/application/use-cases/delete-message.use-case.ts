import { Injectable, Inject, NotFoundException, ForbiddenException } from "@nestjs/common";
import { IChatRepository } from "../ports/i-chat.repository";

@Injectable()
export class DeleteMessageUseCase {
  private WINDOW = 160_000;

  constructor(@Inject('CHAT_REPO') private readonly repo: IChatRepository) {}

  async execute(msgId: string, userId: string, isMod: boolean) {
    const msg = await this.repo.findMessageWithAuthor(msgId);
    if (!msg) throw new NotFoundException();

    const isAuthor     = msg.senderUser?.id === userId;
    const withinWindow = Date.now() - +msg.sentAt <= this.WINDOW;

    if (!(isMod || (isAuthor && withinWindow)))
      throw new ForbiddenException();

    msg.isDeleted = true;
    msg.content   = '';             // opcional: “Mensaje eliminado”
    msg.editedAt  = new Date();

    await this.repo.updateMessage(msg);
    return { id: msg.id };
  }
}
