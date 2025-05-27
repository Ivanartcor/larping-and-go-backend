import { IsUUID } from 'class-validator';
export class AssignRoleDto {
  @IsUUID() memberId!: string;
  @IsUUID() roleId!: string;
}