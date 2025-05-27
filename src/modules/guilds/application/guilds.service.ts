// src/modules/guilds/application/guilds.service.ts
import { Injectable } from '@nestjs/common';

import { TransferLeadershipUseCase } from './use-cases/transfer-leadership.use-case';
import { UpdateGuildUseCase } from './use-cases/update-guild.use-case';
import { DeleteGuildUseCase } from './use-cases/delete-guild.use-case';
import { CreateGuildUseCase } from './use-cases/create-guild.use-case';
import { GetGuildPublicQuery } from './queries/get-guild-public.query';
import { ListGuildsQuery } from './queries/list-guilds.query';

import { CreateGuildDto } from '../domain/dto/create-guild.dto';
import { UpdateGuildDto } from '../domain/dto/update-guild.dto';
import { GetGuildInternalQuery } from './queries/get-guild-internal.query';



@Injectable()
export class GuildsService {
  constructor(
    private readonly createUC: CreateGuildUseCase,
    private readonly getPublicQ: GetGuildPublicQuery,
    private readonly listQ: ListGuildsQuery,
    private readonly getInternalQ: GetGuildInternalQuery,
    private readonly updateUC: UpdateGuildUseCase,
    private readonly deleteUC: DeleteGuildUseCase,
    private readonly transferUC: TransferLeadershipUseCase,
  ) { }

  create(userId: string, dto: CreateGuildDto) {
    return this.createUC.execute(userId, dto);
  }

  getPublic(slug: string) {
    return this.getPublicQ.execute(slug);
  }

  listPublic(search?: string) {
    return this.listQ.execute(search);
  }

  update(userId: string, guildId: string, dto: UpdateGuildDto, membership) {
    return this.updateUC.execute(
      guildId,
      dto,
      membership.role.permissions,
      membership.role.isLeader,
    ).then(() => this.getInternalQ.execute(guildId));
  }


  softDelete(userId: string, guildId: string, membership) {
    return this.deleteUC.execute(guildId, membership.role.isLeader);
  }

  transferLeader(userId: string, guildId: string, newLeaderId: string) {
    return this.transferUC.execute(guildId, userId, newLeaderId);
  }

}
