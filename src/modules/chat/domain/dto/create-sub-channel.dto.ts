import { Length, IsOptional, IsBoolean, IsUUID } from "class-validator";

export class CreateSubChannelDto {
    @IsUUID() guildId!: string;
    @Length(2, 120) topic!: string;
    @IsOptional() @IsBoolean() autoSync?: boolean = true;  // ← nuevo
}
