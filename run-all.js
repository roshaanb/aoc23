const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to find all index.js files and execute "node index.js" for each
function executeIndexJs(rootDir) {
  console.log("-------------------------------------");
  const files = getAllIndexFiles(rootDir);
  files.forEach((file) => {
    const filePath = path.join(rootDir, file);
    console.log();
    console.log(`Executing "node ${filePath}"`);
    execSync(`node ${filePath}`, { stdio: "inherit" });
  });
  console.log("-------------------------------------");
}

// Function to recursively find all index.js files
function getAllIndexFiles(dir) {
  let result = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== "node_modules") {
      result = result.concat(getAllIndexFiles(filePath));
    } else if (file === "index.js") {
      result.push(filePath);
    }
  });

  return result;
}

console.time("Total execution time");
executeIndexJs("./");
console.timeEnd("Total execution time");
