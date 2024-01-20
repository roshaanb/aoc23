const { inputToArray } = require("../../utils");
const grid = inputToArray(`${__dirname}/input.txt`).map((line) =>
  line.split("")
);

part1 = () => {
  let beams = [[0, 0, 0, 1]];
  return energizedCount(beams);
};

part2 = () => {
  let maxScore = 0;
  let startingBeams = [];
  for (let i = 0; i < grid.length; i++) {
    startingBeams.push([[i, 0, 0, 1]], [[i, grid[i].length - 1, 0, -1]]);
  }
  for (let j = 0; j < grid[0].length; j++) {
    startingBeams.push([[0, j, 1, 0]], [[grid[0].length - 1, j, -1, 0]]);
  }
  startingBeams.forEach((beam) => {
    let score = energizedCount(beam);
    if (score > maxScore) maxScore = score;
  });
  return maxScore;
};

// ~25 seconds
console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function energizedCount(beams) {
  let visited = [];
  do {
    propogate(beams, visited);
  } while (beams.length);
  let count = [
    ...new Set(
      visited.map((beam) => {
        let [a, b] = beam.split(",");
        return `${a},${b}`;
      })
    )
  ];
  return count.length;
}

function propogate(beams, visited) {
  let [r, c, dr, dc] = beams[0];
  visited.push(`${r},${c},${dr},${dc}`);
  let [r2, c2, dr2, dc2] = [];
  const char = grid[r][c];
  if (char == "." || (char == "|" && dc == 0) || (char == "-" && dr == 0)) {
    [r, c] = [r + dr, c + dc];
  }
  if (char == "/") {
    [dr, dc] = [-dc, -dr];
    [r, c] = [r + dr, c + dc];
  }
  if (char == "\\") {
    [dr, dc] = [dc, dr];
    [r, c] = [r + dr, c + dc];
  }
  if (char == "|" && dr == 0) {
    [r2, c2, dr2, dc2] = JSON.parse(JSON.stringify([r, c, dr, dc]));
    [dr, dc] = [-1, 0];
    [r, c] = [r + dr, c + dc];
    [dr2, dc2] = [1, 0];
    [r2, c2] = [r2 + dr2, c2 + dc2];
  }
  if (char == "-" && dc == 0) {
    [r2, c2, dr2, dc2] = JSON.parse(JSON.stringify([r, c, dr, dc]));
    [dr, dc] = [0, 1];
    [r, c] = [r + dr, c + dc];
    [dr2, dc2] = [0, -1];
    [r2, c2] = [r2 + dr2, c2 + dc2];
  }

  if (isBeamValid([r, c, dr, dc], visited)) {
    beams[0] = [r, c, dr, dc];
  } else {
    beams.shift();
  }
  if (r2 && isBeamValid([r2, c2, dr2, dc2], visited)) {
    beams.push([r2, c2, dr2, dc2]);
    visited.push(`${r2},${c2},${dr2},${dc2}`);
  }
}

function isBeamValid([r, c, dr, dc], visited) {
  let stringified = `${r},${c},${dr},${dc}`;
  const len = grid.length;
  return (
    r > -1 && r < len && c > -1 && c < len && !visited.includes(stringified)
  );
}
