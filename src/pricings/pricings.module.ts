import { forwardRef, Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsResolver } from './pricings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './pricing.entity';
import { ModesModule } from 'src/modes/modes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pricing]), forwardRef(() => ModesModule)],
  providers: [PricingsResolver, PricingsService],
  exports: [PricingsService],
})
export class PricingsModule {}
