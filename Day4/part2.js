import load from "../loader.js";

const array = load();
const cards = [];
const map = {};

array.forEach((line) => {
  const winningNos = line
    .replace(/Card \d+:/g, "")
    .split("|")[0]
    .split(" ")
    .filter((el) => !!el);
  const myNos = line
    .split("|")[1]
    .split(" ")
    .filter((el) => !!el);

  const cardNumber = Number(line.match(/\d+/)[0]);

  let noMatching = myNos.filter((el) => winningNos.includes(el)).length;

  for (let i = cardNumber; i <= cardNumber + noMatching; i++) {
    if (cards.find((el) => el.cardNumber === cardNumber)) {
      cards.find((el) => el.cardNumber === cardNumber)?.copies.push(i);
    } else {
      cards.push({ cardNumber: i, copies: [] });
    }
  }
});
