import { Injectable } from '@nestjs/common';
import { SolanaWeb3 } from './SolanaWeb3';
import { ThirdWeb } from './ThirdWeb';

const solanaWeb3 = new SolanaWeb3();
const thirdWeb = new ThirdWeb();

export const createCollection = async ({
  name,
  symbol,
  description,
  slots,
  nftPicture,
  price,
  start,
  end,
  game,
  mode,
  creator,
  creatorFee,
  rewardsDistribution,
}) => {
  console.log('STARTING CREATE COLLECTION');

  let dropAddress;

  while (!dropAddress) {
    try {
      dropAddress = await thirdWeb.createDrop({
        name: name,
        symbol: symbol,
        description: description,
        totalSupply: slots,
        image: nftPicture,
      });
    } catch (e) {
      console.log('THE ERROR' + e);
    }
  }

  if (!dropAddress) return;

  console.log('DROP ADDRESS' + dropAddress);

  let txMint;

  while (!txMint) {
    try {
      txMint = await thirdWeb.setClaimConditions({
        address: dropAddress,
        price: price,
        startTime: new Date(),
        sellerFeeBasisPoints: creatorFee * 100,
      });
    } catch (e) {
      console.log('THE ERROR' + e);
    }
  }

  console.log('CLAIM CONDITION SET' + txMint);

  let txClaim;

  while (!txClaim) {
    try {
      txClaim = await thirdWeb.lazyMint({
        address: dropAddress,
        dateStart: start,
        dateEnd: end,
        rewardsDistribution: rewardsDistribution,
        game: game,
        mode: mode,
        symbol: symbol,
        creator: creator,
      });
    } catch (e) {
      console.log('THE ERROR' + e);
    }
  }

  console.log('MINTED' + txClaim);

  return dropAddress;
};
