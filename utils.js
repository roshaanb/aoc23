const { readFileSync } = require("fs");

exports.inputToArray = (path) => {
  return readFileSync(path, "utf-8").split("\n");
};
