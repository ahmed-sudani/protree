const fs = require("fs");
const { resolve, join } = require("path");

//load ignore file
const loadIgnoreFile = async () => {
  const path = ".ptreeignore";
  const dfReg = "(.git$)|(node_modules$)";

  //check if .ptreeignore exits
  const ptreeIgnoreExits = fs.existsSync(path);
  if (!ptreeIgnoreExits) return new RegExp(dfReg);

  //load .ptreeignore
  let loadedFile = await fs.promises.readFile(path, { encoding: "utf8" });

  // add .git and node_modules to loaded file
  loadedFile += "\n.git\nnode_modules";

  //change all * to .*
  loadedFile = loadedFile.replace(/\*/g, ".*");

  //change .ptreeignore to array
  loadedFile = loadedFile.split("\n");

  //resolve all files
  loadedFile = loadedFile.map((item) => join(resolve("."), item));

  //add (^filename$) to all content
  loadedFile = "(^" + loadedFile.join("$)|(^") + "$)";

  //change loaded file content to regex
  return new RegExp(loadedFile);
};

module.exports = loadIgnoreFile;
