import { Injectable } from '@nestjs/common';
import { Tournaments } from 'src/Entities/tournaments.entity';

export class Bridge {
  createUrl: string;

  constructor() {
    this.createUrl =
      'https://alr-api-grizzlython.herokuapp.com/call-tournaments/createTournament';
  }

  createEvent = async (param: any) => {
    const data: Tournaments = {
      season_id: 0,
      xp: 0,
      xp_send: 0,
      forced_all_evo: 0,
      visible: 1,

      title: param.title,
      rewards: param.prizePool + ' $' + param.token.symbol,
      url_map_preview: param.thumbnail,
      track_id: param.settings.track.value,

      start: param.start,
      end: param.end,

      model: param.settings.model?.value ? param.settings.model.value : 'both',
      evo: param.settings.evo.value,

      mode: param.settings.mode?.value ? param.settings.mode.value : 'normal',
      extreme_value:
        param.settings.mode?.value == 'arena_coins_collect' ? 'max' : 'min',
      game: param.settings.game?.value,

      laps: param.settings.laps?.value ? param.settings.laps.value : 1,

      boost: param.settings.boost?.value ? param.settings.boost.value : 10,
      retry: param.settings.retries?.value,
      countdown: param.settings.duration?.value,

      drift: param.settings.drift?.value ? param.settings.drift.value : false,
    };

    try {
      const results = await fetch(this.createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournament: data,
        }),
      });

      return await results.json();
    } catch (error) {}
  };
}
