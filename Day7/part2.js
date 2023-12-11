import load from "../loader.js";

const array = load();

const sortedHands = [];

const cardMapper = {
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

array.forEach((line) => {
  const hand = line.split(" ")[0];
  const bid = line.split(" ")[1];

  const duplicateElements = new Set(
    hand
      .split("")
      .filter((el, idx) => hand.split("").indexOf(el) !== idx && el !== "J")
  );

  const numberOfJokers = hand.split("").filter((el) => el === "J").length;

  if (duplicateElements.size === 0) {
    if (numberOfJokers === 1) {
      sortedHands.push({ hand, bid, kind: "P" });
      return;
    }

    if (numberOfJokers === 2) {
      sortedHands.push({ hand, bid, kind: "3OAK" });
      return;
    }

    if (numberOfJokers === 3) {
      sortedHands.push({ hand, bid, kind: "4OAK" });
      return;
    }

    if (numberOfJokers === 4) {
      sortedHands.push({ hand, bid, kind: "5OAK" });
      return;
    }

    if (numberOfJokers === 5) {
      sortedHands.push({ hand, bid, kind: "5OAK" });
      return;
    }

    sortedHands.push({ hand, bid, kind: "HC" });
    return;
  }

  if (duplicateElements.size === 1) {
    duplicateElements.forEach((duplicate) => {
      const noOfDuplicates = hand
        .split("")
        .filter((card) => card === duplicate).length;

      if (noOfDuplicates === 2) {
        if (numberOfJokers === 1) {
          sortedHands.push({ hand, bid, kind: "3OAK" });
          return;
        }

        if (numberOfJokers === 2) {
          sortedHands.push({ hand, bid, kind: "4OAK" });
          return;
        }

        if (numberOfJokers === 3) {
          sortedHands.push({ hand, bid, kind: "5OAK" });
          return;
        }

        sortedHands.push({ hand, bid, kind: "P" });
        return;
      }

      if (noOfDuplicates === 3) {
        if (numberOfJokers === 1) {
          console.log("JOKER- 4OAK");
          console.log(hand);
          sortedHands.push({ hand, bid, kind: "4OAK" });
          return;
        }

        if (numberOfJokers === 2) {
          console.log("JOKER- 5OAK");
          console.log(hand);
          sortedHands.push({ hand, bid, kind: "5OAK" });
          return;
        }

        sortedHands.push({ hand, bid, kind: "3OAK" });
        return;
      }

      if (noOfDuplicates === 4) {
        if (numberOfJokers === 1) {
          sortedHands.push({ hand, bid, kind: "5OAK" });
          return;
        }

        sortedHands.push({ hand, bid, kind: "4OAK" });
        return;
      }

      if (noOfDuplicates === 5) {
        sortedHands.push({ hand, bid, kind: "5OAK" });
        return;
      }
    });
  }

  if (duplicateElements.size === 2) {
    let noOfDuplicates = 0;
    duplicateElements.forEach((duplicate) => {
      noOfDuplicates += hand
        .split("")
        .filter((card) => card === duplicate).length;
    });

    if (noOfDuplicates === 5) {
      if (numberOfJokers === 2) {
        sortedHands.push({ hand, bid, kind: "5OAK" });
        return;
      }
      sortedHands.push({ hand, bid, kind: "FH" });
      return;
    }

    if (noOfDuplicates === 4) {
      if (numberOfJokers === 1) {
        sortedHands.push({ hand, bid, kind: "FH" });
        return;
      }
      sortedHands.push({ hand, bid, kind: "2P" });
      return;
    }
  }
});
const highCards = sortedHands.filter((hand) => hand.kind === "HC");
const pairs = sortedHands.filter((hand) => hand.kind === "P");
const twoPairs = sortedHands.filter((hand) => hand.kind === "2P");
const threeOfAKind = sortedHands.filter((hand) => hand.kind === "3OAK");
const fourOfAKind = sortedHands.filter((hand) => hand.kind === "4OAK");
const fiveOfAKind = sortedHands.filter((hand) => hand.kind === "5OAK");
const fullHouses = sortedHands.filter((hand) => hand.kind === "FH");

const sortHands = (a, b) => {
  let idx = 0;

  while (idx < 5) {
    const numbericValueOfCardA = isNaN(a.hand.charAt(idx))
      ? cardMapper[a.hand.charAt(idx)]
      : Number(a.hand.charAt(idx));
    const numbericValueOfCardB = isNaN(b.hand.charAt(idx))
      ? cardMapper[b.hand.charAt(idx)]
      : Number(b.hand.charAt(idx));

    if (numbericValueOfCardA < numbericValueOfCardB) {
      return -1;
    }

    if (numbericValueOfCardA > numbericValueOfCardB) {
      return 1;
    }

    idx++;
  }
};
highCards.sort(sortHands);
pairs.sort(sortHands);
twoPairs.sort(sortHands);
threeOfAKind.sort(sortHands);
fourOfAKind.sort(sortHands);
fiveOfAKind.sort(sortHands);
fullHouses.sort(sortHands);

console.log(fullHouses);

const allCardRanked = [
  ...highCards,
  ...pairs,
  ...twoPairs,
  ...threeOfAKind,
  ...fullHouses,
  ...fourOfAKind,
  ...fiveOfAKind,
];

const total = allCardRanked.reduce((prev, current, currentIdx) => {
  return (prev += current.bid * (currentIdx + 1));
}, 0);

console.log(total);
