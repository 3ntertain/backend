import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mode } from 'src/modes/mode.entity';
import { ModesService } from 'src/modes/modes.service';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateHappeningInput } from './dto/create-happening.input';
import { UpdateHappeningInput } from './dto/update-happening.input';
import { Happening } from './happening.entity';
import { createCollection } from 'src/common/createCollection';
import { emitCreate } from 'src/common/emit-create';

@Injectable()
export class HappeningsService {
  constructor(
    @InjectRepository(Happening)
    private happeningRepository: Repository<Happening>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  async create(createHappeningInput: CreateHappeningInput) {
    const mode = await this.modesService.findOne(createHappeningInput.modeId);
    const game = await this.modesService.getGame(mode.gameId);

    const dropAddress = await createCollection({
      name: createHappeningInput.name,
      symbol: game.symbol,
      description: createHappeningInput.description,
      slots: createHappeningInput.slots,
      price: createHappeningInput.price,
      start: createHappeningInput.start,
      end: createHappeningInput.end,
      game: game.name,
      mode: mode.name,
      nftPicture: createHappeningInput.ticket,
      creator: createHappeningInput.creator,
      creatorFee: createHappeningInput.creatorFee,
      rewardsDistribution: createHappeningInput.rewards,
    });

    createHappeningInput.address = dropAddress;

    const newHappening = this.happeningRepository.create(createHappeningInput);

    await emitCreate(newHappening, mode, game);

    return this.happeningRepository.save(newHappening);
  }

  findOngoing() {
    return this.happeningRepository.find({
      where: {
        start: LessThan(new Date()),
        end: MoreThan(new Date()),
      },
      order: {
        end: 'ASC',
      },
    });
  }

  findEnded() {
    return this.happeningRepository.find({
      where: {
        end: LessThan(new Date()),
      },
      order: {
        end: 'DESC',
      },
    });
  }

  findUpcoming() {
    return this.happeningRepository.find({
      where: {
        start: MoreThan(new Date()),
      },
      order: {
        start: 'ASC',
      },
    });
  }

  findAllByModeId(modeId: number) {
    return this.happeningRepository.findBy({ modeId: modeId });
  }

  findOne(address: string): Promise<Happening> {
    return this.happeningRepository.findOneByOrFail({ address: address });
  }

  async update(id: number, updateHappeningInput: UpdateHappeningInput) {
    await this.happeningRepository.update(id, updateHappeningInput);
    return this.happeningRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const happening = this.happeningRepository.findOneByOrFail({ id: id });
    this.happeningRepository.delete(id);
    return happening;
  }

  getMode(modeId: number) {
    return this.modesService.findOne(modeId);
  }

  async getLeaderboard(address: string) {
    const happening = await this.happeningRepository.findOneByOrFail({
      address: address,
    });

    return happening;

    const mode = await this.modesService.findOne(happening.modeId);
    const url = mode.getApiUrl.replace('{address}', happening.address);
    try {
      const results = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await results.json();
      happening;
      // happening.leaderboard = JSON.stringify(data.rankings);

      return happening;
    } catch (error) {
      console.log(error);
    }
  }
}
