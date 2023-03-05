import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  twitter?: string;

  @Field({ nullable: true })
  discord?: string;
}
