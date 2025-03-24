import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateFilmDto } from '../dtos/update-film.dto';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Planet } from '../entities/planet.entity';
import { Starship } from '../entities/starship.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { Species } from '../entities/species.entity';
import { Character } from '../entities/character.entity';
import { FilterFilmDto } from '../dtos/filterFilm.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film) private filmRepository: Repository<Film>, private httpService: HttpService,
    @InjectRepository(Character) private characterRepository: Repository<Character>,
    @InjectRepository(Planet) private planetRepository: Repository<Planet>,
    @InjectRepository(Starship) private starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Species) private speciesRepository: Repository<Species>) { }

  async findAll() {
    const film = await this.filmRepository.find();
    if (!film) {
      return [];
    }
    return film;
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return film;
  }

  async findOneFilm(id: number): Promise<FilterFilmDto> {
    const film = await this.findOne(id);

    const getRelatedUrls = async (repository: any, relation: string) => {
      const entities = await repository.find({
        select: ['url'],
        where: { films: { id } }
      });
      return entities.map(entity => entity.url);
    };

    const [characterUrls, planetUrls, starshipUrls, vehicleUrls, speciesUrls] = await Promise.all([
      getRelatedUrls(this.characterRepository, 'characters'),
      getRelatedUrls(this.planetRepository, 'planets'),
      getRelatedUrls(this.starshipRepository, 'starships'),
      getRelatedUrls(this.vehicleRepository, 'vehicles'),
      getRelatedUrls(this.speciesRepository, 'species')
    ]);

    const filmData: FilterFilmDto = {
      ...film,
      characters: characterUrls,
      planets: planetUrls,
      starships: starshipUrls,
      vehicles: vehicleUrls,
      species: speciesUrls,
      created: film.created.toISOString(),
      edited: film.edited.toISOString(),
      release_date: film.release_date.toISOString(),
    };

    return filmData;
  }

  async create(data: CreateFilmDto) {
    const film = await this.filmRepository.findOne({ where: { url: data.url } })
    if (film) {
      throw new NotFoundException(`There is already a film with that ${data.url}`);
    }
    const filmCreate = this.filmRepository.create(data);
    return await this.filmRepository.save(filmCreate);
  }

  async update(id: number, changes: UpdateFilmDto) {
    const film = await this.findOne(id);
    this.filmRepository.merge(film, changes);
    return await this.filmRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    return await this.filmRepository.remove(film);
  }

  async fetchAndStoreFilms() {
    const response = await lastValueFrom(this.httpService.get('https://swapi.dev/api/films'));
    const filmsData = response.data.results;

    for (const filmData of filmsData) {
      const existingFilm = await this.filmRepository.findOne({ where: { url: filmData.url } });
      if (!existingFilm) {
        const film = this.filmRepository.create({
          title: filmData.title,
          episode_id: filmData.episode_id,
          opening_crawl: filmData.opening_crawl,
          director: filmData.director,
          producer: filmData.producer,
          release_date: filmData.release_date,
          url: filmData.url,
          created: filmData.created,
          edited: filmData.edited,
        });


        film.characters = await this.fetchRelatedEntities(filmData.characters, this.characterRepository,);
        film.planets = await this.fetchRelatedEntities(filmData.planets, this.planetRepository);
        film.starships = await this.fetchRelatedEntities(filmData.starships, this.starshipRepository);
        film.vehicles = await this.fetchRelatedEntities(filmData.vehicles, this.vehicleRepository);
        film.species = await this.fetchRelatedEntities(filmData.species, this.speciesRepository);

        await this.filmRepository.save(film);
      } else if (new Date(filmData.edited) > existingFilm.edited) {
        existingFilm.title = filmData.title;
        existingFilm.episode_id = filmData.episode_id;
        existingFilm.opening_crawl = filmData.opening_crawl;
        existingFilm.director = filmData.director;
        existingFilm.producer = filmData.producer;
        existingFilm.release_date = new Date(filmData.release_date);
        existingFilm.edited = new Date(filmData.edited);
        await this.filmRepository.save(existingFilm);
      }


    }
    return { message: 'Films updated successfully'};
  }

  private async fetchRelatedEntities<T>(urls: string[], repo: Repository<any>) {
    const entities: T[] = [];
    for (const url of urls) {
      let entity = await repo.findOne({ where: { url } });
      if (!entity) {
        const response = await lastValueFrom(this.httpService.get<T>(url));
        entity = repo.create({ ...response.data, url });
        await repo.save(entity);
      } 
      entities.push(entity);
    }
    return entities;
  }


}
