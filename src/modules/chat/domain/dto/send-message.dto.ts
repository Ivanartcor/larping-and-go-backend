// src/modules/chat/domain/dto/send-message.dto.ts
import { IsEnum, IsOptional, IsUUID, Length, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageType } from '../../domain/entities/chat-message.entity';
import { AttachmentDto } from './attachment.dto';


export class SendMessageDto {
  @IsEnum(MessageType)              // TEXT, MEDIA (SYSTEM lo generará el back)
  type: MessageType = MessageType.TEXT;

  /** Markdown o payload serializado; 4 KB suficiente para un texto */
  @Length(1, 4000) content!: string;

  /** Id de mensaje al que se responde (opcional) */
  @IsOptional() @IsUUID() replyToId?: string;

  @IsOptional() @IsArray() @ValidateNested({ each:true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}
