const { readFileSync } = require("fs");
const { min } = require("mathjs");
const { arrayEquals, transposeArray } = require("../utils");

let mirrors = readFileSync("./input.txt", "utf-8")
  .split("\n\n")
  .map((data) => data.split("\n"));

part1 = () => {
  let summary = [0, 0];
  for (let i = 0; i < mirrors.length; i++) {
    summary[0] += getSummary(mirrors[i])[0];
    summary[1] += getSummary(mirrors[i])[1];
  }
  return summary[1] + 100 * summary[0];
};

part2 = () => {
  let summary = [0, 0];
  for (let i = 0; i < mirrors.length; i++) {
    summary[0] += getNewSummary(mirrors[i])[0];
    summary[1] += getNewSummary(mirrors[i])[1];
  }
  return summary[1] + 100 * summary[0];
};

console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);

function getSummary(mirror) {
  const mirrorTransposed = transposeArray(mirror);
  return [
    findHorizontalMirrors(mirror)[0],
    findHorizontalMirrors(mirrorTransposed)[0],
  ];
}

function findHorizontalMirrors(mirror) {
  let result = [];
  for (let i = 0; i < mirror.length - 1; i++) {
    let above = [];
    let below = [];
    for (let j = 0; j < mirror.length; j++) {
      j <= i ? above.push(mirror[j]) : below.push(mirror[j]);
    }
    const minLength = min(above.length, below.length);
    if (
      arrayEquals(
        above.reverse().slice(0, minLength),
        below.slice(0, minLength)
      )
    ) {
      result.push(i + 1);
    }
  }
  if (!result.length) {
    result = [0];
  }
  return result;
}

function getNewSummary(arr) {
  const [rows, cols] = [arr.length, arr[0].length];
  let newResult = [0, 0];
  let [originalHor, originalVer] = getSummary(arr);
  let arrCopy = JSON.parse(JSON.stringify(arr));

  originalLoop: for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      arrCopy[i] = swapChar(arr[i], j);
      let horResult = findHorizontalMirrors(arrCopy);
      if (
        !arrayEquals(horResult, [0]) &&
        !arrayEquals(horResult, [originalHor])
      ) {
        for (let val of horResult) {
          if (val != originalHor) {
            newResult[0] = val;
            break originalLoop;
          }
        }
      }

      let arrCopyTransposed = transposeArray(arrCopy);
      let verResult = findHorizontalMirrors(arrCopyTransposed);
      if (
        !arrayEquals(verResult, [0]) &&
        !arrayEquals(verResult, [originalVer])
      ) {
        for (let val of verResult) {
          if (val != originalVer) {
            newResult[1] = val;
            break originalLoop;
          }
        }
      }
      arrCopy[i] = arr[i];
    }
  }
  return newResult;
}

function swapChar(string, index) {
  let swapped = string.split("");
  swapped[index] == "#" ? (swapped[index] = ".") : (swapped[index] = "#");
  return swapped.join("");
}
