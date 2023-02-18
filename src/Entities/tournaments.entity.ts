export class Tournaments {
  season_id: number;
  xp: number;
  xp_send: number;
  title: string;
  url_map_preview: string;
  track_id: number;
  start: Date;
  end: Date;
  model: 'both' | 'ranger' | 'muscle';
  evo: 1 | 2 | 3 | 4;
  mode: 'normal';
  game: 'course' | 'arena_coins_collect';
  forced_all_evo: number;
  laps: number;
  rewards: string;
  boost: number;
  retry: number;
  drift: number;
  countdown: number;
  visible: number;
  extreme_value: 'min' | 'max';
}
