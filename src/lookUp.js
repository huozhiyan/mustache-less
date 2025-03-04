/**
 * 在 dataObj 对象中查找 keyName 的值
 * @param {*} dataObj 对象
 * @param {*} keyName 要查找的key
 * @returns
 */
export default function lookUp(dataObj, keyName) {
  // 查看 keyName 中是否有 ., 但不能是 .
  if (keyName !== "." && keyName.indexOf(".") !== -1) {
    // 以 . 分隔，例如 a.b.c，先拆分为 [a, b, c]
    const keys = keyName.split(".");
    let temp = dataObj;
    for (let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]];
    }
    return temp;
  }

  // 没有.直接返回
  return dataObj[keyName];
}
