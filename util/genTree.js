const fs = require("fs");
const { resolve } = require("path");

const isDir = async (path) => {
  return (await fs.promises.stat(path)).isDirectory();
};

const genTree = async (path) => {
  path = resolve(path);

  //path exits
  const pathExits = fs.existsSync(path);
  if (!pathExits) throw Error("Please Enter A Valid Path");

  //path is a directory
  const pathIsDir = await isDir(path);
  if (!pathIsDir) throw Error("Path Is Not A Directory");

  //load ignore file
  const loadIgnore = require("./loadIgnore");
  filesIgnored = await loadIgnore();

  //build tree
  return buildTree(path);
};

let filesIgnored;
//recursively generate tree
const buildTree = async (currentPath, tree = ". \n", tabs = "") => {
  //get files in directory
  const files = await fs.promises.readdir(currentPath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    //check if file must be ignored
    const isIgnored = filesIgnored.test(currentPath + "/" + file);
    if (isIgnored) continue;

    //change '├── ' to '└── ' in last item
    const isLastItem = i === files.length - 1;
    const char = isLastItem ? "└── " : "├── ";
    const newTabs = tabs + (isLastItem ? "    " : "│   ");

    //add file to tree with tabs
    tree += tabs + char + file + "\n";

    //check if next path is directory to gen tree for it
    const nextPath = currentPath + "/" + file;
    const nextIsDir = await isDir(nextPath);
    if (nextIsDir) tree = await buildTree(nextPath + "/", tree, newTabs);
  }
  return tree;
};

module.exports = genTree;
