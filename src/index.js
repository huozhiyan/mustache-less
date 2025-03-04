import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";
// 全局提供模版引擎对象
window.TemplateEngine = {
  // 渲染方法
  render(templateStr, data) {
    // 模版字符串变为tokens数组
    const tokens = parseTemplateToTokens(templateStr);
    console.log(tokens);
    // 调用renderTemplate方法，渲染tokens数组为dom字符串
    const domStr = renderTemplate(tokens, data);
    console.log(domStr);
    return domStr;
  },
};
