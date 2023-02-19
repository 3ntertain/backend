import { ModeSetting } from './ModeSetting.entity';

export class Mode {
  title: string;
  label: string;
  description: string;
  image: string;
  url: string;

  settings: ModeSetting[];
  config: any;
}
