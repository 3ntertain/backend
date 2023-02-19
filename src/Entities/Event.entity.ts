import { Game } from './Game.entity';
import { Token } from './Token.entity';
import { RewardRules } from './RewardRules.entity';

import { NFTDropConditions } from '@thirdweb-dev/sdk/solana';
import { Leaderboard } from './Leaderboard.entity';
import { EventAccounting } from './EventAccount';

export class Event {
  address: string;

  title: string;
  description: string;
  image: string;
  url: string;

  game: Game;

  claimConditions: NFTDropConditions;

  start: Date;
  end: Date;

  price: number;
  token: Token;

  organizerAddress: string;

  status: 'pending' | 'active' | 'ended' | 'canceled';

  rewardRules: RewardRules;

  leaderboard: Leaderboard;

  accounting: EventAccounting;
  accountingMax: EventAccounting;

  constructor() {}

  distributeRewards() {
    this.leaderboard.calculateRewardDistribution(this.rewardRules);

    this.price = parseFloat(this.claimConditions.price.displayValue);

    this.accounting = new EventAccounting({
      price: this.price,
      players: this.leaderboard.ranking.length,
      eventOrganizerFee: this.claimConditions.sellerFeeBasisPoints,
      gameCreatorFee: 5,
      platformFee: 5,
    });

    this.accountingMax = new EventAccounting({
      price: this.price,
      players: this.claimConditions.totalAvailableSupply,
      eventOrganizerFee: this.claimConditions.sellerFeeBasisPoints,
      gameCreatorFee: 5,
      platformFee: 5,
    });

    this.leaderboard.distributeRewards(this.accounting.prizePool);
  }

  getPlayer = () => {
    return 0;
  };
}
