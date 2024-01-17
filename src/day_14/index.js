const { inputToArray } = require("../../utils");
const dish = inputToArray(`${__dirname}/input.txt`).map((a) => a.split(""));

part1 = () => {
  let arr = rotateBackwards(dish);
  arr = applyGravity(arr);
  for (_ of Array(3)) arr = rotateBackwards(arr);
  return calculateLoad(arr);
};

part2 = () => {
  let arr = cycle(dish, 10 ** 9);
  return calculateLoad(arr);
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function calculateLoad(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].filter((x) => x == "O").length * (arr.length - i);
  }
  return result;
}

function rotateBackwards(arr) {
  return arr[0].map((_, i) => arr.map((row) => row[i]).reverse());
}

function cycle(array, num) {
  let seen = [];
  let count = 0;
  let arr = JSON.parse(JSON.stringify(array));
  while (count < num) {
    for (_ of Array(4)) {
      arr = rotateBackwards(arr);
      arr = applyGravity(arr);
    }
    let string = JSON.stringify(arr);
    for (let i = 0; i < seen.length; i++) {
      if (seen[i] === string) {
        const numToCheck = i + ((10 ** 9 - i) % (count - i));
        let out = cycle(array, numToCheck);
        return out;
      }
    }
    seen.push(string);
    count++;
  }
  return arr;
}

function applyGravity(array) {
  let arr = JSON.parse(JSON.stringify(array));
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      if (arr[i][j] == "O") {
        arr[i] = slideO(arr[i], j);
      }
    }
  }
  return arr;
}

function slideO(array, index) {
  let targetIndex;
  if (index + 1 === array.length) {
    return array;
  }
  for (let i = index + 1; i < array.length + 1; i++) {
    if (["O", "#"].includes(array[i])) {
      targetIndex = i;
      break;
    }
    targetIndex = array.length;
  }
  array.splice(index, 1);
  return [
    ...array.slice(0, targetIndex - 1),
    "O",
    ...array.slice(targetIndex - 1)
  ];
}
