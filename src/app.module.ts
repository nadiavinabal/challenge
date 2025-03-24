import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import config from 'config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, load: [config] }), UsersModule, AuthModule, FilmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
