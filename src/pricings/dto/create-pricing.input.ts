import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { PricingType } from '../../common/enums';

@InputType()
export class CreatePricingInput {
  @Field()
  name: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => PricingType)
  type: PricingType;

  @Field({ nullable: true })
  condition?: string;

  @Field((type) => Int)
  modeId: number;
}
