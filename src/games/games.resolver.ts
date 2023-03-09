import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Mode } from 'src/modes/mode.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Resolver((of) => Game)
export class GamesResolver {
  constructor(private gamesService: GamesService) {}

  @Query((returns) => [Game], { name: 'games' })
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Query((returns) => Game, { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  // @Mutation((returns) => Game)
  // createGame(
  //   @Args('createGameInput') createGameInput: CreateGameInput,
  // ): Promise<Game> {
  //   return this.gamesService.create(createGameInput);
  // }

  // @Mutation(() => Game)
  // updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
  //   return this.gamesService.update(updateGameInput.id, updateGameInput);
  // }

  // @Mutation(() => Game)
  // removeGame(@Args('id', { type: () => Int }) id: number) {
  //   return this.gamesService.remove(id);
  // }

  @ResolveField()
  modes(@Parent() game: Game): Promise<Mode[]> {
    return this.gamesService.getModes(game.id);
  }
}
