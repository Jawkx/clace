import csl from "@emurgo/cardano-serialization-lib-nodejs";
import { harden } from "./harden";

export const getAccountKeyPriv = (entrophy: string) => {
  const rootKey = csl.Bip32PrivateKey.from_bip39_entropy(
    Buffer.from(entrophy, "hex"),
    Buffer.from("")
  );

  const accountKeyPriv = rootKey
    .derive(harden(1852))
    .derive(harden(1815))
    .derive(harden(0));

  return accountKeyPriv;
};
