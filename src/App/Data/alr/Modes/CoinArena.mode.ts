import { Mode } from 'src/Entities/Mode.entity';
import {
  ModeSettingSelect,
  ModeSettingCheckbox,
} from 'src/Entities/ModeSetting.entity';

import { laps, track, difficulty } from '../ModeOptions';

const mode = new Mode();

mode.title = 'Coin Arena';

mode.description = 'Relieve your childhood with this classic game mode!';
mode.image =
  'https://alpha-league-racing.s3.eu-west-3.amazonaws.com/tournament_maker/coinarena.jpg';

mode.config = {
  difficulty: 1,
  track: 10,
  mode: 'normal',
  model: 'both',
  game: 'arena_coins_collect',
  laps: 0,
  boost: 5,
  retries: 20,
  countdown: 33,
  drift: false,
};

mode.settings = [
  new ModeSettingSelect({
    name: 'Round Duration',
    label: 'countdown',
    description: 'Select the duration for a round',
    type: 'select',
    options: [
      {
        value: 30,
        label: '30 s',
      },
      {
        value: 45,
        label: '45 s',
      },
      {
        value: 60,
        label: '1 min',
      },
    ],
  }),

  new ModeSettingSelect({
    name: 'Boost',
    label: 'boost',
    description: 'Select the duration for the boost',
    type: 'select',
    options: [
      {
        value: 5,
        label: '5 s',
      },
      {
        value: 10,
        label: '10 s',
      },
      {
        value: 15,
        label: '15 s',
      },
      {
        value: 20,
        label: '20 s',
      },
      {
        value: 0,
        label: 'No boost',
      },
    ],
  }),

  new ModeSettingSelect({
    name: 'Retries',
    label: 'retries',
    description: 'Select the amount of retries',
    type: 'select',
    options: [
      {
        value: 5,
        label: '5',
      },
      {
        value: 15,
        label: '15',
      },
      {
        value: 30,
        label: '30',
      },
      {
        value: 0,
        label: 'Infinite',
      },
      {
        value: 1,
        label: 'One chance - Death Match',
      },
    ],
  }),

  new ModeSettingCheckbox({
    name: 'Drift',
    label: 'drift',
    description: 'Enable drift',
    checked: false,
  }),
];

export default mode;
