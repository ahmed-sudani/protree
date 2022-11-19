const assert = require("assert");
const { it } = require("node:test");
const genTree = require("../util/genTree");
const writeTree = require("../util/writeTree");
const fs = require("fs");
const toMarkdownCode = require("../util/toMarkdownCode");

const genDummyFolders = async (path, files) => {
  await fs.promises.mkdir(path, { recursive: true });
  for (let i = 0; i < files.length; i++)
    await fs.promises.mkdir(`${path}/${files[i]}`, { recursive: true });
};

const dummyTree = `. 
├── c1
│   └── c1
├── c2
└── c3
`;

const dummyTreeWithIgnore = `. 
├── c1
│   └── c1
└── c3
`;

const markdownDummyTree = `<!-- ptree -->

\`\`\`
. 
├── c1
│   └── c1
├── c2
└── c3
\`\`\`
`;

const dummyPath = "./tests/tree";
genDummyFolders(dummyPath, ["c1", "c2", "c3", "c1/c1"]);

it("should generate a valid tree", async () => {
  const tree = await genTree(dummyPath);
  assert.equal(tree, dummyTree);
});

it("should generate a valid tree with ignored files", async () => {
  const ignorePath = ".ptreeignore";
  const oldIgnore = await fs.promises.readFile(ignorePath, {
    encoding: "utf8",
  });
  await fs.promises.writeFile(ignorePath, "tests/tree/c2", {
    encoding: "utf8",
  });
  const tree = await genTree(dummyPath);
  await fs.promises.writeFile(ignorePath, oldIgnore, { encoding: "utf8" });
  assert.equal(tree, dummyTreeWithIgnore);
});

it("should generate a valid tree in markdown file", async () => {
  const file = "./tests/readme.md";
  let tree = await genTree(dummyPath);
  tree = await toMarkdownCode(tree);
  await writeTree(tree, file);
  const fileData = await fs.promises.readFile(file, "utf8");
  await fs.promises.rm(file);
  assert.deepStrictEqual(fileData, markdownDummyTree);
});
