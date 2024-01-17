const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// creates empty directory for the day and adds input

const sessionCookie = process.env.SESSION_COOKIE;
const dayNumber = process.argv[2];
const [folderName, inputUrl, path] = [
  `src/day_${dayNumber}`,
  `https://adventofcode.com/2023/day/${dayNumber}/input`,
  `/Users/roshaanbajwa/aoc23/src/day_${dayNumber}/`,
];

const [inputFileName, testInputFileName, indexFileName] = [
  `${path}input.txt`,
  `${path}input.test.txt`,
  `${path}index.js`,
];

if (!sessionCookie) {
  console.error("Set the SESSION_COOKIE variable in the .env file.");
  process.exit(1);
}

if (!dayNumber || isNaN(parseInt(dayNumber))) {
  console.error("Provide day number as a command-line argument.");
  process.exit(1);
}

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);

    axios
      .get(inputUrl, {
        headers: {
          Cookie: `session=${sessionCookie}`,
        },
      })
      .then((response) => {
        const input = response.data.trim();
        const indexTemplate = fs.readFileSync("./index.template.js", "utf8");

        fs.writeFileSync(inputFileName, input);
        console.log(
          `Puzzle input for Day ${dayNumber} has been saved to ${inputFileName}`
        );

        fs.writeFileSync(indexFileName, indexTemplate);
        console.log(
          `Template index.js file has been created at ${indexFileName}`
        );

        fs.writeFileSync(testInputFileName, "");
        console.log(
          `Empty test input.txt file has been created at ${testInputFileName}`
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching puzzle input:",
          error.response ? error.response.data : error.message
        );
      });
  } else {
    console.log("Error creating folder");
  }
} catch (err) {
  console.log(err);
}
