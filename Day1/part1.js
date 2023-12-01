import load from "../loader.js";

const array = load();

let numericStrings = [];
let total = 0;

array.forEach((line) => {
  numericStrings.push(
    line
      .split("")
      .filter((char) => Number(char))
      .join("")
  );
});

numericStrings.forEach((num) => {
  if (num.length === 1) {
    total += Number(`${num[0] + num[0]}`);
    return;
  }

  total += Number(`${num[0] + num[num.length - 1]}`);
});

console.log(total);
