const toMarkdownCode = async (tree = "") => {
  return `<!-- protree -->\n\n\`\`\`\n${tree}\`\`\`\n`;
};
module.exports = toMarkdownCode;
