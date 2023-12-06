import load from "../loader.js";

const array = load();

//Obtain only the numbers from each line and create 2 arrays
const times = array[0].split(" ").filter((el) => !!el && Number(el));
const distances = array[1].split(" ").filter((el) => !!el && Number(el));

const races = [];
// Create a races array of races objects with the record distance and duration and total ways to win
times.forEach((time, idx) => {
  races.push({
    duration: Number(time),
    record: Number(distances[idx]),
    waysToWin: 0,
  });
});

export const calculateWaysToWin = (race) => {
  let buttonHeld = 0;
  while (buttonHeld < race.duration) {
    let timeLeft = race.duration - buttonHeld;
    const speed = buttonHeld;
    const totalDistance = speed * timeLeft;

    if (totalDistance > race.record) {
      race.waysToWin++;
    }
    buttonHeld++;
  }
};

races.forEach((race) => {
  calculateWaysToWin(race);
});

// Multiply all the ways to win together
const result = races.reduce((prev, current) => {
  return prev * current.waysToWin;
}, 1);

console.log(result);
