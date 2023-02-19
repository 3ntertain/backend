import { Injectable } from '@nestjs/common';
import { Tournaments } from 'src/Entities/tournaments.entity';

export class Bridge {
  baseUrl: string;
  createUrl: string;
  getUrl: string;

  constructor() {
    this.baseUrl = 'https://alr-api-grizzlython.herokuapp.com/call-tournaments';
    this.createUrl = `${this.baseUrl}/createTournament`;
    this.getUrl = `${this.baseUrl}/getOneTournament`;
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

  getEvent = async (id: number) => {
    const response = await fetch(this.getUrl + '/' + id);
    const data = await response.json();

    const eventData = {
      status: data.status,
      ranking: [],
    };

    data.rankings.forEach((element: any) => {
      eventData.ranking.push({
        player: element.pseudo,
        wallet: element.wallet,
        score: element.score,
      });
    });

    eventData.ranking.push({
      player: 'Grizzlython',
      wallet: 'D3pxE2bsPdUkB2sMzEvx7A8HRBTkv5m75EEH4Tv1oDxa',
      score: 100,
    });

    return eventData;
  };
}
