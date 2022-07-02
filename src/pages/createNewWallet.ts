import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { generateMnemonic, mnemonicToEntropy } from "bip39";
import { displayMnemonic } from "./displayMnemonic";
import PressToContinuePrompt from "inquirer-press-to-continue";
import { renderHeader } from "../utils/header";

enum WalletInfoKeys {
  name = "name",
  password = "password",
  confirmPassword = "confirmPassword",
}

type WalletInfoInterface = {
  [val in WalletInfoKeys]: String;
};

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

export const createNewWallet = async (retryMessage?: String) => {
  renderHeader("New Wallet");

  if (retryMessage)
    console.log(chalk.red.bold("PLEASE TRY AGAIN " + retryMessage));

  const walletInfo = await inquirer.prompt<WalletInfoInterface>([
    {
      name: WalletInfoKeys.name,
      message: "Wallet name :",
      type: "input",
    },
    {
      name: WalletInfoKeys.password,
      message: "Password :",
      type: "password",
    },
    {
      name: WalletInfoKeys.confirmPassword,
      message: "Confirm password :",
      type: "password",
    },
  ]);

  if (walletInfo.password !== walletInfo.confirmPassword) {
    createNewWallet("Confirm password and password not match");
  } else {
    const mnemonic = generateMnemonic(160);
    const mnemonicArray = mnemonic.split(" ");
    const entrophy = mnemonicToEntropy(mnemonic);

    await displayMnemonic(mnemonicArray);

    console.clear();
    console.log({
      name: walletInfo.name,
      encryptedVal: entrophy,
    });
  }
};
