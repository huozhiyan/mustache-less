import lookUp from "./lookUp";
import parseArray from "./parseArray";

/**
 * 渲染模版
 * @param {*} tokens
 * @param {*} data
 * @returns
 */
export default function renderTemplate(tokens, data) {
  let resultStr = "";
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token[0] === "text") {
      resultStr += token[1];
    } else if (token[0] === "name") {
      // name类型，获取值
      resultStr += lookUp(data, token[1]);
    } else if (token[0] === "#") {
      // 递归
      resultStr += parseArray(token, data);
    }
  }
  return resultStr;
}
