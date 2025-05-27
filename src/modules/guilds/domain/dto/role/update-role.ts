import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role';
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}