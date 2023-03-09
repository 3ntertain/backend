import { ThirdWeb } from './ThirdWeb';

const thirdWeb = new ThirdWeb();

export const createCollection = async ({
  name,
  symbol,
  description,
  slots,
  nftPicture,
}) => {
  console.log('STARTING CREATE COLLECTION');

  let dropAddress;
  let loops = 10;

  while (!dropAddress) {
    loops--;
    if (!loops) break;

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

  return dropAddress;
};

export const setClaim = async ({ price, dropAddress }) => {
  let txMint;
  let loops = 5;

  while (!txMint) {
    loops--;
    if (!loops) break;

    try {
      txMint = await thirdWeb.setClaimConditions({
        address: dropAddress,
        price: price,
        startTime: new Date(),
        sellerFeeBasisPoints: 500,
      });
    } catch (e) {
      console.log('THE ERROR' + e);
    }
  }

  console.log('CLAIM CONDITION SET' + txMint);

  return txMint;
};

export const lazyMint = async ({
  dropAddress,
  symbol,
  start,
  end,
  game,
  mode,
  creator,
  rewardsDistribution,
}) => {
  let txClaim;
  let loops = 3;

  while (!txClaim) {
    loops--;

    if (!loops) break;

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

  return txClaim;
};
