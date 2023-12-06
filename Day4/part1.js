import load from "../loader.js";

const array = load();

let total = 0;

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

  const noMatching = myNos.filter((el) => winningNos.includes(el)).length;

  if (noMatching === 0) {
    return;
  }

  if (noMatching === 1) {
    total++;
    return;
  }

  total += 2 ** (noMatching - 1);
});

console.log(total);
