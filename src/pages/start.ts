import chalk from "chalk";
import { ChoiceOptions, SeparatorOptions } from "inquirer";
import { getWallets } from "../functions";
import { renderHeader } from "../utils/header";
import { createWallet } from "./createNewWallet";
import { importNewWallet } from "./importNewWallet";
import inquirer from "../utils/inquirer";

enum Selections {
  Create_New_Wallet = "Create_New_Wallet",
  Import_Wallet = "Import_Wallet",
}

export const start = async (message?: string) => {
  console.log(chalk.green(message));
  renderHeader("CLACE");
  const wallets = await getWallets();

  const walletsChoice = wallets.map(
    (wallet): ChoiceOptions | SeparatorOptions => ({
      value: wallet,
      name: wallet.walletName,
    })
  );

  const baseChoices: (ChoiceOptions | SeparatorOptions)[] = [
    new inquirer.Separator(),
    { value: Selections.Create_New_Wallet, name: "Create new wallet" },
    { value: Selections.Import_Wallet, name: "Import wallet" },
  ];

  const choices = walletsChoice.concat(baseChoices);

  const selection = await inquirer.prompt({
    name: "selected",
    type: "list",
    message:
      wallets.length > 0
        ? "Choose a wallet or create and import one"
        : "There is no wallet found",
    prefix: "",
    choices: choices,
  });

  console.log(selection.selected);
  if (selection.selected === Selections.Create_New_Wallet) {
    await createWallet();
  } else if (selection.selected === Selections.Import_Wallet) {
    await importNewWallet();
  } else {
    start();
  }
};
