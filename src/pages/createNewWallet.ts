import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { generateMnemonic, mnemonicToEntropy } from "bip39";
import { displayMnemonic } from "./displayMnemonic";
import PressToContinuePrompt from "inquirer-press-to-continue";
import { renderHeader } from "../utils/header";
import { saveWallet } from "../functions";
import { start } from "./start";

enum WalletInfoKeys {
  name = "name",
  password = "password",
  confirmPassword = "confirmPassword",
}

type WalletInfoInterface = {
  [val in WalletInfoKeys]: string;
};

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

export const createWallet = async (
  retryMessage?: string,
  entrophy?: string
) => {
  const isNew = !entrophy;
  {
    isNew ? renderHeader("New Wallet") : null;
  }

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
    createWallet("Confirm password and password not match");
  } else {
    let walletEntrophy = "";
    if (isNew) {
      const mnemonic = generateMnemonic(160);
      const mnemonicArray = mnemonic.split(" ");
      walletEntrophy = mnemonicToEntropy(mnemonic);
      await displayMnemonic(mnemonicArray);
    } else {
      walletEntrophy = entrophy;
    }

    saveWallet(
      walletInfo.name.replace(/\s/g, ""), // This to remove whitespace
      walletInfo.password,
      walletEntrophy
    );

    start(
      isNew ? "Successfully created wallet" : "Successfully imported wallet"
    );
  }
};
