import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './App/api/api.module';
import { GamesModule } from './App/games/games.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
