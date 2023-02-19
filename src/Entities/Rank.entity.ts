export class Rank {
  pseudo: string;
  position: number;
  wallet: string;
  score: number;
  percentReward?: number;
  reward?: number;

  constructor({
    pseudo,
    position,
    wallet,
    score,
    percentReward,
    reward,
  }: {
    pseudo: string;
    position: number;
    wallet: string;
    score: number;
    percentReward?: number;
    reward?: number;
  }) {
    this.pseudo = pseudo;
    this.position = position;
    this.wallet = wallet;
    this.score = score;
    this.percentReward = percentReward;
    this.reward = reward;
  }
}
