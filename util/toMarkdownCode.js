const toMarkdownCode = async (tree = "") => {
  return `<!-- ptree -->\n\n\`\`\`\n${tree}\`\`\`\n`;
};
module.exports = toMarkdownCode;
