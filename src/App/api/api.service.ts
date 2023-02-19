import { Injectable } from '@nestjs/common';
import { SolanaWeb3 } from 'src/Utilities/SolanaWeb3';
import { ThirdWeb } from 'src/Utilities/ThirdWeb';
import { Event } from 'src/Entities/Event.entity';
import { Nft } from 'src/Entities/Nft.entity';
import { RewardRules } from 'src/Entities/RewardRules.entity';
import { Leaderboard } from 'src/Entities/Leaderboard.entity';

@Injectable()
export class ApiService {
  constructor(
    private readonly solanaWeb3: SolanaWeb3,
    private readonly thirdWeb: ThirdWeb,
  ) {}

  getHello(): string {
    return 'Hello World from Lausanne from API not main!';
  }

  async createEvent(param: any) {
    const pubkey = this.solanaWeb3.sender.publicKey.toBase58();

    const bridge = param.game.symbol.clean();

    const folderPath = __dirname + '/../Data';
    const gamePath = folderPath + '/' + bridge + '/Game';
    const game = require(gamePath).default;

    let dropAddress;

    while (!dropAddress) {
      try {
        dropAddress = await this.thirdWeb.createDrop({
          name: param.title,
          symbol: param.symbol,
          description: param.description,
          totalSupply: param.slots,
          image: param.ticket,
        });
      } catch (e) {
        console.log('THE ERROR' + e);
      }
    }

    if (!dropAddress) return;

    let txMint;

    while (!txMint) {
      try {
        txMint = await this.thirdWeb.setClaimConditions({
          address: dropAddress,
          price: param.price,
          startTime: new Date(),
        });
      } catch (e) {
        console.log('THE ERROR' + e);
      }
    }

    let txClaim;

    while (!txClaim) {
      try {
        txClaim = await this.thirdWeb.lazyMint({
          address: dropAddress,
          dateStart: param.start,
          dateEnd: param.end,
          rewardsDistribution: '33|1|1',
          game: param.game.name,
          symbol: param.game.symbol,
          creator: param.creator,
        });
      } catch (e) {
        console.log('THE ERROR' + e);
      }
    }

    const event = await game.createEvent(param, dropAddress);

    return { address: dropAddress };
  }

  async getEvent(address: string) {
    if (!address) return;

    const event = new Event();

    const program = await this.thirdWeb.sdk.getProgram(address, 'nft-drop');
    const nfts = await program.getAll();
    const metadata = await program.getMetadata();
    const claimConditions = await program.claimConditions.get();

    // Get NFT from event
    const programNft = new Nft(nfts[0]);

    // Get game
    const bridge = programNft.getMetadataValue('symbol').clean();
    const game = require(`../Data/${bridge}/Game`).default;

    // Get data from game
    const gameEvent = await game.getEvent(address);

    // Populate event data
    event.address = address;

    event.title = metadata.name as string;
    event.description = metadata.description as string;
    event.image = metadata.image as string;
    event.url = programNft.external_url;
    event.game = game;
    event.claimConditions = claimConditions;
    event.start = new Date(programNft.getMetadataValue('start'));
    event.end = new Date(programNft.getMetadataValue('end'));
    event.organizerAddress = programNft.getMetadataValue('organizer');

    event.status = gameEvent.status;

    event.leaderboard = new Leaderboard(gameEvent.ranking);

    event.rewardRules = new RewardRules(programNft.getMetadataValue('rewards'));

    event.distributeRewards();

    return JSON.parse(JSON.stringify(event));
  }
}
