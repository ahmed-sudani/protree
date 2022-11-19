const fs = require("fs");

const writeTree = async (tree = "", file) => {
  const fileExits = fs.existsSync(file);

  //create new README.md file and write tree
  if (!fileExits) await fs.promises.writeFile(file, tree);

  //read file data
  const data = await fs.promises.readFile(file, { encoding: "utf8" });

  //replace old tree if found
  const regex = new RegExp(
    /(<!-- ptree -->)$|(<!-- ptree -->\n{1,2})(```[^~,]*```)?\n?/
  );
  let result = data.replace(regex, tree);
  if (result.search(tree) === -1) result += "\n" + tree;
  await fs.promises.writeFile(file, result, { encoding: "utf8" });
};

module.exports = writeTree;
