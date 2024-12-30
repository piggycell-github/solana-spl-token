import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const cluster = process.env.SOLANA_CLUSTER! as Cluster;
  const user = getKeypairFromEnvironment("SECRET_KEY");
  const tokenMintDecimals = process.env.TOKEN_MINT_DECIMALS;

  if (!cluster || !tokenMintDecimals || !user) {
    throw new Error("Missing required environment variables");
  }

  const decimals = parseInt(tokenMintDecimals);
  const connection = new Connection(clusterApiUrl(cluster));

  console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

  // This is a shortcut that runs:
  // SystemProgram.createAccount()
  // token.createInitializeMintInstruction()
  // See https://www.soldev.app/course/token-program
  const tokenMint = await createMint(
    connection,
    user,
    user.publicKey,
    null,
    decimals
  );

  const link = getExplorerLink("address", tokenMint.toString(), cluster);

  console.log(`✅ Finished! Created token mint: ${link}`);
}

main();
