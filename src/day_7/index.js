const { inputToArray } = require("../../utils");
const lines = inputToArray(`${__dirname}/input.txt`);

let [cardValsBase13p1, cardValsBase13p2] = [
  { T: 8, J: 9, Q: "A", K: "B", A: "C" },
  { T: 9, J: 0, Q: "A", K: "B", A: "C" }
];
for (let i = 2; i < 10; i++) {
  cardValsBase13p1[i] = i - 2;
  cardValsBase13p2[i] = i - 1;
}

part1 = () => createHands(lines, 1);
part2 = () => createHands(lines, 2);

console.time("Execution Time");
console.log(`Part 1: ${part1()}, Part 2: ${part2()}`);
console.timeEnd("Execution Time");

function createHands(lines, partNum) {
  let handsWithRanks = lines.map((line) => {
    const [hand, bid] = line.split(" ");
    let obj = {};
    obj[hand] = {
      cardRank: 0,
      tieBreak: 0,
      bid: parseInt(bid)
    };
    return obj;
  });

  handsWithRanks.forEach((obj) => {
    const hand = Object.keys(obj)[0];
    const convertedString = hand
      .split("")
      .map((char) =>
        partNum === 1 ? cardValsBase13p1[char] : cardValsBase13p2[char]
      )
      .join("");

    obj[hand].tieBreak = base13ToBase10(convertedString);

    obj[hand].cardRank =
      partNum === 1 ? findRankPart1(hand) : findRankPart2(hand);

    obj[hand].rank =
      partNum === 1
        ? parseInt(`${findRankPart1(hand)}${base13ToBase10(convertedString)}`)
        : parseInt(`${findRankPart2(hand)}${base13ToBase10(convertedString)}`);
  });

  handsWithRanks.sort((a, b) => {
    const rankA = Object.values(a)[0].rank;
    const rankB = Object.values(b)[0].rank;

    return rankA - rankB;
  });

  let sum = 0;
  for (let i = 0; i < handsWithRanks.length; i++) {
    sum += Object.values(handsWithRanks[i])[0].bid * (i + 1);
  }
  return sum;
}

function convertToTridecimal(digit) {
  const charCodeA = "A".charCodeAt(0);
  if (digit >= "0" && digit <= "9") {
    return parseInt(digit, 10);
  } else {
    return digit.charCodeAt(0) - charCodeA + 10;
  }
}

function base13ToBase10(string) {
  let result = 0;
  for (let i = string.length - 1; i >= 0; i--) {
    const digit = convertToTridecimal(string[i]);
    result += digit * Math.pow(13, string.length - 1 - i);
  }
  return String(result).padStart(6, "0");
}

function findRankPart1(string) {
  let charsWithFreq = {};
  string.split("").forEach((char) => {
    if (charsWithFreq[char]) {
      charsWithFreq[char]++;
    } else {
      charsWithFreq[char] = 1;
    }
  });
  return getHandValue(charsWithFreq);
}

function findRankPart2(string) {
  if (string === "JJJJJ") return 7;

  let charsWithFreq = {};
  let stringNoJs = string.replace(/J/g, "");
  let jokerCount = 5 - stringNoJs.length;
  stringNoJs.split("").forEach((char) => {
    if (charsWithFreq[char]) {
      charsWithFreq[char]++;
    } else {
      charsWithFreq[char] = 1;
    }
  });

  for (let i = 0; i < stringNoJs.split("").length; i++) {
    const char = stringNoJs.split("")[i];
    if (
      Object.keys(charsWithFreq).includes(char) &&
      charsWithFreq[char] == Math.max(...Object.values(charsWithFreq))
    ) {
      charsWithFreq[char] += jokerCount;
      break;
    }
  }
  return getHandValue(charsWithFreq);
}

function getHandValue(obj) {
  if (Object.values(obj).includes(5)) return 7;
  if (Object.values(obj).includes(4)) return 6;
  if (Object.values(obj).includes(3) && Object.values(obj).includes(2))
    return 5;
  if (Object.values(obj).includes(3)) return 4;
  if (Object.values(obj).filter((item) => item === 2).length === 2) return 3;
  if (Object.values(obj).includes(2)) return 2;
  else return 1;
}
