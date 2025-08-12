/**
 * @description utils的loader，用于处理项目中的DPUtils使用，将其替换为真实路径
 */

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const replace = require("./replace.js");

module.exports = function (source) {
  /** 传化成AST 抽象语法树 */
  const ast = parser.parse(source, {
    sourceType: "module",
    plugins: ["jsx", "tsx", "typescript"],
  });

  /** 替换 */
  traverse(ast, replace());
  /** 输出 */
  const output = generate(ast);
  console.log("output.code", output.code);
  return output.code;
};
