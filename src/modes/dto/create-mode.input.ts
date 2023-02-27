import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModeInput {
  @Field()
  name: string;

  @Field()
  banner: string;

  @Field()
  background: string;

  @Field()
  createApiUrl: string;

  @Field()
  getApiUrl: string;

  @Field()
  active: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  configuration?: string;

  @Field((type) => Int)
  gameId: number;
}
