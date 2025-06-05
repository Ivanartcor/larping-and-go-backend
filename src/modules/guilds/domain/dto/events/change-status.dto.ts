import { IsEnum } from 'class-validator';

export enum EventStatusChange { CANCELLED='cancelled', COMPLETED='completed' }

export class ChangeStatusDto {
  @IsEnum(EventStatusChange)
  status!: EventStatusChange;
}