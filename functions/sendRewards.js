const { connection, sender } = require("@solana/web3.js");

const {
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} = require("@solana/web3.js");

const txNumber = 10;
const txInterval = 1000;

function generateTransactions(batchSize, dropList, fromWallet) {
  let result = [];

  console.log(fromWallet.toString());

  let txInstructions = dropList.map((drop) => {
    return SystemProgram.transfer({
      fromPubkey: fromWallet,
      toPubkey: new PublicKey(drop.walletAddress),
      lamports: drop.numLamports,
    });
  });

  const numTransactions = Math.ceil(txInstructions.length / batchSize);

  for (let i = 0; i < numTransactions; i++) {
    let bulkTransaction = new Transaction();

    let lowerIndex = i * batchSize;
    let upperIndex = (i + 1) * batchSize;

    for (let j = lowerIndex; j < upperIndex; j++) {
      if (txInstructions[j]) bulkTransaction.add(txInstructions[j]);
    }

    result.push(bulkTransaction);
  }
  return result;
}

async function executeTransactions(solanaConnection, transactionList, payer) {
  let result = [];

  let staggeredTransactions = transactionList.map((transaction, i, allTx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Requesting Transaction ${i + 1}/${allTx.length}`);

        solanaConnection
          .getLatestBlockhash()
          .then(
            (recentHash) => (transaction.recentBlockhash = recentHash.blockhash)
          )
          .then(() =>
            sendAndConfirmTransaction(solanaConnection, transaction, [payer])
          )
          .then(resolve);
      }, i * txInterval);
    });
  });

  result = await Promise.allSettled(staggeredTransactions);

  return result;
}

const sendRewards = async () => {
  const lamports = await connection.getMinimumBalanceForRentExemption(0);

  const dropList = [
    {
      walletAddress: "ZmAYgB7ZbFXgCyUSkWTdm76wsjXszi4QVWgLkCTgvCC",
      numLamports: lamports,
    },

    {
      walletAddress: "2udk8q94xpABiYXPBu62Pn2tgpN8WYYm6WPNuAnN32at",
      numLamports: lamports,
    },
    {
      walletAddress: "3X47z1dze63tAkcu7iS69EDtfTSBMQwAaqqbYKUbaU9c",
      numLamports: lamports,
    },
    {
      walletAddress: "BMRDJgVznFWNY9HXZAPVMLueYAKv2T7gST5CKtCbtb4m",
      numLamports: lamports,
    },
    {
      walletAddress: "62NnJ6xZibg4kzPjRp4CBdYrB8FK3uKSqyvRjLYqTo4V",
      numLamports: lamports,
    },
    {
      walletAddress: "ZmAYgB7ZbFXgCyUSkWTdm76wsjXszi4QVWgLkCTgvCC",
      numLamports: lamports,
    },
    {
      walletAddress: "2udk8q94xpABiYXPBu62Pn2tgpN8WYYm6WPNuAnN32at",
      numLamports: lamports,
    },
    {
      walletAddress: "3X47z1dze63tAkcu7iS69EDtfTSBMQwAaqqbYKUbaU9c",
      numLamports: lamports,
    },
    {
      walletAddress: "BMRDJgVznFWNY9HXZAPVMLueYAKv2T7gST5CKtCbtb4m",
      numLamports: lamports,
    },
    {
      walletAddress: "62NnJ6xZibg4kzPjRp4CBdYrB8FK3uKSqyvRjLYqTo4V",
      numLamports: lamports,
    },
  ];

  const transactionList = generateTransactions(
    txNumber,
    dropList,
    sender.publicKey
  );

  const txResults = await executeTransactions(
    connection,
    transactionList,
    sender
  );

  console.log(await txResults);

  return {
    success: true,
    message: "Transactions succeed!",
  };
};

module.exports = sendRewards;
