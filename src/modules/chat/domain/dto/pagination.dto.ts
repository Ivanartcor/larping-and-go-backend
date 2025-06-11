// src/modules/chat/domain/dto/pagination.dto.ts
import { IsInt, Min } from 'class-validator';
export class PaginationDto {
  @IsInt() @Min(1) page!: number;
  @IsInt() @Min(1) perPage!: number;
}
