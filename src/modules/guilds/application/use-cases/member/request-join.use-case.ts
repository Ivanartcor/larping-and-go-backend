// src/modules/guilds/application/use-cases/member/request-join.use-case.ts
import {
  Injectable, Inject, BadRequestException, NotFoundException, ConflictException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { GuildAccess }      from '../../../domain/entities/guild.entity';
import { GuildInvite, InviteType, InviteStatus } from '../../../domain/entities/guild-invite.entity';

@Injectable()
export class RequestJoinUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
  ) {}

  async execute(userId: string, guildId: string) {
    /* 1. Verificar que la guild existe y permite solicitudes */
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Guild no encontrada');

    if (guild.accessType === GuildAccess.INVITE) {
      throw new BadRequestException('Esta guild sólo admite invitaciones directas');
    }

    /* 2. Comprobar que el usuario no está ya dentro */
    const mem = await this.guilds.findMembership(userId, guildId);
    if (mem) throw new ConflictException('Ya perteneces (o estás pendiente)');

    /* 3. Crear fila de invitación tipo REQUEST */
    const inv = new GuildInvite();
    inv.guild        = guild;
    inv.senderUser   = { id: userId } as any;
    inv.type         = InviteType.REQUEST;
    inv.status       = InviteStatus.PENDING;
    await this.guilds.createInvite(inv);
  }
}
