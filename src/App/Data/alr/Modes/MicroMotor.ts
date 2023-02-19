import { Mode } from 'src/Entities/Mode.entity';

import { laps, car, difficulty, drift, boost, retries } from '../ModeOptions';

const mode = new Mode();

mode.title = 'Micro Motor';

mode.description = 'Relieve your childhood with this classic game mode!';

mode.image = 'https://clash-of-degens.netlify.app/media/micromachine.jpg';

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

mode.settings = [difficulty, laps, car, drift, boost, retries];

export default mode;
