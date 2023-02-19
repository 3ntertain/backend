export class RewardRules {
  distribution: number; // The number of players that will receive rewards
  step: number; // The step to calculate the rewards distribution
  offset: number; // The offset to calculate the rewards distribution

  constructor(rewards: string = '50|1|0') {
    const rewardsSplitted = rewards.split('|');

    if (rewardsSplitted.length !== 3) throw new Error('Invalid rewards format');

    this.distribution = parseInt(rewardsSplitted[0]);
    this.step = parseInt(rewardsSplitted[1]);
    this.offset = parseInt(rewardsSplitted[2]);
  }

  calculateReward = (rank: number) => {
    return 0.1;
  };
}
