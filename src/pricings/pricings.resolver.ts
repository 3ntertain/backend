import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PricingsService } from './pricings.service';
import { Pricing } from './pricing.entity';
import { CreatePricingInput } from './dto/create-pricing.input';
import { UpdatePricingInput } from './dto/update-pricing.input';
import { FindOptionsWhere } from 'typeorm';
import { Mode } from 'src/modes/mode.entity';

@Resolver((of) => Pricing)
export class PricingsResolver {
  constructor(private readonly pricingsService: PricingsService) {}

  @Mutation(() => Pricing)
  createPricing(
    @Args('createPricingInput') createPricingInput: CreatePricingInput,
  ) {
    return this.pricingsService.create(createPricingInput);
  }

  @Query(() => [Pricing], { name: 'pricings' })
  findAll() {
    return this.pricingsService.findAll();
  }

  @Query(() => Pricing, { name: 'pricing' })
  findOne(@Args('id', { type: () => Int }) id: FindOptionsWhere<Pricing>) {
    return this.pricingsService.findOne(id);
  }

  @Mutation(() => Pricing)
  updatePricing(
    @Args('updatePricingInput') updatePricingInput: UpdatePricingInput,
  ) {
    return this.pricingsService.update(
      updatePricingInput.id,
      updatePricingInput,
    );
  }

  @Mutation(() => Pricing)
  removePricing(@Args('id', { type: () => Int }) id: number) {
    return this.pricingsService.remove(id);
  }

  @ResolveField(() => Mode)
  mode(@Parent() pricing: Pricing): Promise<Mode> {
    return this.pricingsService.getMode(pricing.modeId);
  }
}
