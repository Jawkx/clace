import chalk from "chalk";
import inquirer from "inquirer";
import { getWallets } from "../functions";
import { renderHeader } from "../utils/header";
import { createNewWallet } from "./createNewWallet";

enum Selections {
  Create_New_Wallet = "Create_New_Wallet",
  Import_Wallet = "Import_Wallet",
}

export const start = async () => {
  renderHeader("CLACE");
  const wallets = getWallets();

  if (!wallets) {
    const selection = await inquirer.prompt({
      name: "selected",
      type: "list",
      message: chalk.bold.underline(
        "There is no wallet found in this device \n"
      ),
      prefix: "₳",
      choices: [
        { value: Selections.Create_New_Wallet, name: "Create new wallet" },
        { value: Selections.Import_Wallet, name: "Import wallet" },
      ],
    });

    if (selection.selected === Selections.Create_New_Wallet) {
      await createNewWallet();
    }
  }
};
