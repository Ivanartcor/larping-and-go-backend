// src/modules/chat/domain/dto/update-message.dto.ts
import { Length, IsEnum, IsOptional } from 'class-validator';
import { MessageType } from '../entities/chat-message.entity'; 

export class UpdateMessageDto {
  @IsOptional()                     // sólo Texto se puede editar
  @Length(1, 4000) content?: string;

  /** Para futuros cambios de tipo (ahora se ignora) */
  @IsOptional() @IsEnum(MessageType)
  type?: MessageType;
}
