import Scanner from "./Scanner";
import nestTokens from "./nestTokens";
/**
 * 将模板字符串变为tokens数组
 */
export default function parseTemplateToTokens(templateStr) {
  const tokens = [];
  // 创建扫描器
  const scanner = new Scanner(templateStr);
  let words;
  // 当扫描器的指针没有到头时，让扫描器工作
  while (!scanner.eos()) {
    // 扫描字符，直到遇到 {{ 时结束
    words = scanner.scanUtil("{{");

    // 如果扫描的内容不为空，就作为text类型存入tokens
    if (words !== "") {
      tokens.push(["text", words]);
    }

    // 过滤 {{，指针后移2位
    scanner.scan("{{");

    // 再次扫描字符，直到遇到 }} 时结束
    words = scanner.scanUtil("}}");

    if (words !== "") {
      // 按照第一个字符组织tokens，# 为遍历的开始，/ 为遍历的结束
      if (words[0] === "#") {
        tokens.push(["#", words.substring(1)]);
      } else if (words[0] === "/") {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["name", words]);
      }
    }
    scanner.scan("}}");
  }
  // 返回折叠收集的tokens
  return nestTokens(tokens);
}
