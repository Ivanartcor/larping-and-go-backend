import {
  IsString, Length, IsEnum, IsOptional, IsBoolean,
  IsDateString, ValidateNested, ArrayMinSize, ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnnouncementType } from '../../entities/guild-announcement.entity';

export class PollOptionDto {
  @IsString() @Length(1,120)
  optionText!: string;
}

export class CreateAnnouncementDto {
  @Length(2,120) title!: string;
  @IsString() content!: string;

  @IsEnum(AnnouncementType) type!: AnnouncementType;

  /* Poll-only */
  @IsOptional() @IsDateString() closeAt?: string;
  @IsOptional() @IsBoolean() showResults?: boolean;
  @IsOptional() @IsBoolean() multiSelect?: boolean;
  @IsOptional() maxChoices?: number;

  @ValidateNested({ each:true })
  @Type(() => PollOptionDto)
  @IsOptional() @ArrayMinSize(2) @ArrayMaxSize(20)
  options?: PollOptionDto[];
}