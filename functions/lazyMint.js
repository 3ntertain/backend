const { sdk } = require("./common/thirdWeb");

const lazyMint = async (req) => {
  if (
    !req.body.address ||
    !req.body.organizer ||
    !req.body.track ||
    !req.body.laps ||
    !req.body.evo ||
    !req.body.dateStart ||
    !req.body.dateEnd ||
    !req.body.rewardsDistribution ||
    !req.body.rewardsToken
  )
    return { success: false, message: "Missing params. " };

  const program = await sdk.getProgram(req.body.address, "nft-drop");
  const conditions = await program.claimConditions.get();
  const metadata = await program.getMetadata();

  const supply = conditions.totalAvailableSupply;

  const lazyMintMetaData = [];

  let i = 1;

  while (i <= supply) {
    const model = {
      name: metadata.name + " ALR#" + i,
      description: metadata.description,
      image: metadata.image,
      external_url: `https://battle.alphaleagueracing.com/tournament/${req.body.address}`,
      properties: [
        {
          name: "Tournament Title",
          value: metadata.name,
        },
        {
          name: "Organizer",
          value: req.body.organizer,
        },
        {
          name: "Track",
          value: req.body.track,
        },
        {
          name: "Laps",
          value: req.body.laps,
        },
        {
          name: "EVO",
          value: req.body.evo,
        },
        {
          name: "Date Start",
          value: req.body.dateStart,
        },
        {
          name: "Date End",
          value: req.body.dateEnd,
        },
        {
          name: "Rewards Distribution",
          value: req.body.rewardsDistribution,
        },
        {
          name: "Rewards Token",
          value: req.body.rewardsToken,
        },
      ],
    };

    lazyMintMetaData.push(model);

    i++;
  }

  // And lazy mint NFTs to your program
  const tx = await program.lazyMint(lazyMintMetaData);

  return {
    success: true,
    message: `Drop lazy minted!`,
    address: req.body.address,
  };
};

module.exports = lazyMint;
