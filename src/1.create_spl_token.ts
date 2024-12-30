import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const cluster = process.env.SOLANA_CLUSTER! as Cluster;

  const connection = new Connection(clusterApiUrl(cluster));

  const user = getKeypairFromEnvironment("SECRET_KEY");

  console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

  // This is a shortcut that runs:
  // SystemProgram.createAccount()
  // token.createInitializeMintInstruction()
  // See https://www.soldev.app/course/token-program
  const tokenMint = await createMint(connection, user, user.publicKey, null, 6);

  const link = getExplorerLink("address", tokenMint.toString(), cluster);

  console.log(`✅ Finished! Created token mint: ${link}`);
}

main();
