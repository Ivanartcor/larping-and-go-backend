import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../../application/auth.service";
import { ConfirmPasswordResetDto } from "../../domain/dto/password-confirm.dto";
import { RequestPasswordResetDto } from "../../domain/dto/password-request.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth/password')
export class PasswordResetController {
  constructor(private readonly auth: AuthService) {}

  @Post('request')
  request(@Body() dto: RequestPasswordResetDto) {
    return this.auth.requestPasswordReset(dto);
  }

  @Post('confirm')
  confirm(@Body() dto: ConfirmPasswordResetDto) {
    return this.auth.confirmPasswordReset(dto);
  }
}
