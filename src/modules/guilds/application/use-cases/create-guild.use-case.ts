// src/modules/guilds/application/use-cases/create-guild.use-case.ts
import {
  Injectable, Inject, ConflictException, NotFoundException,
} from '@nestjs/common';

import { IGuildRepository } from '../ports/i-guild.repository';
import { IUserRepository }   from '../../../users/application/ports/i-user.repository';
import { CreateGuildDto }    from '../../domain/dto/create-guild.dto';
import { Guild, GuildPrivacy, GuildAccess } from '../../domain/entities/guild.entity';
import { GuildRole, GuildPermission } from '../../domain/entities/guild-role.entity';
import { PublicGuildDto }    from '../../domain/dto/public-guild.dto';
import { IChatRepository } from 'src/modules/chat/application/ports/i-chat.repository';

@Injectable()
export class CreateGuildUseCase {
  constructor(
    @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    @Inject('USER_REPO')  private readonly users: IUserRepository,
    @Inject('CHAT_REPO') private readonly chats: IChatRepository
  ) {}

  async execute(creatorId: string, dto: CreateGuildDto): Promise<PublicGuildDto> {
    const creator = await this.users.findById(creatorId);
    if (!creator) throw new NotFoundException('Usuario no encontrado');

    if (!creator.activeCharacter) throw new NotFoundException('debes tener un personaje para que se te pueda identificar publicamente');

    if (await this.guilds.existsByName(dto.name)) {
      throw new ConflictException('Nombre de hermandad ya en uso');
    }

    /* ---------------- Construir Guild -------------------- */
    const g = new Guild();
    g.name        = dto.name.trim();
    g.description = dto.description;
    g.privacy     = dto.privacy     ?? GuildPrivacy.PUBLIC;
    g.accessType  = dto.accessType  ?? GuildAccess.PUBLIC;
    g.leader      = creator;
    g.memberCount = 1;

    if (g.accessType === GuildAccess.CODE) {
      // hash SHA-256 del código (guardar sin exponer)
      const { createHash } = await import('crypto');
      g.accessCodeHash = createHash('sha256').update(dto.accessCode!).digest('hex');
    }

    /* ---------------- Rol líder ------------------------- */
    const leaderRole = new GuildRole();
    leaderRole.name       = 'Líder';
    leaderRole.color      = '#d4af37';             // oro por defecto
    leaderRole.position   = 0;
    leaderRole.permissions= GuildPermission.ALL;
    leaderRole.isLeader   = true;

    /* ---------------- Persistir (transacción) ----------- */
    const saved = await this.guilds.createWithLeader(g, leaderRole);

    /* NEW → unir líder al chat general */
  const channel = await this.chats.findGuildChannel(saved.id);
  if (channel) {
    await this.chats.upsertParticipant(
      channel.id,
      creator.id,
      creator.activeCharacter?.id,
    );
  }

    return {
      id: saved.id,
      slug: saved.slug,
      name: saved.name,
      description: saved.description,
      emblemUrl: saved.emblemUrl,
      memberCount: saved.memberCount,
    };
  }
}
