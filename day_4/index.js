const { inputToArray } = require("../utils");
const card = inputToArray(`${__dirname}/input.txt`).map((line) =>
  line
    .replace(/Card\s+\d+:\s+/, "")
    .split(" | ")
    .map((arr) => arr.split(/\s+/g))
);

part1 = () => {
  let total = 0;
  for (let i = 0; i < card.length; i++) {
    const [myHand, winningHand] = card[i];
    let wins = 0;
    for (let j = 0; j < myHand.length; j++) {
      if (winningHand.includes(myHand[j])) wins++;
    }
    total += Math.floor(Math.pow(2, wins - 1));
  }
  return total;
};

part2 = () => {
  let indexes = [...Array(card.length).keys()];
  let sum = 0;

  while (indexes.length > 0) {
    sum += indexes.length;
    for (let i = 0; i < indexes.length; i++) {
      const val = indexes[i];
      const [myHand, winningHand] = card[val];
      let wins = 0;
      for (let j = 0; j < myHand.length; j++) {
        if (winningHand.includes(myHand[j])) wins++;
      }
      let iter = [];
      while (wins > 0) {
        iter.push(val + wins);
        wins--;
      }
      indexes[i] = iter;
    }
    indexes = indexes.flat(Infinity);
  }
  return sum;
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");
