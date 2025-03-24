import { ApiProperty } from '@nestjs/swagger';

export class FilmApiDto {
    @ApiProperty({ description: 'Título de la película' })
    title: string;

    @ApiProperty({ description: 'Número de episodio' })
    episode_id: number;

    @ApiProperty({ description: 'Texto de apertura de la película' })
    opening_crawl: string;

    @ApiProperty({ description: 'Director de la película' })
    director: string;

    @ApiProperty({ description: 'Productor(es) de la película' })
    producer: string;

    @ApiProperty({ description: 'Fecha de lanzamiento de la película' })
    release_date: string;

    @ApiProperty({
        description: 'URLs de los personajes que aparecen en la película',
        type: [String],
    })
    characters: string[];

    @ApiProperty({
        description: 'URLs de los planetas que aparecen en la película',
        type: [String],
    })
    planets: string[];

    @ApiProperty({
        description: 'URLs de las naves espaciales que aparecen en la película',
        type: [String],
    })
    starships: string[];

    @ApiProperty({
        description: 'URLs de los vehículos que aparecen en la película',
        type: [String],
    })
    vehicles: string[];

    @ApiProperty({
        description: 'URLs de las especies que aparecen en la película',
        type: [String],
    })
    species: string[];

    @ApiProperty({ description: 'Fecha de creación del registro en la API' })
    created: string;

    @ApiProperty({ description: 'Fecha de última edición del registro en la API' })
    edited: string;

    @ApiProperty({ description: 'URL del recurso en la API' })
    url: string;
}