export class EventAccounting {
  volume: number;
  eventOrganizerFee: number;
  gameCreatorFee: number;
  platformFee: number;
  prizePool: number;

  constructor({
    price,
    players,
    eventOrganizerFee,
    gameCreatorFee,
    platformFee,
  }: {
    price: number;
    players: number;
    eventOrganizerFee: number;
    gameCreatorFee: number;
    platformFee: number;
  }) {
    this.volume = price * players;

    this.eventOrganizerFee = (this.volume * eventOrganizerFee) / 100;
    this.gameCreatorFee = (this.volume * gameCreatorFee) / 100;
    this.platformFee = (this.volume * platformFee) / 100;
    this.prizePool =
      this.volume -
      this.eventOrganizerFee -
      this.gameCreatorFee -
      this.platformFee;
  }
}
