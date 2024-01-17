const { inputToArray } = require("../../utils");

const digits = inputToArray(`${__dirname}/input.txt`)
  .map((line) => line.split(" "))
  .map((line) => line.map((digit) => parseInt(digit)));
const reversed = digits.map((arr) => [...arr].reverse());

part1 = () => allDigitsSummed(digits);
part2 = () => allDigitsSummed(reversed);

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function findNextDigit(arr) {
  let sum = 0;
  let input = [...arr];
  let outputs = { arr: input };
  let arrNum = 0;
  while (true) {
    let output = [];
    for (let i = 0; i < input.length; i++) {
      const curr = input[i];
      const next = input[i + 1];
      const diff = next - curr;
      if (!isNaN(diff)) output.push(diff);
    }
    outputs[`arr${arrNum}`] = output;
    if (output.every((val) => val === 0)) break;
    input = output;
    arrNum++;
  }

  for (const [, val] of Object.entries(outputs)) {
    sum += val[val.length - 1];
  }
  return sum;
}

function allDigitsSummed(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += findNextDigit(arr[i]);
  }
  return sum;
}
