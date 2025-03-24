import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards, } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { UpdateFilmDto } from '../dtos/update-film.dto';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateFilmsResponseDto } from '../dtos/cron-film.dto';

@Controller('films')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    @Public()
    @Get()
    async findAll() {
        return this.filmsService.findAll();
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        return this.filmsService.findOneFilm(id);
    }

    @Roles(Role.ADMIN)
    @Post('update-from-swapi')
    async updateFilmsFromSwapi(): Promise<UpdateFilmsResponseDto> {
        return this.filmsService.fetchAndStoreFilms();
    }

    @Roles(Role.ADMIN)
    @Post()
    @ApiBody({ type: CreateFilmDto })
    create(@Body() payload: CreateFilmDto) {
        return this.filmsService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    @ApiBody({ type: UpdateFilmDto })
    update(@Param('id', new ParseIntPipe()) id: number, @Body() payload: UpdateFilmDto) {
        return this.filmsService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number) {
        return this.filmsService.remove(id);
    }
}


