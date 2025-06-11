import { IsUUID } from 'class-validator';

export class JoinRoomDto {
  @IsUUID() channelId!: string;
}

export class LeaveRoomDto {
  @IsUUID() channelId!: string;
}
