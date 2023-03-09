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

  @Query(() => [Happening], { name: 'ongoingHappenings' })
  findOngoing() {
    return this.happeningsService.findOngoing();
  }

  @Query(() => [Happening], { name: 'endedHappenings' })
  findEnded() {
    return this.happeningsService.findEnded();
  }

  @Query(() => [Happening], { name: 'upcomingHappenings' })
  findUpcoming() {
    return this.happeningsService.findUpcoming();
  }

  @Query(() => Happening, { name: 'happening' })
  findOne(@Args('address', { type: () => String }) address: string) {
    return this.happeningsService.findOne(address);
  }

  @Query(() => [Happening], { name: 'leaderboard' })
  async getLeaderboard(
    @Args('address', { type: () => String }) address: string,
  ) {
    return await this.happeningsService.getLeaderboard(address);
  }

  @Mutation(() => Happening)
  async createHappening(
    @Args('createHappeningInput') createHappeningInput: CreateHappeningInput,
  ) {
    return await this.happeningsService.create(createHappeningInput);
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
  setClaimHappening(@Args('id', { type: () => Int }) id: number) {
    return this.happeningsService.setClaim(id);
  }

  @Mutation(() => Happening)
  lazyMintHappening(@Args('id', { type: () => Int }) id: number) {
    return this.happeningsService.lazyMint(id);
  }

  // @Mutation(() => Happening)
  // removeHappening(@Args('id', { type: () => Int }) id: number) {
  //   return this.happeningsService.remove(id);
  // }

  @ResolveField(() => Mode)
  mode(@Parent() happening: Happening): Promise<Mode> {
    return this.happeningsService.getMode(happening.modeId);
  }
}
