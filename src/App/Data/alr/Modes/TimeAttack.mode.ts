import { Mode } from 'src/Entities/Mode.entity';

import { laps, track, difficulty, drift, boost, retries } from '../ModeOptions';
import {
  ModeSettingSelect,
  ModeSettingCheckbox,
} from 'src/Entities/ModeSetting.entity';

const mode = new Mode();

mode.title = 'Time Attack';

mode.description = 'Grind the leaderboard and be the fastest.';
mode.image = 'https://clash-of-degens.netlify.app/media/timeattack.jpg';

mode.config = {
  difficulty: 2,
  track: 9,
  mode: 'topdown',
  model: 'both',
  game: 'course',
  laps: 1,
  boost: 5,
  retries: 20,
  countdown: 0,
  drift: false,
};

mode.settings = [track, difficulty, laps, drift, boost, retries];

export default mode;
