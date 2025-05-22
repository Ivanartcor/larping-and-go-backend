import {
    Controller, Post, Get, Put, Delete,
    Body, Param, UseGuards, UploadedFile, UseInterceptors,
    Req,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CharactersService } from '../../application/characters.service';
import { CreateCharacterDto } from '../../domain/dto/create-character.dto';
import { UpdateCharacterDto } from '../../domain/dto/update-character.dto';
import { CharacterPropertyDto } from '../../domain/dto/character-property.dto';

@ApiTags('characters')
@Controller('characters')
@UseInterceptors(ClassSerializerInterceptor)
export class CharactersController {
    constructor(private readonly chars: CharactersService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto, @Req() req) {
        return this.chars.createCharacter(req.user.id, dto);
    }


    @Get('me')
    @UseGuards(JwtAuthGuard)
    listMine(@Req() req) {
        return this.chars.listMyCharacters(req.user.id);
    }


    @Get(':slug')
    getPublic(@Param('slug') slug: string) {
        return this.chars.getPublicCharacter(slug);
    }

    

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCharacterDto,
    ) {
        return this.chars.updateCharacter(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.chars.deleteCharacter(id);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id/properties')
    listProperties(
        @Param('id') id: string,
        @Req() req,
    ) {
        return this.chars.listProperties(req.user.id, id);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(':id/properties')
    addOrUpdateProperty(
        @Param('id') id: string,
        @Body() dto: CharacterPropertyDto,
    ) {
        return this.chars.upsertProperty(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id/properties/:pid')
    removeProperty(
        @Param('id') id: string,
        @Param('pid') pid: string,
    ) {
        return this.chars.removeProperty(id, pid);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id/avatar')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadAvatar(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.chars.uploadAvatar(id, file.buffer, file.mimetype);
    }
}
