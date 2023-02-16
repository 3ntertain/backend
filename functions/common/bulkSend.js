const { connection, sender } = require("./web3");

const { sendAndConfirmTransaction, Transaction } = require("@solana/web3.js");

const txNumber = 10;
const txInterval = 1000;

function prepareBatch(txInstructions) {
  let batchedTxInstructions = [];

  const numTransactions = Math.ceil(txInstructions.length / txNumber);

  for (let i = 0; i < numTransactions; i++) {
    let bulkTransaction = new Transaction();

    bulkTransaction.feePayer = sender.publicKey;

    let lowerIndex = i * txNumber;
    let upperIndex = (i + 1) * txNumber;

    for (let j = lowerIndex; j < upperIndex; j++) {
      if (txInstructions[j]) bulkTransaction.add(txInstructions[j]);
    }

    batchedTxInstructions.push(bulkTransaction);
  }

  return batchedTxInstructions;
}

async function executeTransactions(transactionList) {
  let staggeredTransactions = transactionList.map((transaction, i, allTx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        connection
          .getLatestBlockhash()
          .then(
            (recentHash) => (transaction.recentBlockhash = recentHash.blockhash)
          )
          .then(() =>
            sendAndConfirmTransaction(connection, transaction, [sender])
          )
          .then(resolve);
      }, i * txInterval);
    });
  });

  return await Promise.allSettled(staggeredTransactions);
}

const sendRewards = async (txInstructions) => {
  const batchedTxInstructions = prepareBatch(txInstructions);
  return await executeTransactions(batchedTxInstructions);
};

module.exports = sendRewards;
