const { inputToArray } = require("../utils");
const gondola = inputToArray(`${__dirname}/input.txt`);

part1 = () => {
  let numsArray = [];
  let sum = 0;
  gondola.forEach((line, i) => {
    const re = /\d+/g;
    while ((match = re.exec(line)) != null) {
      numsArray.push({
        num: match[0],
        numStartIndex: match.index,
        numLength: match[0].length,
        lineIndex: i,
      });
    }
  });

  for (let i = 0; i < numsArray.length; i++) {
    const { num, numStartIndex, numLength, lineIndex } = numsArray[i];

    const [left, right] = [
      numStartIndex > 0 ? gondola[lineIndex][numStartIndex - 1] : ".",
      numStartIndex + numLength < gondola[lineIndex].length
        ? gondola[lineIndex][numStartIndex + numLength]
        : ".",
    ];

    let above = ".";
    if (lineIndex > 0) {
      let num = numStartIndex + numLength;
      while (num > numStartIndex - 2) {
        const char = gondola[lineIndex - 1][num];
        if (char != undefined) {
          above += char;
        }
        num--;
      }
    }

    let below = ".";
    if (lineIndex < gondola.length - 1) {
      let num = numStartIndex + numLength;
      while (num > numStartIndex - 2) {
        const char = gondola[lineIndex + 1][num];
        if (char != undefined) {
          below += char;
        }
        num--;
      }
    }

    const adjacents = [above.split(""), below.split(""), left, right].flat();
    if (adjacents.some((char) => /[^.\d]/.test(char))) sum += parseInt(num);
  }
  return sum;
};

part2 = () => {
  const matrix = gondola.map((line) => line.split(""));
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "*") {
        const adjNums = [
          adjNum(matrix, i, j, "above"),
          adjNum(matrix, i, j, "below"),
          adjNum(matrix, i, j, "right"),
          adjNum(matrix, i, j, "left"),
        ].flat();
        if (adjNums.length === 2) {
          sum += adjNums.reduce((a, b) => parseInt(a) * parseInt(b));
        }
      }
    }
  }
  return sum;
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function adjNum(mat, i, j, dir) {
  let base = "";
  let nums = [];

  function getVerticalNums(num) {
    if (i != mat.length && j != 0) base += mat[i + num][j - 1];
    if (i != mat.length) base += mat[i + num][j];
    if (i != mat.length && j != mat.length) base += mat[i + num][j + 1];

    if (base.match(/\D\d\D/)) {
      nums.push(base.charAt(1));
    }
    if (base.match(/\D\D\d/)) {
      nums.push(gondola[i + num].slice(j + 1).match(/\d+/)[0]);
    }
    if (base.match(/\d\D\D/)) {
      nums.push(findNumsBackwards(gondola[i + num].slice(0, j)));
    }
    if (base.match(/\D\d\d/)) {
      nums.push(gondola[i + num].slice(j).match(/\d+/)[0]);
    }
    if (base.match(/\d\D\d/)) {
      nums.push(findNumsBackwards(gondola[i + num].slice(0, j)));
      nums.push(gondola[i + num].slice(j + 1).match(/\d+/)[0]);
    }
    if (base.match(/\d\d\D/)) {
      nums.push(findNumsBackwards(gondola[i + num].slice(0, j + 1)));
    }
    if (base.match(/\d\d\d/)) {
      nums.push(
        findNumsBackwards(gondola[i + num].slice(0, j + 1)) +
          gondola[i + num].slice(j + 1).match(/\d+/)[0]
      );
    }
  }

  if (dir === "above") {
    getVerticalNums(-1);
  }
  if (dir === "below") {
    getVerticalNums(1);
  }
  if (dir === "right") {
    if (j != mat.length) base += mat[i][j + 1];
    if (base.match(/\d/)) {
      nums.push(gondola[i].slice(j).match(/\d+/)[0]);
    }
  }
  if (dir === "left") {
    if (j != 0) base += mat[i][j - 1];
    if (base.match(/\d/)) {
      nums.push(findNumsBackwards(gondola[i].slice(0, j + 1)));
    }
  }
  return nums;
}

function findNumsBackwards(str) {
  return str
    .split("")
    .reverse()
    .join("")
    .match(/\d+/)[0]
    .split("")
    .reverse()
    .join("");
}
