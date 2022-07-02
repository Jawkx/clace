import chalk from "chalk";
import figlet from "figlet";
import { renderHeader } from "../utils/header";
import inq from "../utils/inquirer";

export const displayMnemonic = async (mnemonicArray: String[]) => {
  await inq.prompt({
    name: "key",
    type: "press-to-continue",
    anyKey: true,
    pressToContinueMessage: `
    In the next screen, your wallet recovery phrase will be shown
    please make sure there is no one watching your screen 
    the one that have the key can take full control of your wallet
    
    press any key to continue
    `,
  });

  renderHeader("Recovery phrase");

  mnemonicArray.forEach((value, idx) => {
    console.log(idx + 1 + (idx < 9 ? " :" : ":") + value);
  });

  console.log(
    chalk.bgRed(
      "Plase make sure you write it down.\nYou will NOT be able to access this after that"
    )
  );
  await inq.prompt({
    name: "key",
    type: "press-to-continue",
    anyKey: true,
    pressToContinueMessage: "Press any key to continue, ...",
  });
};
