const {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  TransactionInstruction,
} = require("@solana/web3.js");

const bs58 = require("bs58");
const { config } = require("dotenv");

config();

const decoded = bs58.decode(process.env.PRIVATE_KEY);

const connection = new Connection(clusterApiUrl(process.env.NETWORK));

const sender = Keypair.fromSecretKey(decoded);

module.exports = { connection, sender };
