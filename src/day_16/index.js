const { inputToArray } = require("../../utils");
const grid = inputToArray(`${__dirname}/input.txt`).map((line) =>
  line.split("")
);

part1 = () => {
  let beams = [{ cord: [0, 0], dir: "E" }];
  return energizedCount(beams);
};

part2 = () => {
  let maxScore = 0;
  let startingBeams = [];
  for (let i = 0; i < grid.length; i++) {
    startingBeams.push([{ cord: [i, 0], dir: "E" }]);
    startingBeams.push([{ cord: [i, grid[i].length - 1], dir: "W" }]);
  }
  for (let j = 0; j < grid[0].length; j++) {
    startingBeams.push([{ cord: [0, j], dir: "S" }]);
    startingBeams.push([{ cord: [grid[0].length - 1, j], dir: "N" }]);
  }
  startingBeams.forEach((beam) => {
    let score = energizedCount(beam);
    if (score > maxScore) maxScore = score;
  });
  return maxScore;
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function energizedCount(beams) {
  let visited = [];
  do {
    propogate(beams, visited);
  } while (beams.length);

  let count = [...new Set(visited.map((beam) => beam.slice(0, -1)))];
  return count.length;
}

function propogate(beams, visited) {
  let beam = ({ cord, dir } = beams[0]);
  visited.push(`${beam.cord[0]},${beam.cord[1]},${beam.dir}`);
  let secondBeam;
  const char = grid[cord[0]][cord[1]];
  switch (char) {
    case ".":
      switch (dir) {
        case "N":
          beam.cord[0]--;
          break;
        case "E":
          beam.cord[1]++;
          break;
        case "S":
          beam.cord[0]++;
          break;
        case "W":
          beam.cord[1]--;
          break;
      }
      break;
    case "|":
      switch (dir) {
        case "N":
          beam.cord[0]--;
          break;
        case "E":
          secondBeam = JSON.parse(JSON.stringify(beam));
          beam.cord[0]--;
          beam.dir = "N";
          secondBeam.cord[0]++;
          secondBeam.dir = "S";
          break;
        case "S":
          beam.cord[0]++;
          break;
        case "W":
          secondBeam = JSON.parse(JSON.stringify(beam));
          beam.cord[0]--;
          beam.dir = "N";
          secondBeam.cord[0]++;
          secondBeam.dir = "S";
          break;
      }
      break;
    case "/":
      switch (dir) {
        case "N":
          beam.cord[1]++;
          beam.dir = "E";
          break;
        case "E":
          beam.cord[0]--;
          beam.dir = "N";
          break;
        case "S":
          beam.cord[1]--;
          beam.dir = "W";
          break;
        case "W":
          beam.cord[0]++;
          beam.dir = "S";
          break;
      }
      break;
    case "-":
      switch (dir) {
        case "N":
          secondBeam = JSON.parse(JSON.stringify(beam));
          beam.cord[1]++;
          beam.dir = "E";
          secondBeam.cord[1]--;
          secondBeam.dir = "W";
          break;
        case "E":
          beam.cord[1]++;
          break;
        case "S":
          secondBeam = JSON.parse(JSON.stringify(beam));
          beam.cord[1]++;
          beam.dir = "E";
          secondBeam.cord[1]--;
          secondBeam.dir = "W";
          break;
        case "W":
          beam.cord[1]--;
          break;
      }
      break;
    case "\\":
      switch (dir) {
        case "N":
          beam.cord[1]--;
          beam.dir = "W";
          break;
        case "E":
          beam.cord[0]++;
          beam.dir = "S";
          break;
        case "S":
          beam.cord[1]++;
          beam.dir = "E";
          break;
        case "W":
          beam.cord[0]--;
          beam.dir = "N";
          break;
      }
      break;
  }
  if (isBeamValid(beam, visited)) {
    beams[0] = beam;
  } else {
    beams.shift();
  }
  if (secondBeam && isBeamValid(secondBeam, visited)) {
    beams.push(secondBeam);
    visited.push(
      `${secondBeam.cord[0]},${secondBeam.cord[1]},${secondBeam.dir}`
    );
  }
}

function isBeamValid(beam, visited) {
  let {
    cord: [x, y],
    dir
  } = beam;
  let stringified = `${x},${y},${dir}`;
  const len = grid.length;
  return (
    x > -1 && x < len && y > -1 && y < len && !visited.includes(stringified)
  );
}
