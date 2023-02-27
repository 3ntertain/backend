import { forwardRef, Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsResolver } from './settings.resolver';
import { Setting } from './setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModesModule } from '../modes/modes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), forwardRef(() => ModesModule)],
  providers: [SettingsResolver, SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
