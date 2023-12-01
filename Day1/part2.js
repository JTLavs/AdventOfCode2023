import load from "../loader.js";

// Part 2
const array = load();

const map = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

let total = 0;

array.forEach((line) => {
  let found = [];
  Object.keys(map).forEach((key) => {
    //Find all occurances of the key in the line and push it with the index
    [...line.matchAll(key)].map((a) =>
      found.push({ num: map[key], idx: a.index })
    );
  });

  line.split("").filter((char, idx) => {
    // If character can be converted to a number then push it with the index
    if (Number(char)) {
      found.push({ num: char, idx });
    }
  });

  // Have to sort as it is the first and last number found
  let sorted = found.sort((a, b) => (a.idx < b.idx ? -1 : 1));

  // Concatenate the first and last elements of the sorted array
  // Convert to number and add to total
  total += Number(`${sorted[0].num + sorted[sorted.length - 1].num}`);
});

console.log(total);
