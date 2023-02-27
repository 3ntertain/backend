import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHappeningInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Date)
  start: Date;

  @Field((type) => Date)
  end: Date;

  @Field()
  price: number;

  @Field((type) => Int)
  slots: number;

  @Field((type) => Int)
  creatorFee: number;

  @Field({ nullable: true })
  configuration: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  rewards?: string;

  @Field((type) => Int)
  modeId: number;
}
