import { Event } from 'src/Entities/Event.entity';

export class Game {
  name: string;
  description: string;
  symbol: string;

  logo: string;
  banner: string;
  video: string;

  url: string;

  twitter: string;
  discord: string;
  telegram: string;

  flatFee: number;
  feePerPlayer: number;

  createEventUrl: string;
  getEventUrl: string;

  modes: any[];

  constructor(game: any) {
    this.name = game.name;
    this.description = game.description;
    this.symbol = game.symbol;
    this.url = game.url;
    this.logo = game.logo;
    this.banner = game.banner;
    this.video = game.video;
    this.twitter = game.twitter;
    this.discord = game.discord;
    this.telegram = game.telegram;
    this.flatFee = game.flatFee;
    this.feePerPlayer = game.feePerPlayer;
    this.createEventUrl = game.createEventUrl;
    this.getEventUrl = game.getEventUrl;
    this.modes = game.modes;

    console.log(game.modes);
  }

  createEventBridge: (param: Event) => any;

  getEventBridge: (address: String) => { status: string; ranking: [] };

  setCreateEventBridge(fn: (param: any) => any) {
    this.createEventBridge = fn;
  }

  setGetEventBridge(fn) {
    this.getEventBridge = fn;
  }

  async createEvent(param: any, ticket_address): Promise<String> {
    const data = this.createEventBridge(param);

    data.nft_ticket_address = ticket_address;

    try {
      const results = await fetch(this.createEventUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournament: data,
        }),
      });

      return await results.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getEvent(address: string): Promise<any> {
    if (!address) return;

    console.log(this.getEventUrl.replace('{address}', address));
    const response = await fetch(
      this.getEventUrl.replace('{address}', address),
    );

    const data = await response.json();

    return this.getEventBridge(data);
  }
}
