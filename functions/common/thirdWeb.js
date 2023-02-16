const { ThirdwebSDK } = require("@thirdweb-dev/sdk/solana");
const { config } = require("dotenv");

config();

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.NETWORK,
  process.env.PRIVATE_KEY
);

module.exports = { sdk };
