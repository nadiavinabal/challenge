import { PartialType } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFilmDto1 {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDateString()
  @IsNotEmpty()
  release_date: string;

  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  species: string[];

  @IsString()
  @IsNotEmpty()
  created: string;

  @IsString()
  @IsNotEmpty()
  edited: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class UpdateFilmDto extends PartialType(CreateFilmDto1) {}