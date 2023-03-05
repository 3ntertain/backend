import { forwardRef, Module } from '@nestjs/common';
import { HappeningsService } from './happenings.service';
import { HappeningsResolver } from './happenings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Happening } from './happening.entity';
import { ModesModule } from 'src/modes/modes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Happening]),
    forwardRef(() => ModesModule),
  ],
  providers: [HappeningsResolver, HappeningsService],
  exports: [HappeningsService],
})
export class HappeningsModule {}
