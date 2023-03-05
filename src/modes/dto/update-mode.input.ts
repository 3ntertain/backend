import { CreateModeInput } from './create-mode.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModeInput extends PartialType(CreateModeInput) {
  @Field(() => Int)
  id: number;
}
