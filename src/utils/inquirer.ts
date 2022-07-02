import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";
import AutocompletePrompt from "inquirer-autocomplete-prompt";

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);
inquirer.registerPrompt("autocomplete", AutocompletePrompt);

export default inquirer;
