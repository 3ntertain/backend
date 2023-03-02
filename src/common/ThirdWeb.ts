import { ThirdwebSDK } from '@thirdweb-dev/sdk/solana';

export class ThirdWeb {
  sdk: ThirdwebSDK;

  constructor() {
    this.sdk = ThirdwebSDK.fromPrivateKey(
      process.env.NETWORK,
      process.env.PRIVATE_KEY,
    );
  }

  createDrop = async ({ name, symbol, description, totalSupply, image }) => {
    const metadata = {
      name: name,
      symbol: symbol,
      description: description,
      totalSupply: totalSupply,
      image: image,
    };

    try {
      const address = await this.sdk.deployer.createNftDrop(metadata);
      return address;
    } catch (error) {
      console.log(error);
      // this.createDrop({ name, symbol, description, totalSupply, image });
    }
  };

  setClaimConditions = async ({
    address,
    price,
    startTime,
    sellerFeeBasisPoints,
  }) => {
    const program = await this.sdk.getProgram(address, 'nft-drop');
    const conditions = await program.claimConditions.get();
    const supply = conditions.totalAvailableSupply;

    try {
      return await program.claimConditions.set({
        maxClaimable: supply,
        price: price,
        startTime: startTime ? startTime : new Date(),
        sellerFeeBasisPoints: sellerFeeBasisPoints ? sellerFeeBasisPoints : 0,
      });
    } catch (error) {
      // this.setClaimConditions({ address, price, startTime });
    }
  };

  lazyMint = async ({
    address,
    dateStart,
    dateEnd,
    rewardsDistribution,
    game,
    mode,
    symbol,
    creator,
  }) => {
    const program = await this.sdk.getProgram(address, 'nft-drop');
    const conditions = await program.claimConditions.get();
    const metadata = await program.getMetadata();

    const supply = conditions.totalAvailableSupply;
    const lazyMintMetaData = [];

    let i = 1;

    while (i <= supply) {
      const model = {
        name: metadata.name + ' #' + i,
        description: metadata.description,
        image: metadata.image,
        symbol: 'CODT',
        external_url: `${process.env.APP_URL}/event/${address}`,
        properties: [
          {
            name: 'Game',
            value: game,
          },
          {
            name: 'Mode',
            value: mode,
          },
          {
            name: 'Collection',
            value: address,
          },
          {
            name: 'Symbol',
            value: symbol,
          },

          {
            name: 'Start',
            value: dateStart,
          },
          {
            name: 'End',
            value: dateEnd,
          },

          {
            name: 'Creator',
            value: creator,
          },
          {
            name: 'Rewards Distribution',
            value: rewardsDistribution,
          },
        ],
      };

      lazyMintMetaData.push(model);

      i++;
    }

    // And lazy mint NFTs to your program
    const tx = await program.lazyMint(lazyMintMetaData);

    return tx;
  };
}
