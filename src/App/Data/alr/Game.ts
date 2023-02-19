import { Game } from '../../../Entities/Game.entity';
import TimeAttack from './Modes/TimeAttack.mode';
import MicroMachine from './Modes/MicroMotor';
import CoinArena from './Modes/CoinArena.mode';
const baseUrl = 'https://alr-api-grizzlython.herokuapp.com/call-tournaments';

const alr = {
  name: 'Alpha League Racing',
  symbol: 'ALR',
  description: 'Cross-platform retro-future car racing game built on Solana.',
  url: 'https://alpha-league-racing.com',
  logo: 'https://clash-of-degens.netlify.app/media/logo.png',
  banner: 'https://clash-of-degens.netlify.app/media/banner.jpg',
  createEventUrl: `${baseUrl}/createTournament`,
  getEventUrl: `${baseUrl}/getOneTournament/{address}`,
  twitter: 'https://twitter.com/ALeague_Racing',
  discord: 'https://discord.gg/bRmKQ5Tc',

  flatFee: 0.09,
  feePerPlayer: 0.05,

  options: {
    season_id: 0,
    xp: 0,
    xp_send: 0,
    forced_all_evo: 0,
    visible: 1,
    track_id: 1,
    model: 'both',
    evo: 1,
    mode: 'normal',
    game: 'course',
    extreme_value: 'min',
    laps: 1,
    boost: 10,
    retries: 20,
    countdown: 0,
    drift: false,
  },

  modes: [TimeAttack, MicroMachine, CoinArena],
};

const game = new Game(alr);

game.setCreateEventBridge((param) => {
  const data: any = alr;

  data.title = param.title;
  data.rewards = Math.round(param.prizePool) + ' $' + param.token.symbol;
  data.url_map_preview = param.game.mode.image;

  data.start = param.start;
  data.end = param.end;

  Object.keys(param.game.mode.config).forEach((key) => {
    data[key] = param.game.mode.config[key];
  });

  Object.keys(param.settings).forEach((key) => {
    data[key] = param.settings[key].value;
  });

  data.extreme_value = data.mode == 'arena_coins_collect' ? 'max' : 'min';

  return data;
});

game.setGetEventBridge((data) => {
  const eventData = {
    status: data.status,
    ranking: [],
  };

  data.rankings.forEach((element: any, i) => {
    eventData.ranking.push({
      pseudo: element.pseudo,
      wallet: element.wallet,
      score: element.score,
    });
  });

  // eventData.ranking.push({
  //   pseudo: 'Grizzlython',
  //   wallet: 'D3pxE2bsPdUkB2sMzEvx7A8HRBTkv5m75EEH4Tv1oDxa',
  //   score: 100,
  // });

  // eventData.ranking.push({
  //   pseudo: 'ClockWork',
  //   wallet: 'Ho8Gbm29upYTndYRD3pvzcPAD5bdEMjR9MYevyxKerrc',
  //   score: 90,
  // });

  // eventData.ranking.push({
  //   pseudo: 'Grizzlython',
  //   wallet: 'aaa',
  //   score: 60,
  // });

  // eventData.ranking.push({
  //   pseudo: 'Grizzlython',
  //   wallet: 'aaa',
  //   score: 30,
  // });

  return eventData;
});

export default game;
