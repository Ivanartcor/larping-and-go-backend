import { Injectable, Inject, NotFoundException, BadRequestException } from "@nestjs/common";
import { IGuildRepository } from "../../ports/i-guild.repository";

@Injectable()
export class RemoveVoteUseCase {
  constructor(@Inject('GUILD_REPO') private repo: IGuildRepository) {}

  async execute(guildId: string, annId: string, optId: string, userId: string) {
    // 1. Buscar encuesta + estado
    const ann = await this.repo.findAnnouncement(annId);
    if (!ann || ann.guild.id !== guildId)
      throw new NotFoundException();

    if (ann.isClosed || (ann.closeAt && ann.closeAt <= new Date()))
      throw new BadRequestException('La encuesta está cerrada');

    // 2. Comprobar que el voto existe
    const vote = await this.repo.findVoteByOption(userId, optId);
    if (!vote) throw new NotFoundException('No hay voto que eliminar');

    // 3. Borrar y actualizar contador
    await this.repo.deleteVote(vote.id);

    //await this.repo.incrementOptionVotes(optId, -1); ya tengo trigger
  }
}
