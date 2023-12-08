const { inputToArray } = require("../utils");
const lines = inputToArray("./input.txt").split(",");

// p1

trebuchet = (lines) => {
  const linesNumbersOnly = lines.map((string) =>
    string.split("").filter((char) => !isNaN(parseInt(char)))
  );
  let sum = 0;
  linesNumbersOnly.forEach((arr) => {
    sum += 10 * parseInt(arr[0]) + parseInt(arr[arr.length - 1]);
  });
  return sum;
};

// p2

const nums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const wordsToNums = (line) => {
  const matched = [
    ...line.matchAll(
      /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g
    ),
  ].map((arr) => {
    if (!isNaN(parseInt(arr[1]))) return parseInt(arr[1]);
    return nums[arr[1]];
  });
  return 10 * matched[0] + matched[matched.length - 1];
};

let sum = 0;
lines.forEach((line) => (sum += wordsToNums(line)));

console.log(`Part 1: ${trebuchet(lines)}, Part 2: ${sum}`);
