const { readFileSync } = require("fs");

exports.inputToArray = (path) => {
  return readFileSync(path, "utf-8").split("\n");
};

exports.arrayEquals = (a, b) => {
  // check if arrays are equal
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

exports.replaceAt = (str, i, char) => {
  // replace string str at index with character char
  str = str.split("");
  str[i] = char;
  str = str.join("");
  return str;
};

exports.transposeArray = (arr) => {
  return arr[0]
    .split("")
    .map((_, colIndex) => arr.map((row) => row[colIndex]))
    .map((col) => col.join(""));
};
