import { Mode } from 'src/Entities/Mode.entity';

import { laps, track, difficulty } from '../ModeOptions';

const mode = new Mode();

mode.title = 'Time Attack';
mode.label = 'course';
mode.description =
  'Grind the leaderboard and try to be the fastest on the might classical time attack mode.';
mode.image =
  'https://alpha-league-racing.s3.eu-west-3.amazonaws.com/tournament_maker/timeattack.jpg';

mode.settings = [track, difficulty, laps];

export default mode;
