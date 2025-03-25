import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {

    @ApiProperty({ example: 'A New Hope', description: 'Título de la película' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'https://swapi.dev/api/films/1/',})
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: 4 })
    @IsNotEmpty()
    @IsInt()
    episode_id: number;

    @ApiProperty({ example: 'It is a period of civil war...' })
    @IsNotEmpty()
    @IsString()
    opening_crawl: string;

    @ApiProperty({ example: 'George Lucas' })
    @IsNotEmpty()
    @IsString()
    director: string;

    @ApiProperty({ example: 'Rick McCallum' })
    @IsNotEmpty()
    @IsString()
    producer: string;

    @ApiProperty({ example: '1977-05-25'})
    @IsNotEmpty()
    @IsDateString()
    release_date: Date;

    @ApiProperty({ example: '1977-05-25T03:00:00.000Z'})
    @IsNotEmpty()
    @IsDateString()
    created: Date;

    @ApiProperty({ example: '1977-05-25T03:00:00.000Z'})
    @IsNotEmpty()
    @IsDateString()
    edited: Date;
}
