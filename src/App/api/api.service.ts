import { Injectable } from '@nestjs/common';
import { Tournaments } from 'src/Entities/tournaments.entity';
import { SolanaWeb3 } from 'src/Utilities/SolanaWeb3';
import { ThirdWeb } from 'src/Utilities/ThirdWeb';

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

    const { Bridge } = require(`../../Bridges/${param.game.symbol}`);
    const bridgeInstance = new Bridge();

    const event = await bridgeInstance.createEvent(param);

    const dropAddress = await this.thirdWeb.createDrop({
      name: param.title,
      symbol: param.symbol,
      description: param.description,
      totalSupply: param.slots,
      image: param.ticket,
    });

    console.log(dropAddress);

    await setTimeout(() => {}, 1000);

    console.log('ready to set claim conditions', dropAddress);

    const toto = await this.thirdWeb.setClaimConditions({
      address: dropAddress,
      price: param.price,
      startTime: new Date(),
    });

    const tata = await this.thirdWeb.lazyMint({
      address: dropAddress,
      dateStart: param.start,
      dateEnd: param.end,
      rewardsDistribution: 'xx',
      game: param.game.title,
      symbol: param.game.symbol,
      eventId: event.id,
    });

    return tata;
  }
}
