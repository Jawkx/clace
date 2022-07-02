import { renderHeader } from "../utils/header";
import { mnemonicToEntropy, wordlists } from "bip39";
import inquirer from "../utils/inquirer";
import { createWallet } from "./createNewWallet";
const wordList = wordlists.english;

export const importNewWallet = async () => {
  renderHeader("Import wallet");
  const intArray = Array.from({ length: 15 }, (_, index) => index + 1);

  const questionsArray = intArray.map((index) => ({
    type: "autocomplete",
    name: index.toString(),
    message: `Phrase ${index.toString()} :`,
    source: (_: string, input: string) =>
      wordList.filter((val) => val.startsWith(input)).slice(0, 5),
  }));

  console.log("Input your 15 words recovery phrase:");
  const answers = await inquirer.prompt(questionsArray);
  const mnemonic = Object.values(answers).join(" ");
  const entrophy = mnemonicToEntropy(mnemonic);

  createWallet(undefined, entrophy);
};
