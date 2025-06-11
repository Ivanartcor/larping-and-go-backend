import { ApiProperty } from '@nestjs/swagger';

export class ChannelSummaryDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: String, required: false })
  guildId?: string;

  @ApiProperty({ type: String, required: false })
  topic?: string;

  @ApiProperty({ type: String, required: false, description: 'Última vez que se envió un mensaje' })
  lastMessageAt?: string;

  @ApiProperty({ type: Number, description: 'Número de mensajes no leídos' })
  unread: number;
}
