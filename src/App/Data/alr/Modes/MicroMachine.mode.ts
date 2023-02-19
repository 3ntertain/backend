import { Mode } from 'src/Entities/Mode.entity';

import { laps, track, difficulty } from '../ModeOptions';

const mode = new Mode();

mode.title = 'MicroMachine';
mode.label = 'course';
mode.description =
  'Collect as much coin as possible in a limited amount of time. Golden rush!';
mode.image =
  'https://alpha-league-racing.s3.eu-west-3.amazonaws.com/tournament_maker/micromachine.jpg';
mode.settings = [track, difficulty, laps];

export default mode;
