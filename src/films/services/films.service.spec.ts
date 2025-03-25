import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Film } from '../entities/film.entity';
import { Character } from '../entities/character.entity';
import { Planet } from '../entities/planet.entity';
import { Starship } from '../entities/starship.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { Species } from '../entities/species.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFilmDto } from '../dtos/update-film.dto';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: Repository<Film>;
  let httpService: HttpService;

  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, { provide: getRepositoryToken(Film), useValue: mockRepository() },
        { provide: getRepositoryToken(Character), useValue: mockRepository() },
        { provide: getRepositoryToken(Planet), useValue: mockRepository() },
        { provide: getRepositoryToken(Starship), useValue: mockRepository() },
        { provide: getRepositoryToken(Vehicle), useValue: mockRepository() },
        { provide: getRepositoryToken(Species), useValue: mockRepository() },
        { provide: HttpService, useValue: mockHttpService },],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const mockFilms = [{
        id: 1, title: 'A New Hope',
        "url": "https://swapi.dev/api/films/60/",
        "episode_id": 4,
        "opening_crawl": "It is a period of civil war...",
        "director": "George Lucas",
        "producer": "Rick McCallum",
        "release_date": new Date("1977-05-25"),
        "created": new Date("1977-05-25T03:00:00.000Z"),
        "edited": new Date("1977-05-25T03:00:00.000Z"),
        "characters": [],
        "planets": [],
        "starships": [],
        "vehicles": [],
        "species": [],
      }];
      jest.spyOn(filmRepository, 'find').mockResolvedValue(mockFilms);

      const result = await service.findAll();
      expect(result).toEqual(mockFilms);
    });

    it('should return an empty array if no films are found', async () => {
      jest.spyOn(filmRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a film', async () => {
      const mockFilm = {
        id: 1, title: 'A New Hope',
        "url": "https://swapi.dev/api/films/60/",
        "episode_id": 4,
        "opening_crawl": "It is a period of civil war...",
        "director": "George Lucas",
        "producer": "Rick McCallum",
        "release_date": new Date("1977-05-25"),
        "created": new Date("1977-05-25T03:00:00.000Z"),
        "edited": new Date("1977-05-25T03:00:00.000Z"),
        "characters": [],
        "planets": [],
        "starships": [],
        "vehicles": [],
        "species": [],
      };
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(mockFilm);

      const result = await service.findOne(1);
      expect(result).toEqual(mockFilm);
    });

    it('should throw NotFoundException if film is not found', async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a film', async () => {
      const mockFilm = {
        id: 1, title: 'A New Hope',
        "url": "https://swapi.dev/api/films/60/",
        "episode_id": 4,
        "opening_crawl": "It is a period of civil war...",
        "director": "George Lucas",
        "producer": "Rick McCallum",
        "release_date": new Date("1977-05-25"),
        "created": new Date("1977-05-25T03:00:00.000Z"),
        "edited": new Date("1977-05-25T03:00:00.000Z"),
        "characters": [],
        "planets": [],
        "starships": [],
        "vehicles": [],
        "species": [],
      };

      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(mockFilm);
      jest.spyOn(filmRepository, 'remove').mockResolvedValue(mockFilm);

      const result = await service.remove(1);
      expect(result).toEqual(mockFilm);
    });

    it('should throw NotFoundException if film is not found', async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new film', async () => {
      const dto: CreateFilmDto = {
        title: 'The Empire Strikes Back', url: 'https://swapi.dev/api/films/2/',
        "episode_id": 4,
        "opening_crawl": "It is a period of civil war...",
        "director": "George Lucas",
        "producer": "Rick McCallum",
        "release_date": new Date("1977-05-25"),
        "created": new Date("1977-05-25T03:00:00.000Z"),
        "edited": new Date("1977-05-25T03:00:00.000Z"),
      };
      const mockFilm = {
        id: 2,
        "characters": [],
        "planets": [],
        "starships": [],
        "vehicles": [],
        "species": [], ...dto
      };

      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(filmRepository, 'create').mockReturnValue(mockFilm);
      jest.spyOn(filmRepository, 'save').mockResolvedValue(mockFilm);

      const result = await service.create(dto);
      expect(result).toEqual(mockFilm);
    });

    it('should throw NotFoundException if film already exists', async () => {
      const dto: CreateFilmDto = {
        title: 'The Empire Strikes Back', url: 'https://swapi.dev/api/films/2/', "episode_id": 4,
        "opening_crawl": "It is a period of civil war...",
        "director": "George Lucas",
        "producer": "Rick McCallum",
        "release_date": new Date("1977-05-25"),
        "created": new Date("1977-05-25T03:00:00.000Z"),
        "edited": new Date("1977-05-25T03:00:00.000Z"),
      };
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(dto as Film);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
      it('should throw NotFoundException if film is not found', async () => {
        jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);
  
        await expect(service.update(1, { title: 'New Title' })).rejects.toThrow(NotFoundException);
      });
    });
});
