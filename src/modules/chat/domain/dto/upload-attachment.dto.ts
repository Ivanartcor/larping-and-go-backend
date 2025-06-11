import { Length, IsOptional } from 'class-validator';

export class UploadAttachmentDto {
  @IsOptional() @Length(1,140)
  caption?: string;          // opcional 
}
