/**
 * 扫描器类
 */
export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 尾巴，初始值为字符串原文
    this.tail = templateStr;
  }

  // 走过指定的内容，没有返回值，用于过滤掉 {{ 和 }} 这样的内容
  scan(tag) {
    // 如果捕获到了tag，就让指针后移tag的长度
    if (this.tail.indexOf(tag) === 0) {
      // {{ 和 }} 的长度为2，就让指针后移2位
      this.pos += tag.length;
      // 改变尾巴为当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }
  }

  // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  scanUtil(stopTag) {
    // 记录执行本方法时pos的值
    const pos_backup = this.pos;
    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++;
      // 改变尾巴为当前指针这个字符开始到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }

    return this.templateStr.substring(pos_backup, this.pos);
  }

  // 指针是否已经到头
  eos() {
    return this.pos >= this.templateStr.length;
  }
}
