import { CreatePricingInput } from './create-pricing.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePricingInput extends PartialType(CreatePricingInput) {
  @Field(() => Int)
  id: number;
}
