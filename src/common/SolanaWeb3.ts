import { Injectable } from '@nestjs/common';

import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  TransactionInstruction,
  Cluster,
} from '@solana/web3.js';

const bs58 = require('bs58');

@Injectable()
export class SolanaWeb3 {
  connection: Connection;
  sender: Keypair;

  constructor() {
    const decoded = bs58.decode(process.env.PRIVATE_KEY);

    this.connection = new Connection(
      clusterApiUrl((process.env.NETWORK as Cluster) || 'devnet'),
    );

    this.sender = Keypair.fromSecretKey(decoded);
  }
}
