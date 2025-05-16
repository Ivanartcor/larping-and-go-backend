import { Controller, Post, Body, UseGuards, Req, Get } from "@nestjs/common";
import { AuthService } from "../../application/auth.service";
import { LoginDto } from "../../domain/dto/login.dto";
import { RefreshTokenDto } from "../../domain/dto/refresh.dto";
import { RegisterDto } from "../../domain/dto/register.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { JwtRefreshGuard } from "../guards/jwt-refresh.guard";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /* ---------- Registro ---------- */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  /* ---------- Login ---------- */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    console.log('auth header ->');
    return this.auth.login(dto);
  }

  /* ---------- Refresh ---------- */
  @Post('refresh')
@UseGuards(JwtRefreshGuard)
refresh(@Body() dto: RefreshTokenDto, @Req() req) {
  return this.auth.refresh(dto, req.user.id);
}


  /* ---------- Perfil rápido ---------- */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  whoami(@Req() req: any) {
    return { id: req.user.id };
  }
}
