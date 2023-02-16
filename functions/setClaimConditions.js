const { sdk } = require("./common/thirdWeb");

const setClaimConditions = async (req) => {
  if (!req.body.address || !req.body.price)
    return { success: false, message: "Missing params. " };

  const program = await sdk.getProgram(req.body.address, "nft-drop");

  const conditions = await program.claimConditions.get();
  const supply = conditions.totalAvailableSupply;

  await program.claimConditions.set({
    maxClaimable: supply,
    price: req.body.price,
    startTime: req.body.date ? req.body.date : new Date(),
  });

  return {
    success: true,
    message: `Claim condition set!`,
    address: req.body.address,
  };
};

module.exports = setClaimConditions;
