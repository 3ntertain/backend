import { InputType, Int, Field } from '@nestjs/graphql';
import { SettingsType } from '../../common/enums';

@InputType()
export class CreateSettingInput {
  @Field()
  name: string;

  @Field()
  label: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => SettingsType)
  type?: SettingsType;

  @Field({ nullable: true })
  options?: string;

  @Field((type) => Int)
  modeId: number;
}
