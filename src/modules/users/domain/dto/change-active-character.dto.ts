import { IsUUID } from "class-validator";

export class ChangeActiveCharacterDto {
  @IsUUID() characterId!: string;
}