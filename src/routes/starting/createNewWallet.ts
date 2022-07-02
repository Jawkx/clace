import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

enum WalletInfoKeys {
  name = "name",
  password = "password",
  confirmPassword = "confirmPassword",
}

type WalletInfoInterface = {
  [val in WalletInfoKeys]: String;
};

export const createNewWallet = async (retryMessage?: String) => {
  console.clear();
  console.log(figlet.textSync("New Wallet", { font: "Standard" }));

  if (retryMessage)
    console.log(chalk.red.bold("PLEASE TRY AGAIN " + retryMessage));

  const walletInfo = (await inquirer.prompt([
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
  ])) as WalletInfoInterface;

  if (walletInfo.password !== walletInfo.confirmPassword) {
    createNewWallet("Confirm password and password not match");
  }
};
