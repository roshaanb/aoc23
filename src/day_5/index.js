const { inputToArray } = require("../../utils");
const input = inputToArray(`${__dirname}/input.txt`);
const seeds = input[0]
  .replace("seeds: ", "")
  .split(" ")
  .map((str) => parseInt(str));

let seedRanges = [];
for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
}
let lineBreaks = [];
input.forEach((line, i) => {
  if (line === "") lineBreaks.push(i);
});
let arrs = [];
for (let i = 0; i < lineBreaks.length; i++) {
  let arr = [];
  let line = lineBreaks[i];
  while (![undefined, ""].includes(input[line + 2])) {
    const nums = [input[line + 2]][0].split(" ").map((num) => parseInt(num));
    arr.push(nums);
    line++;
  }
  arrs.push(arr);
}

part1 = () => {
  let lowest = Infinity;
  for (let k = 0; k < seeds.length; k++) {
    let value = seeds[k];
    for (let i = 0; i < arrs.length; i++) {
      value = mapValue(arrs[i], value);
    }
    if (value < lowest) lowest = value;
  }
  return lowest;
};

part2 = () => {
  let num = 0;
  while (true) {
    const val = backwardsPropogate(num);
    if (seedRanges.some(([start, end]) => val <= end && val >= start)) {
      break;
    }
    num++;
  }
  return num;
};

// execution Time: ~4 min ...
console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function mapValue(arrs, value) {
  let out = value;
  arrs.find((arr) => {
    const [destStart, sourceStart, step] = arr;
    if (value >= sourceStart && value < sourceStart + step) {
      out = value - sourceStart + destStart;
    }
  });
  return out;
}

function backwardsPropogate(num) {
  let out = 0;
  let result = num;
  let counter = 6;
  while (counter > -1) {
    const rangesNdiff = arrs[counter].map(([destStart, sourceStart, step]) => [
      destStart,
      destStart + step - 1,
      destStart - sourceStart
    ]);
    if (!rangesNdiff.some(([start, end]) => result >= start && result <= end)) {
      out = result;
    } else {
      for (let i = 0; i < rangesNdiff.length; i++) {
        const [start, end, diff] = rangesNdiff[i];
        if (result >= start && result <= end) {
          out = result - diff;
        }
      }
    }
    result = out;
    counter--;
  }
  return out;
}
