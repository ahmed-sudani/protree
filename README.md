<h1 align="center">protree</h1> 
<p align="center"> a cli tool to automate building the project tree structure<p>

## Why

- more automation.
- less writing.
- handle forgetting update the documentation :-)

## Install

```
npm i protree
```

## Form

```
protree path out
```

## Usage

- ### with markdown

  Add `<!-- protree -->` comment to the .md file in the place you want the tree to be in.

  You will add the `comment` only one time and the tree will be updated in that place in case you update your structure in the future.

  In case you didn't add the `comment` the tree will be appended in end of the file.

  The tree will be added to the markdown file in a `code block` formate.

- ### with console
  `Omit` the `out` argument.
- ### with others
  Use the command as it is. But `note` the tree `will not` be updated and it will always be appended.

## Ignore Files

You can ignore files you don't want it to be included in the tree structure by creating a `.ptignore` file and add all the ignored files in it.

## Project Structure

<!-- protree -->

```
. 
├── .ptignore
├── LICENSE
├── README.md
├── index.js
└── util
    ├── genTree.js
    ├── loadIgnore.js
    ├── toMarkdownCode.js
    └── writeTree.js
```

## License

This project is [MIT](https://github.com/ahmed-sudani/protree/blob/main/LICENSE) licensed.
