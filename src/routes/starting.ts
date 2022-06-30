import figlet from "figlet";
import process from "node:process";

export const starting = () => {
  figlet.text("Clace Wallet", { font: "Standard" }, (err, data) => {
    if (err) {
      console.log(err);
      process.abort();
    }

    console.log(data);
  });
};
