const { readFileSync } = require("fs");
const hashes = readFileSync(`${__dirname}/input.test.txt`, "utf-8").split(",");

let lenses = [];
for (_ of Array(256)) lenses.push([]);

part1 = () => sumHashes(hashes);

part2 = () => {
  power();
  let sum = 0;
  lenses.forEach((lens, i) => {
    if (lens.length) {
      lens.forEach((lens, j) => {
        sum += lens.slice(-1) * (j + 1) * (i + 1);
      });
    }
  });
  return sum;
};

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function sumHashes(arr) {
  let sumOfHashes = 0;
  arr.forEach((str) => {
    sumOfHashes += hash(str);
  });
  return sumOfHashes;
}

function hash(str) {
  let currValue = 0;
  for (let i = 0; i < str.length; i++) {
    currValue = ((currValue + str.charCodeAt(i)) * 17) % 256;
  }
  return currValue;
}

function power() {
  for (let j = 0; j < hashes.length; j++) {
    const [boxNum, label, focalLength] = [
      hash(hashes[j].match(/\w*/)[0]),
      hashes[j].match(/\w*(?==|-)/)[0],
      hashes[j].slice(-1)
    ];
    if (hashes[j].includes("=")) {
      let matchIndex = 0;
      if (
        lenses[boxNum].some((str, index) => {
          matchIndex = index;
          return str.includes(label) && / \d/.test(str);
        })
      ) {
        lenses[boxNum][matchIndex] = `${label} ${focalLength}`;
      } else {
        lenses[boxNum].push(`${label} ${focalLength}`);
      }
    } else {
      let matchIndex = 0;
      if (
        lenses[boxNum].some((str, index) => {
          matchIndex = index;
          return str.includes(label) && / \d/.test(str);
        })
      ) {
        lenses[boxNum].splice(matchIndex, 1);
      }
    }
  }
}
