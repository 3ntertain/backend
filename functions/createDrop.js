const { sdk } = require("./common/thirdWeb");
const generatePicture = require("./common/generatePicture");

const createDrop = async (req) => {
  const { image } = req.files;

  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.symbol ||
    !req.body.supply ||
    !image
  )
    return { success: false, message: "Missing params. " };

  const invitationImage = await generatePicture("evo1", image);

  const metadata = {
    name: req.body.name,
    symbol: req.body.symbol,
    description: req.body.description,
    totalSupply: req.body.supply,
    image: invitationImage,
  };

  console.log(metadata);

  try {
    const address = await sdk.deployer.createNftDrop(metadata);
    return {
      success: true,
      message: `Drop created!`,
      address: address,
    };
  } catch (error) {
    return {
      success: false,
      message: `Drop created!`,
      address: error,
    };
    console.log(error);
  }
};

module.exports = createDrop;
