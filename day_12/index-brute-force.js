/*
a brute force. 
tried it again after seeing HyperNeutrino's solution
https://www.youtube.com/watch?v=g3Ms5e7Jdqo&ab_channel=HyperNeutrino
*/

const { inputToArray, arrayEquals, replaceAt } = require("../utils");

let input = inputToArray("./input.txt")
  .map((line) => line.split(" "))
  .map((arr) => [arr[0], arr[1].split(",")]);

part1 = () => {
  let totalArrangements = 0;
  input.forEach(([str, arr]) => {
    totalArrangements += arrangements(str, arr);
  });
  return totalArrangements;
};

part2 = () => {};
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);

function arrangements(str, arr) {
  let count = 0;

  let qMarkIndexes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "?") {
      qMarkIndexes.push(i);
    }
  }
  let qMarkCount = qMarkIndexes.length;

  const result = [];
  for (let i = 0; i < Math.pow(2, qMarkCount); i++) {
    const binaryArray = [];
    for (let j = qMarkCount - 1; j >= 0; j--) {
      binaryArray.push((i >> j) & 1);
    }
    result.push(binaryArray);
  }

  for (let j = 0; j < result.length; j++) {
    let binariesArr = result[j];
    let strToTest = str;
    for (let i = 0; i < qMarkCount; i++) {
      let replacementValue = binariesArr[i] === 0 ? "." : "#";
      strToTest = replaceAt(strToTest, qMarkIndexes[i], replacementValue);
    }
    if (isArrangementCorrect(strToTest, arr)) count++;
  }
  return count;
}

function isArrangementCorrect(arrangement, matchArr) {
  const outArr = arrangement
    .split(/\.+/g)
    .map((e) => e.length)
    .filter((val) => val !== 0);
  return arrayEquals(
    outArr,
    matchArr.map((num) => parseInt(num))
  );
}
