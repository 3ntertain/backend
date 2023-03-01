import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModesService } from 'src/modes/modes.service';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  async create(createGameInput: CreateGameInput): Promise<Game> {
    const newGame = this.gamesRepository.create(createGameInput);
    return await this.gamesRepository.save(newGame);
  }

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOneByOrFail({ id: id });
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    console.log(updateGameInput);
    await this.gamesRepository.update(id, updateGameInput);
    return this.gamesRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const game = this.gamesRepository.findOneByOrFail({ id: id });
    this.gamesRepository.delete(id);
    return game;
  }

  getModes(id: number) {
    return this.modesService.findAllByGameId(id);
  }
}
