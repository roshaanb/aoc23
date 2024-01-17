const { inputToArray } = require("../utils");
const universe = inputToArray(`${__dirname}/input.txt`).map((line) =>
  line.split("")
);

const main = (expansionFactor) => {
  let [emptyRows, emptyCols, cords] = [[], [], []];

  for (let i = 0; i < universe.length; i++) {
    const [row, col] = [universe[i], universe.map((value) => value[i])];
    if (!row.includes("#")) {
      emptyRows.push(expansionFactor - 1);
    } else {
      emptyRows.push(0);
      for (let j = 0; j < row.length; j++) {
        if (row[j] === "#") cords.push([i, j]);
      }
    }
    if (!col.includes("#")) {
      emptyCols.push(expansionFactor - 1);
    } else {
      emptyCols.push(0);
    }
  }

  const taxiCabDistance = ([x1, y1], [x2, y2]) => {
    const [minX, maxX, minY, maxY] = [
      Math.min(x1, x2),
      Math.max(x1, x2),
      Math.min(y1, y2),
      Math.max(y1, y2),
    ];
    let [extrasX, extrasY] = [0, 0];

    for (let i = minX; i < maxX + 1; i++) {
      extrasX += emptyRows[i];
    }
    for (let j = minY; j < maxY + 1; j++) {
      extrasY += emptyCols[j];
    }

    return maxX + maxY - minX - minY + extrasX + extrasY;
  };

  let sum = 0;

  for (let i = 0; i < cords.length; i++) {
    for (let j = i + 1; j < cords.length; j++) {
      sum += taxiCabDistance(cords[i], cords[j]);
    }
  }
  return sum;
};

const part1 = main(2);
const part2 = main(1_000_000);

console.time("Execution Time");
console.log(`Part 1: ${part1}, Part 2: ${part2}`);
console.timeEnd("Execution Time");
