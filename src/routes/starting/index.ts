import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { createNewWallet } from "./createNewWallet";
import { getWallets } from "./helpers/checkWallet";

enum Selections {
  Create_New_Wallet = "Create_New_Wallet",
  Import_Wallet = "Import_Wallet",
}

export const starting = async () => {
  console.clear();
  console.log(figlet.textSync("CLACE", { font: "Standard" }));

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
      createNewWallet();
    }
  }
};
