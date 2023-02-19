import {
  ModeSettingSelect,
  ModeSettingCheckbox,
} from 'src/Entities/ModeSetting.entity';

export const laps = new ModeSettingSelect({
  name: 'laps',
  label: 'laps',
  description: 'Select the number of laps',
  type: 'select',
  options: [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,

      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ],
});

export const track = new ModeSettingSelect({
  name: 'Track',
  label: 'track',
  description: 'Select the track',
  type: 'select',
  options: [
    {
      value: 7,
      label: 'HighVerse',
    },
    {
      value: 1,
      label: 'HackerVerse',
    },
    {
      value: 9,
      label: 'NeonVerse',
    },
    {
      value: 2,
      label: 'AlphaVerse',
    },
    {
      value: 8,
      label: 'RainbowVerse',
    },
    {
      value: 4,
      label: 'SpaceVerse',
    },
  ],
});

export const difficulty = new ModeSettingSelect({
  name: 'Difficulty',
  label: 'difficulty',
  description: 'Select the difficulty',
  type: 'select',
  options: [
    {
      value: 1,
      label: 'Easy - EVO1',
    },
    {
      value: 2,
      label: 'Medium - EVO2',
    },
    {
      value: 3,
      label: 'Hard - EVO3',
    },
    {
      value: 4,
      label: 'Extreme - EVO4',
    },
  ],
});

export const drift = new ModeSettingCheckbox({
  name: 'Drift',
  label: 'drift',
  description: 'Enable drift',
  type: 'checkbox',
  checked: false,
});
