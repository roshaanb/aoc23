const { inputToArray } = require("../../utils");
const { lcm } = require("mathjs");

const lines = inputToArray(`${__dirname}/input.txt`);

let info = {
  instructions: lines[0],
  instructionsLength: lines[0].length,
  values: [],
  left: [],
  right: [],
  steps: [],
  locs: [],
  currIndexes: [],
};

for (let i = 2; i < lines.length; i++) {
  const line = lines[i].split(" = ");
  info.values.push(line[0]);

  if (line[0].charAt(2) === "A") {
    info.locs.push(line[0]);
    info.currIndexes.push(info.values.indexOf(line[0]));
  }
  info.left.push(line[1].slice(1, 4));
  info.right.push(line[1].slice(6, 9));
}
info.locs.forEach(() => info.steps.push(0));

const steps = findZZZ();

part1 = () => Math.min(...steps);
part2 = () => lcm(...steps);

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function findZZZ() {
  for (let i = 0; i < info.locs.length; i++) {
    while (info.locs[i].charAt(2) != "Z") {
      //cycle through vals
      if (
        info.instructions.charAt(info.steps[i] % info.instructionsLength) != "R"
      ) {
        info.locs[i] = info.left[info.currIndexes[i]];
        info.steps[i]++;
        info.currIndexes[i] = info.values.indexOf(info.locs[i]);
      } else {
        info.locs[i] = info.right[info.currIndexes[i]];
        info.steps[i]++;
        info.currIndexes[i] = info.values.indexOf(info.locs[i]);
      }
    }
  }
  return info.steps;
}
