import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
          load: [config], 
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('config.postgres.host'),
            port: configService.get<number>('config.postgres.port'),
            username: configService.get<string>('config.postgres.user'),
            password: configService.get<string>('config.postgres.password'),
            database: configService.get<string>('config.postgres.database'),
            synchronize: false,
            autoLoadEntities: true,
            // entities: [User, Film, Character, Planet, Species, Starship, Vehicle],
          }),
        }),
      ],
})
export class DatabaseModule { }
