import { Mode } from 'src/Entities/Mode.entity';

import { retries, duration, boost, drift } from '../ModeOptions';

const mode = new Mode();

mode.title = 'Coin Arena';

mode.description = 'Relieve your childhood with this classic game mode!';
mode.image = 'https://clash-of-degens.netlify.app/media/coinarena.jpg';

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

mode.settings = [duration, boost, retries, drift];

export default mode;
