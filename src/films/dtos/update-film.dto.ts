import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
    @ApiProperty({ example: 'The Empire Strikes Back', required: false, })
    title?: string;

    @ApiProperty({ example: 'https://swapi.dev/api/films/2/', required: false,})
    url?: string;

    @ApiProperty({ example: 5, required: false, })
    episode_id?: number;

    @ApiProperty({ example: 'It is a dark time for the Rebellion...', required: false, })
    opening_crawl?: string;

    @ApiProperty({ example: 'Irvin Kershner', required: false, })
    director?: string;

    @ApiProperty({ example: 'Gary Kurtz, George Lucas', required: false, })
    producer?: string;

    @ApiProperty({ example: '1980-05-21', required: false, })
    release_date?: Date;
}