import { Module } from '@nestjs/common';
import { FilmsController } from './controllers/films.controller';
import { FilmsService } from './services/films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { HttpModule } from '@nestjs/axios';
import { Planet } from './entities/planet.entity';
import { Species } from './entities/species.entity';
import { Starship } from './entities/starship.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Character } from './entities/character.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Film, Character, Planet, Species, Starship, Vehicle ]) , HttpModule],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
