import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mode } from 'src/modes/mode.entity';
import { ModesService } from 'src/modes/modes.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePricingInput } from './dto/create-pricing.input';
import { UpdatePricingInput } from './dto/update-pricing.input';
import { Pricing } from './pricing.entity';

@Injectable()
export class PricingsService {
  constructor(
    @InjectRepository(Pricing) private pricingRepository: Repository<Pricing>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  create(createPricingInput: CreatePricingInput) {
    const newPricing = this.pricingRepository.create(createPricingInput);
    return this.pricingRepository.save(newPricing);
  }

  findAll() {
    return this.pricingRepository.find();
  }

  findAllByModeId(modeId: number) {
    return this.pricingRepository.findBy({ modeId: modeId });
  }

  findOne(id: FindOptionsWhere<Pricing>): Promise<Pricing> {
    return this.pricingRepository.findOneByOrFail(id);
  }

  async update(id: number, updatePricingInput: UpdatePricingInput) {
    await this.pricingRepository.update(id, updatePricingInput);
    return this.pricingRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const pricing = this.pricingRepository.findOneByOrFail({ id: id });
    this.pricingRepository.delete(id);
    return pricing;
  }

  getMode(modeId: number) {
    return this.modesService.findOne(modeId);
  }
}
