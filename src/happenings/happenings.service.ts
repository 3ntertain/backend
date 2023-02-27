import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mode } from 'src/modes/mode.entity';
import { ModesService } from 'src/modes/modes.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateHappeningInput } from './dto/create-happening.input';
import { UpdateHappeningInput } from './dto/update-happening.input';
import { Happening } from './happening.entity';

@Injectable()
export class HappeningsService {
  constructor(
    @InjectRepository(Happening)
    private happeningRepository: Repository<Happening>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  create(createHappeningInput: CreateHappeningInput) {
    const newHappening = this.happeningRepository.create(createHappeningInput);
    return this.happeningRepository.save(newHappening);
  }

  findAll() {
    return this.happeningRepository.find();
  }

  findAllByModeId(modeId: number) {
    return this.happeningRepository.findBy({ modeId: modeId });
  }

  findOne(id: FindOptionsWhere<Happening>): Promise<Happening> {
    return this.happeningRepository.findOneByOrFail(id);
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
}
