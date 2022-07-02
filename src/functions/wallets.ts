import fs from "fs-extra";
import { AES } from "crypto-js";
import { getAccountKeyPriv } from "../serializationLibFunctions/getAccountKeyPriv";
import { SavedWalletObject } from "../models/WalletObject";
import { walletsPath } from "../constant";

export const getWallets = () => {
  return undefined;
};

export const saveWallet = (
  name: string,
  password: string,
  entrophy: string
) => {
  const accountPrivKey = getAccountKeyPriv(entrophy);
  const accountKeyPublic = accountPrivKey.to_public().to_bech32();

  const accountPrivKeyBech32 = accountPrivKey.to_bech32();

  console.log(accountPrivKeyBech32);

  const encryptedAccountPrivKey = AES.encrypt(
    accountPrivKeyBech32,
    password
  ).toString();

  const walletObject: SavedWalletObject = {
    walletName: name,
    accountPublicKey: accountKeyPublic,
    encryptedPrivKey: encryptedAccountPrivKey,
  };

  const walletObjectString = JSON.stringify(walletObject);

  fs.outputFileSync(`${walletsPath + name}.clace`, walletObjectString, {
    encoding: "hex",
  });
};
