/**
 * 折叠tokens，将#和/之间的tokens能够整合起来，作为它下标为2的项
 */
export default function nestTokens(tokens) {
  // 结果数组，需要最后返回的
  const nestedTokens = [];
  // 栈结构，用于保存 # 的token
  const sections = [];
  // 收集器引用，默认指向nestedTokens
  let collector = nestedTokens;

  // 遍历在 parseTemplateToTokens 中组织好的 tokens
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    switch (token[0]) {
      // 第一个字符如果为 #，就往收集器中放入这个token，并且入栈
      case "#":
        // 收集器中放入这个token
        collector.push(token);
        // 入栈
        sections.push(token);
        // 收集器此时要换位这个token的下标为2的项，因为之后需要push的是它的子项
        collector = token[2] = [];
        break;
      case "/":
        // 出栈
        sections.pop();
        // 改变收集器为栈结构末尾的数组
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;
      default:
        // 收集器中放入这个token
        collector.push(token);
    }
  }

  return nestedTokens;
}
