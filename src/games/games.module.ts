import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { ModesModule } from 'src/modes/modes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), forwardRef(() => ModesModule)],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
