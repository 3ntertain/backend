import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { HappeningsService } from './happenings.service';
import { Happening } from './happening.entity';
import { CreateHappeningInput } from './dto/create-happening.input';
import { UpdateHappeningInput } from './dto/update-happening.input';
import { FindOptionsWhere } from 'typeorm';
import { Mode } from 'src/modes/mode.entity';

@Resolver((of) => Happening)
export class HappeningsResolver {
  constructor(private readonly happeningsService: HappeningsService) {}

  @Mutation(() => Happening)
  createHappening(
    @Args('createHappeningInput') createHappeningInput: CreateHappeningInput,
  ) {
    return this.happeningsService.create(createHappeningInput);
  }

  @Query(() => [Happening], { name: 'happenings' })
  findAll() {
    return this.happeningsService.findAll();
  }

  @Query(() => Happening, { name: 'happening' })
  findOne(@Args('id', { type: () => Int }) id: FindOptionsWhere<Happening>) {
    return this.happeningsService.findOne(id);
  }

  @Mutation(() => Happening)
  updateHappening(
    @Args('updateHappeningInput') updateHappeningInput: UpdateHappeningInput,
  ) {
    return this.happeningsService.update(
      updateHappeningInput.id,
      updateHappeningInput,
    );
  }

  @Mutation(() => Happening)
  removeHappening(@Args('id', { type: () => Int }) id: number) {
    return this.happeningsService.remove(id);
  }

  @ResolveField(() => Mode)
  mode(@Parent() happening: Happening): Promise<Mode> {
    return this.happeningsService.getMode(happening.modeId);
  }
}
