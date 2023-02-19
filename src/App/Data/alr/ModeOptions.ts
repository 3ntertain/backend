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

export const car = new ModeSettingSelect({
  name: 'Model',
  label: 'model',
  description: 'Select a car model',
  type: 'select',
  options: [
    {
      value: 'ranger',
      label: 'Ranger',
    },
    {
      value: 'muscle',
      label: 'Muscle',
    },
    {
      value: 'Both',
      label: 'Both',
    },
  ],
});

export const retries = new ModeSettingSelect({
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
});

export const boost = new ModeSettingSelect({
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
});

export const drift = new ModeSettingCheckbox({
  name: 'Drift',
  label: 'drift',
  description: 'Enable drift',
  type: 'checkbox',
  checked: false,
});

export const duration = new ModeSettingSelect({
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
});
