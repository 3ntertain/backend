import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateGameInput } from './create-game.input';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => Int)
  id: number;
}
