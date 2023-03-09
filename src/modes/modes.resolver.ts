import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ModesService } from './modes.service';
import { CreateModeInput } from './dto/create-mode.input';
import { UpdateModeInput } from './dto/update-mode.input';
import { Mode } from './mode.entity';
import { Game } from 'src/games/game.entity';
import { Setting } from 'src/settings/setting.entity';
import { Pricing } from 'src/pricings/pricing.entity';
import { Happening } from 'src/happenings/happening.entity';

@Resolver((of) => Mode)
export class ModesResolver {
  constructor(private readonly modesService: ModesService) {}

  @Query(() => [Mode], { name: 'modes' })
  findAll() {
    return this.modesService.findAll();
  }

  @Query(() => Mode, { name: 'mode' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.modesService.findOne(id);
  }

  // @Mutation(() => Mode)
  // createMode(@Args('createModeInput') createModeInput: CreateModeInput) {
  //   return this.modesService.create(createModeInput);
  // }

  // @Mutation(() => Mode)
  // updateMode(@Args('updateModeInput') updateModeInput: UpdateModeInput) {
  //   return this.modesService.update(updateModeInput.id, updateModeInput);
  // }

  // @Mutation(() => Mode)
  // removeMode(@Args('id', { type: () => Int }) id: number) {
  //   return this.modesService.remove(id);
  // }

  @ResolveField(() => Game)
  game(@Parent() mode: Mode): Promise<Game> {
    return this.modesService.getGame(mode.gameId);
  }

  @ResolveField(() => Setting)
  settings(@Parent() mode: Mode): Promise<Setting[]> {
    return this.modesService.getSettings(mode.id);
  }

  @ResolveField(() => Pricing)
  pricings(@Parent() mode: Mode): Promise<Pricing[]> {
    return this.modesService.getPricings(mode.id);
  }

  @ResolveField(() => Happening)
  happenings(@Parent() mode: Mode): Promise<Happening[]> {
    return this.modesService.getHappenings(mode.id);
  }
}
