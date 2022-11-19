#!/usr/bin/env node
"use strict";

const main = async () => {
  try {
    const { argv } = require("process");
    if (!argv[2]) throw Error("Form : ptree path out");

    //generate tree
    const genTree = require("./util/genTree");
    let tree = await genTree(argv[2]);

    //print tree to console
    if (!argv[3]) return console.log(tree);

    //check if out file is markdown file
    if (argv[3].match(/.*\.md$/)) {
      const toMarkdownCode = require("./util/toMarkdownCode");
      tree = await toMarkdownCode(tree);
    }

    //write tree to out
    const writeTree = require("./util/writeTree");
    await writeTree(tree, argv[3]);

    console.log("✅ Tree Generated");
  } catch (error) {
    console.log(error.message);
  }
};

main();
