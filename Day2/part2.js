import load from "../loader.js";
import { getNumberOfColors } from "./part1.js";

const array = load();

let games = [];

getNumberOfColors(games, array);

games.forEach((game) => {
  const leastAmountGreen = Math.max(...game.greens);
  const leastAmountRed = Math.max(...game.reds);
  const leastAmountBlue = Math.max(...game.blues);

  game.power = leastAmountRed * leastAmountGreen * leastAmountBlue;
});

const total = games.reduce((prev, current) => {
  return prev + current.power;
}, 0);

console.log(total);
