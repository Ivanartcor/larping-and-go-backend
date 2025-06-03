import {
  IsOptional, Length, IsString, IsDateString, IsBoolean,
  ValidateNested, IsEnum, Min, IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnnouncementType } from '../../entities/guild-announcement.entity';
import { PollOptionDto } from './create-announcement.dto';

export class UpdateAnnouncementDto {
  @IsOptional() @Length(2, 120) title?: string;
  @IsOptional() @IsString()     content?: string;

  /* ⇄ cambio de tipo */
  @IsOptional() @IsEnum(AnnouncementType)
  type?: AnnouncementType;

  /* Props de encuesta */
  @IsOptional() @IsDateString() closeAt?: string;
  @IsOptional() @IsBoolean()    showResults?: boolean;
  @IsOptional() @IsBoolean()    multiSelect?: boolean;
  @IsOptional() @IsInt() @Min(2)
  maxChoices?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PollOptionDto)
  options?: PollOptionDto[];
}