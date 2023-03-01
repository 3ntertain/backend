import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'src/common/interface';

@InputType()
export class CreateUploadInput {
  @Field()
  name: string;

  // @Field(() => GraphQLUpload)
  // file: Promise<FileUpload>;

  @Field()
  file: string;
}
