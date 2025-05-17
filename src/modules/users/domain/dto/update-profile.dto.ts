import { IsOptional, Length, IsLocale, IsUrl } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @Length(2, 50)
    displayName?: string;

    @IsOptional()
    @IsLocale()
    locale?: string;

    
    @IsOptional()
    @IsUrl()
    avatarUrl?: string;
}