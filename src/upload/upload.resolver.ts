import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { CreateUploadInput } from './dto/create-upload.input';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => Boolean)
  async createUpload(
    @Args('createUploadInput') createUploadInput: CreateUploadInput,
  ) {
    await this.uploadService.create(createUploadInput);
    return true;
  }
}
