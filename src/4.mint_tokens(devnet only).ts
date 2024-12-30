import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Cluster, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const cluster = process.env.SOLANA_CLUSTER! as Cluster;
  const tokenMintDecimals = process.env.TOKEN_MINT_DECIMALS;
  const tokenMintAddress = process.env.TOKEN_MINT;
  const tokenAccountAddress = process.env.TOKEN_ACCOUNT;

  if (
    !cluster ||
    !tokenMintDecimals ||
    !tokenMintAddress ||
    !tokenAccountAddress
  ) {
    throw new Error("Missing required environment variables");
  }

  const connection = new Connection(clusterApiUrl(cluster));
  const decimals = parseInt(tokenMintDecimals);

  // Our token has two decimal places
  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, decimals);

  const user = getKeypairFromEnvironment("SECRET_KEY");

  const tokenMintAccount = new PublicKey(tokenMintAddress);

  // Substitute in your own, or a friend's token account address, based on the previous step.
  const recipientAssociatedTokenAccount = new PublicKey(tokenAccountAddress);

  const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, cluster);

  console.log(`✅ Success! Mint Token Transaction: ${link}`);
}

main();
