import { CreateHappeningInput } from './create-happening.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHappeningInput extends PartialType(CreateHappeningInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  availableSlots: number;
}
