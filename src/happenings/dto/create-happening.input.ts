import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHappeningInput {
  @Field()
  name: string;

  @Field({ defaultValue: false })
  public: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  address?: string;

  @Field((type) => Date)
  start: Date;

  @Field((type) => Date)
  end: Date;

  @Field()
  price: number;

  @Field((type) => Int)
  slots: number;

  @Field()
  creator: string;

  @Field((type) => Int)
  creatorFee: number;

  @Field({ nullable: true })
  configuration: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  rewards?: string;

  @Field()
  ticket: string;

  @Field((type) => Int)
  modeId: number;
}
