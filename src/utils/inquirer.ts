import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

export default inquirer;
