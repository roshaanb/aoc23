const { inputToArray } = require("../utils");
const input = inputToArray("./input.txt");

const elfBag = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = () => {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const hands = line
      .replace(/Game \d*: /g, "")
      .replace(/, |; /g, ",")
      .split(",");
    let possHands = [];

    for (let j = 0; j < hands.length; j++) {
      const [number, colour] = hands[j].split(" ");
      possHands.push(elfBag[colour] >= parseInt(number));
    }

    if (!possHands.includes(false)) sum += i + 1;
  }

  return sum;
};

const part2 = () => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const games = line.replace(/Game \d*: /g, "").split("; ");
    let minCols = { red: 0, green: 0, blue: 0 };

    for (let j = 0; j < games.length; j++) {
      const game = games[j];
      game.split(", ").forEach((hand) => {
        const [num, col] = hand.split(" ");
        ["red", "green", "blue"].forEach((colour) => {
          if (col === colour && parseInt(num) > minCols[col])
            minCols[col] = parseInt(num);
        });
      });
    }

    const power = Object.values(minCols).reduce((a, b) => a * b, 1);
    sum += power;
  }
  return sum;
};

console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
