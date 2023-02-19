import { Rank } from './Rank.entity';
import { RewardRules } from './RewardRules.entity';

export class Leaderboard {
  ranking: Rank[];

  constructor(rankingData: any[]) {
    this.ranking = [];

    rankingData.forEach((rankData, i) => {
      const rank = new Rank({
        pseudo: rankData.pseudo,
        position: i + 1,
        wallet: rankData.wallet,
        score: rankData.score,
      });

      this.ranking.push(rank);
    });
  }

  calculateRewardDistribution = (rewardRules: RewardRules) => {
    let players = this.ranking.length;

    let normalizingFactor = 0;
    let unnormlizedFactors = [];

    let percentPlayersToReward = (rewardRules.distribution * players) / 100;
    let step = rewardRules.step;
    let offset = percentPlayersToReward;

    for (let i = 0; i < percentPlayersToReward; i++) {
      unnormlizedFactors.push(1 / (offset + i * step));
    }

    unnormlizedFactors.forEach((f) => {
      normalizingFactor += f;
    });

    for (let i = 0; i < players - percentPlayersToReward; i++) {
      unnormlizedFactors.push(0);
    }

    this.ranking.forEach((f, i) => {
      this.ranking[i].percentReward = unnormlizedFactors[i] / normalizingFactor;
    });
  };

  distributeRewards = (prizePool: number) => {
    this.ranking.forEach((rank) => {
      rank.reward = rank.percentReward * prizePool;
    });
  };

  getPlayer = (wallet: string) => {
    return this.ranking.find((rank) => rank.wallet === wallet);
  };
}
