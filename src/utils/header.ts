import figlet from "figlet";

export const renderHeader = (text: string) => {
  console.clear();
  console.log(figlet.textSync(text, { font: "Standard" }));
};
