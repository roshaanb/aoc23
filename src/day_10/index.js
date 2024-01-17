const { inputToArray } = require("../../utils");
let tiles = inputToArray(`${__dirname}/input.txt`);

const [posOfS, pipeCords] = [{}, []];

tiles.forEach((line) => {
  if (line.includes("S")) {
    const rowIndex = tiles.indexOf(line);
    posOfS.row = rowIndex;
    posOfS.col = tiles[rowIndex].indexOf("S");
    pipeCords.push([posOfS.row, posOfS.col]);
  }
});

let [pos, direction, stepCount] = [{ ...posOfS }, "start", 0];
const tileCount = traverse();

/*
loopArea can by calculated using Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula):
  pipeCords = [[x1, y1], [x2, y2], [x3, y3], ... ]
  loopArea = |y1 * x2 - x1 * y2 + y2 * x3 - y3 * x2 + ...| / 2

interiotPointsCount can be calculated using Pick's theorem (https://en.wikipedia.org/wiki/Pick%27s_theorem):
  interiorPointsCount = loopArea - tileCount + 1
*/

let loopArea = 0;
for (let i = 0; i < pipeCords.length - 1; i++) {
  const [x1, y1] = [pipeCords[i][0], pipeCords[i][1]];
  const [x2, y2] = [pipeCords[i + 1][0], pipeCords[i + 1][1]];
  loopArea += y1 * x2 - y2 * x1;
}
const interiorPoints = loopArea / 2 - tileCount + 1;

part1 = () => tileCount;
part2 = () => interiorPoints;

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function posToChar({ row, col }) {
  return tiles[row].charAt(col);
}

function updatePosition(pos) {
  const [north, east, south, west] = [
    tiles[pos.row - 1] ? tiles[pos.row - 1].charAt(pos.col) : "na",
    tiles[pos.row] ? tiles[pos.row].charAt(pos.col + 1) : "na",
    tiles[pos.row + 1] ? tiles[pos.row + 1].charAt(pos.col) : "na",
    tiles[pos.row] ? tiles[pos.row].charAt(pos.col - 1) : "na",
  ];

  if (
    ["S", "|", "7", "F"].includes(north) &&
    ["S", "|", "J", "L"].includes(posToChar(pos)) &&
    direction != "south"
  ) {
    //go north
    direction = "north";
    pos.row--;
    stepCount++;
    pipeCords.push([pos.row, pos.col]);
    return;
  }
  if (
    ["S", "-", "J", "7"].includes(east) &&
    ["S", "-", "L", "F"].includes(posToChar(pos)) &&
    direction != "west"
  ) {
    //go east
    direction = "east";
    pos.col++;
    stepCount++;
    pipeCords.push([pos.row, pos.col]);
    return;
  }
  if (
    ["S", "|", "J", "L"].includes(south) &&
    ["S", "|", "7", "F"].includes(posToChar(pos)) &&
    direction != "north"
  ) {
    //go south
    direction = "south";
    pos.row++;
    stepCount++;
    pipeCords.push([pos.row, pos.col]);
    return;
  }
  if (
    ["S", "-", "L", "F"].includes(west) &&
    ["S", "-", "7", "J"].includes(posToChar(pos)) &&
    direction != "east"
  ) {
    //go west
    direction = "west";
    pos.col--;
    stepCount++;
    pipeCords.push([pos.row, pos.col]);
    return;
  }
}

function traverse() {
  do {
    updatePosition(pos);
  } while (posToChar(pos) != "S");
  return stepCount / 2;
}
