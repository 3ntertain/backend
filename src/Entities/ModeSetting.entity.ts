import { ModeSettingOption } from './ModeSettingOption.entity';

export class ModeSetting {
  name: string;
  label: string;
  description: string;

  type: 'select' | 'checkbox' | 'hidden';
  constructor(setting: any) {
    this.name = setting.name;
    this.label = setting.label;
    this.description = setting.description;
  }
}

export class ModeSettingSelect extends ModeSetting {
  options: ModeSettingOption[];

  constructor(setting: any) {
    super(setting);

    this.type = 'select';
    this.options = setting.options;
  }
}

export class ModeSettingCheckbox extends ModeSetting {
  option: ModeSettingOption;
  checked: boolean;

  constructor(setting: any) {
    super(setting);

    this.type = 'checkbox';
    this.checked = setting.checked;
  }
}

export class ModeSettingHidden extends ModeSetting {
  option: ModeSettingOption;

  constructor(setting: any) {
    super(setting);

    this.type = 'hidden';
    this.option = setting.option;
  }
}
