/*
HyperNeutrino's solution https://www.youtube.com/watch?v=g3Ms5e7Jdqo&ab_channel=HyperNeutrino
*/

const { inputToArray, arrayEquals } = require("../utils");

let input = inputToArray("./input.txt")
  .map((line) => line.split(" "))
  .map((arr) => [arr[0], arr[1].split(",").map((num) => parseInt(num))]);

let input2 = input.map(([string, array]) => [
  (string + "?").repeat(5).slice(0, -1),
  [].concat(...Array(5).fill(array)),
]);
let cache = {};

part1 = () => {
  let total = 0;
  input.forEach(([string, arr]) => {
    total += count(string, arr);
  });
  return total;
};

part2 = () => {
  let total = 0;
  input2.forEach(([string, arr]) => {
    total += count(string, arr);
  });
  return total;
};

console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);

function count(string, arr) {
  if (string === "") return arrayEquals(arr, []) ? 1 : 0;
  if (arrayEquals(arr, [])) return string.includes("#") ? 0 : 1;

  let key = [string, arr];
  if (key in cache) return cache[key];

  let result = 0;
  if ([".", "?"].includes(string.charAt(0))) {
    result += count(string.slice(1), arr);
  }
  if (["#", "?"].includes(string.charAt(0))) {
    if (
      arr[0] <= string.length &&
      !string.slice(0, arr[0]).includes(".") &&
      (arr[0] === string.length || string.charAt(arr[0]) != "#")
    ) {
      result += count(string.slice(arr[0] + 1), arr.slice(1));
    }
  }
  cache[key] = result;
  return result;
}
