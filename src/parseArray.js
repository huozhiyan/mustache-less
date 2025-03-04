import lookUp from "./lookUp";
import renderTemplate from "./renderTemplate";
/**
 * 处理数组，结合 renderTemplate 方法实现递归
 * 结构：["#", "students", ["text", "我是学生"]]
 */
export default function parseArray(token, data) {
  // 得到数据整体data中这个数组要使用的数据
  const v = lookUp(data, token[1]);
  // 结果字符串
  let resultStr = "";
  for (let i = 0; i < v.length; i++) {
    // 拼接
    resultStr += renderTemplate(token[2], {
      ...v[i],
      ".": v[i],
    });
  }

  return resultStr;
}
