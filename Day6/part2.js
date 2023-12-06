import load from "../loader.js";
import { calculateWaysToWin } from "./part1.js";

const array = load();

const time = array[0]
  .split(" ")
  .filter((el) => !!el && Number(el))
  .join("");
const distance = array[1]
  .split(" ")
  .filter((el) => !!el && Number(el))
  .join("");

const race = {
  duration: Number(time),
  record: Number(distance),
  waysToWin: 0,
};

calculateWaysToWin(race);

console.log(race);
