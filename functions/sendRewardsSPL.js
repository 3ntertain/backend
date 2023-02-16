const { connection, sender } = require("./common/web3");
const { PublicKey } = require("@solana/web3.js");

const {
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} = require("@solana/spl-token");

const bulkSender = require("./common/bulkSend");

async function generateTransactions(rewards, tokenAddress) {
  const token = new PublicKey(tokenAddress);
  const mintInfo = await getMint(connection, token);
  const decimals = mintInfo.decimals;

  let txInstructions = [];

  const associatedTokenFrom = await getAssociatedTokenAddress(
    token,
    sender.publicKey
  );

  const fromAccount = await getAccount(connection, associatedTokenFrom);

  for (var i = 0; i < rewards.length; i++) {
    let reward = rewards[i];

    const receiverPubkey = new PublicKey(reward.wallet);

    const associatedTokenTo = await getAssociatedTokenAddress(
      token,
      receiverPubkey
    );

    if (!(await connection.getAccountInfo(associatedTokenTo))) {
      txInstructions.push(
        createAssociatedTokenAccountInstruction(
          sender.publicKey,
          associatedTokenTo,
          receiverPubkey,
          token
        )
      );
    }

    txInstructions.push(
      createTransferInstruction(
        fromAccount.address,
        associatedTokenTo,
        sender.publicKey,
        reward.amount * Math.pow(10, decimals)
      )
    );
  }

  return txInstructions;
}

const sendRewards = async (rewards, token) => {
  rewards = [
    {
      wallet: "ZmAYgB7ZbFXgCyUSkWTdm76wsjXszi4QVWgLkCTgvCC",
      amount: 0.01,
    },
    {
      wallet: "2udk8q94xpABiYXPBu62Pn2tgpN8WYYm6WPNuAnN32at",
      amount: 0.03,
    },
    {
      wallet: "62ETuQ5inack9BxvhQpMkK3DuXNBa55tN3Jsb3DSCSwU",
      amount: 0.02,
    },
    {
      wallet: "3X47z1dze63tAkcu7iS69EDtfTSBMQwAaqqbYKUbaU9c",
      amount: 0.07,
    },
    {
      wallet: "BMRDJgVznFWNY9HXZAPVMLueYAKv2T7gST5CKtCbtb4m",
      amount: 0.01,
    },
  ];

  const longRewards = [];
  for (var i = 0; i < 100; i++) {
    longRewards.push(...rewards);
  }

  token = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";

  const txInstructions = await generateTransactions(longRewards, token);

  const txResults = await bulkSender(txInstructions);

  return {
    success: true,
    message: "Rewards sent!",
    results: txResults,
  };
};

module.exports = sendRewards;
