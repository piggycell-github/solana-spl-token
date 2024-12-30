import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Cluster, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const cluster = process.env.SOLANA_CLUSTER! as Cluster;
  const tokenMintAddress = process.env.TOKEN_MINT;
  const user = getKeypairFromEnvironment("SECRET_KEY");

  if (!cluster || !tokenMintAddress || !user) {
    throw new Error("Missing required environment variables");
  }

  const connection = new Connection(clusterApiUrl(cluster));

  console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

  const tokenMintAccount = new PublicKey(tokenMintAddress);

  const recipient = user.publicKey;

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    cluster
  );

  console.log(`✅ Created token Account: ${link}`);
}

main();
