// src/modules/guilds/domain/dto/transfer-leader.dto.ts
import { IsUUID } from 'class-validator';

export class TransferLeaderDto {
  @IsUUID()
  newLeaderUserId!: string;
}
