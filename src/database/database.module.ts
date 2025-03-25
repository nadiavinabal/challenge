import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Character } from 'src/films/entities/character.entity';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/films/entities/planet.entity';
import { Species } from 'src/films/entities/species.entity';
import { Starship } from 'src/films/entities/starship.entity';
import { Vehicle } from 'src/films/entities/vehicle.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT', '5433'), 10),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            Character, 
            Film, 
            Planet, 
            Species, 
            Starship, 
            Vehicle, 
            User
          ],
          synchronize: false,
          ssl: configService.get<string>('DB_SSL') === 'true' ? {
            rejectUnauthorized: false
          } : false,
        }
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
