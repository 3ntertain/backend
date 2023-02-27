import { Field, InputType } from '@nestjs/graphql';
import { Stream } from 'stream';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class CreateGameInput {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  logo?: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;

  @Field()
  banner: string;

  @Field()
  background: string;

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
