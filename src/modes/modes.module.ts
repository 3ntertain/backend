import { forwardRef, Module } from '@nestjs/common';
import { ModesService } from './modes.service';
import { ModesResolver } from './modes.resolver';
import { Mode } from './mode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from '../games/games.module';
import { SettingsModule } from 'src/settings/settings.module';
import { PricingsModule } from 'src/pricings/pricings.module';
import { HappeningsModule } from 'src/happenings/happenings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mode]),
    forwardRef(() => GamesModule),
    forwardRef(() => SettingsModule),
    forwardRef(() => PricingsModule),
    forwardRef(() => HappeningsModule),
  ],
  providers: [ModesResolver, ModesService],
  exports: [ModesService],
})
export class ModesModule {}
