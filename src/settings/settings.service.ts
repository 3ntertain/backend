import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mode } from 'src/modes/mode.entity';
import { ModesService } from 'src/modes/modes.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting } from './setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private settingsRepository: Repository<Setting>,
    @Inject(forwardRef(() => ModesService))
    private modesService: ModesService,
  ) {}

  create(createSettingInput: CreateSettingInput) {
    const newSetting = this.settingsRepository.create(createSettingInput);
    return this.settingsRepository.save(newSetting);
  }

  findAll() {
    return this.settingsRepository.find();
  }

  findAllByModeId(modeId: number) {
    return this.settingsRepository.findBy({ modeId: modeId });
  }

  findOne(id: FindOptionsWhere<Setting>): Promise<Setting> {
    return this.settingsRepository.findOneByOrFail(id);
  }

  async update(id: number, updateSettingInput: UpdateSettingInput) {
    await this.settingsRepository.update(id, updateSettingInput);
    return this.settingsRepository.findOneByOrFail({ id: id });
  }

  remove(id: number) {
    const setting = this.settingsRepository.findOneByOrFail({ id: id });
    this.settingsRepository.delete(id);
    return setting;
  }

  getMode(modeId: number) {
    return this.modesService.findOne(modeId);
  }
}
