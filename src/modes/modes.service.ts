import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HappeningsService } from 'src/happenings/happenings.service';
import { GamesService } from 'src/games/games.service';
import { PricingsService } from 'src/pricings/pricings.service';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreateModeInput } from './dto/create-mode.input';
import { UpdateModeInput } from './dto/update-mode.input';
import { Mode } from './mode.entity';

@Injectable()
export class ModesService {
  constructor(
    @InjectRepository(Mode) private modesRepository: Repository<Mode>,
    @Inject(forwardRef(() => GamesService))
    private gamesService: GamesService,
    @Inject(forwardRef(() => SettingsService))
    private settingsService: SettingsService,
    @Inject(forwardRef(() => PricingsService))
    private pricingsService: PricingsService,
    @Inject(forwardRef(() => HappeningsService))
    private happeningsService: HappeningsService,
  ) {}

  create(createModeInput: CreateModeInput) {
    const newMode = this.modesRepository.create(createModeInput);
    return this.modesRepository.save(newMode);
  }

  findAll() {
    return this.modesRepository.find();
  }

  findAllByGameId(gameId: number) {
    return this.modesRepository.findBy({ gameId: gameId });
  }

  findOne(id: number): Promise<Mode> {
    return this.modesRepository.findOneByOrFail({ id: id });
  }

  update(id: number, updateModeInput: UpdateModeInput) {
    this.modesRepository.update(id, updateModeInput);
    return this.modesRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const mode = this.modesRepository.findOneByOrFail({ id: id });
    this.modesRepository.delete(id);
    return mode;
  }

  getGame(gameId: number) {
    return this.gamesService.findOne(gameId);
  }

  getSettings(modeId: number) {
    return this.settingsService.findAllByModeId(modeId);
  }

  getPricings(modeId: number) {
    return this.pricingsService.findAllByModeId(modeId);
  }

  getHappenings(modeId: number) {
    return this.happeningsService.findAllByModeId(modeId);
  }

  getPublicActiveHappenings(modeId: number) {
    return this.happeningsService.findPublicActiveByModeId(modeId);
  }
}
