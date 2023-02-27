import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { ModesService } from 'src/modes/modes.service';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';
import { uploadFile } from '../common/upload';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  async uploadImage(image: any) {
    const { createReadStream, filename } = await image;

    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          (() => {
            console.log('io');
            return createWriteStream(
              join(__dirname, '..', '..', 'uploads', filename),
            );
          })(),
        )
        .on('finish', () => resolve(filename))
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }

  // async uploadImage2(image: any) {
  //   const { createReadStream, filename, getBlobTo } = await image;

  //   const image = createReadStream()
  //   return new Promise(async (resolve) => {
  //     createReadStream()
  //       .pipe(
  //         (() => {
  //           console.log('io');
  //           return createWriteStream(
  //             join(__dirname, '..', '..', 'uploads', filename),
  //           );
  //         })(),
  //       )
  //       .on('finish', () => resolve('eoeo'))
  //       .on('error', () => {
  //         new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
  //       });
  //   });
  // }

  async create(createGameInput: CreateGameInput): Promise<Game> {
    const { createReadStream, filename } = await createGameInput.image;

    const uploadedInfos = await uploadFile(createReadStream, filename);

    createGameInput.logo = uploadedInfos.Location;

    const newGame = this.gamesRepository.create(createGameInput);

    return this.gamesRepository.save(newGame);
    // const newGame = this.gamesRepository.create(createGameInput);
    // return this.gamesRepository.save(newGame);
  }

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOneByOrFail({ id: id });
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    await this.gamesRepository.update(id, updateGameInput);
    return this.gamesRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const game = this.gamesRepository.findOneByOrFail({ id: id });
    this.gamesRepository.delete(id);
    return game;
  }

  getModes(gameId: number) {
    return this.modesService.findAllByGameId(gameId);
  }
}
