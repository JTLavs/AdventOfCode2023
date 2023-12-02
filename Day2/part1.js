import load from "../loader.js";

const array = load();

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;
const games = [];

export const getNumberOfColors = (games, array) => {
  array.forEach((line) => {
    // ID is the first digit or pair of digits we encounter in a line.
    const id = Number(line.match(/\d+/)?.[0]);
    const sets = line.split(";");

    games.push({ id, greens: [], reds: [], blues: [] });

    sets.forEach((set) => {
      const greenRegExp = set.match(/\d+ green/)?.[0];
      const blueRegExp = set.match(/\d+ blue/)?.[0];
      const redRegExp = set.match(/\d+ red/)?.[0];

      if (greenRegExp) {
        games
          .find((el) => el.id === id)
          .greens.push(Number(greenRegExp.match(/\d+/g)));
      }

      if (blueRegExp) {
        games
          .find((el) => el.id === id)
          .blues.push(Number(blueRegExp.match(/\d+/g)));
      }

      if (redRegExp) {
        games
          .find((el) => el.id === id)
          .reds.push(Number(redRegExp.match(/\d+/g)));
      }
    });
  });
};

getNumberOfColors(games, array);

const total = games
  .filter((game) => {
    return (
      game.greens.every((el) => el <= GREEN_CUBES) &&
      game.reds.every((el) => el <= RED_CUBES) &&
      game.blues.every((el) => el <= BLUE_CUBES)
    );
  })
  .reduce((prev, current) => prev + current.id, 0);

console.log(total);
