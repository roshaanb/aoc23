const { inputToArray } = require("../utils");
let arr = inputToArray("./input.txt");
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].replace(/\w+:\s+/g, "").split(/\s+/g);
}
const [times, distances] = arr;

part1 = () => {
  let results = 1;
  for (let i = 0; i < times.length; i++) {
    results *= numsOfRecords(times[i], distances[i]);
  }
  return results;
};

part2 = () => {
  let results = 1;
  results *= numsOfRecords(
    times.join().replaceAll(",", ""),
    distances.join().replaceAll(",", "")
  );
  return results;
};

console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);

function numsOfRecords(time, distance) {
  let [holdTime, recordsCount] = [, 0];
  for (let i = 0; i < time; i++) {
    holdTime = i;
    let holdSpeed = holdTime;
    if ((time - holdTime) * holdSpeed > distance) recordsCount++;
  }
  return recordsCount;
}
