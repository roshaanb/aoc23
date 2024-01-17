const { inputToArray } = require("../../utils");
const lines = inputToArray(`${__dirname}/input.txt`).toString().split(",");

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

part1 = () => {
  const linesNumbersOnly = lines.map((string) =>
    string.split("").filter((char) => !isNaN(parseInt(char)))
  );
  let sum = 0;
  linesNumbersOnly.forEach((arr) => {
    sum += 10 * parseInt(arr[0]) + parseInt(arr[arr.length - 1]);
  });
  return sum;
};

part2 = () => {
  let sum = 0;
  lines.forEach((line) => (sum += wordsToNums(line)));
  return sum;
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function wordsToNums(line) {
  const matched = [
    ...line.matchAll(
      /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g
    ),
  ].map((arr) => {
    if (!isNaN(parseInt(arr[1]))) return parseInt(arr[1]);
    return nums[arr[1]];
  });
  return 10 * matched[0] + matched[matched.length - 1];
}
