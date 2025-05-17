import {
  Controller, Get, Put, Body, Param,
  UseGuards, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard'; 
import { UsersService } from '../../application/users.service'; 
import { UpdateProfileDto } from '../../domain/dto/update-profile.dto';
import { ChangeActiveCharacterDto } from '../../domain/dto/change-active-character.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  /* -------- Perfil propio ---------- */

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return this.users.getPublicProfile(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({}),                 // buffer llegará igualmente
      limits: { fileSize: 5_000_000 },          // 5 MB
      fileFilter: (_req, file, cb) => {
        const valid = ['image/png', 'image/jpeg'].includes(file.mimetype);
        cb(valid ? null : new Error('Invalid file type'), valid);
      },
    }),
  )
  async updateMe(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    return this.users.updateProfile(req.user.id, dto, file);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('me/active-character')
  changeActive(
    @Body() dto: ChangeActiveCharacterDto,
    @Req() req,
  ) {
    return this.users.changeActive(req.user.id, dto);
  }

  /* -------- Público ---------- */

  @Get(':id')
  getPublic(@Param('id') id: string) {
    return this.users.getPublicProfile(id);
  }
}
