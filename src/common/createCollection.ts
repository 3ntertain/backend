import { ThirdWeb } from './ThirdWeb';

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
  const SECURITY_WHILE_COUNT = 20;
  let loops = SECURITY_WHILE_COUNT;

  console.log('STARTING CREATE COLLECTION');

  let dropAddress;

  loops = SECURITY_WHILE_COUNT;

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

  console.log('DROP ADDRESS' + dropAddress);

  let txMint;

  loops = SECURITY_WHILE_COUNT;

  while (!txMint) {
    loops--;
    if (!loops) break;

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

  loops = SECURITY_WHILE_COUNT;

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

  console.log('MINTED' + txClaim);

  return dropAddress;
};
