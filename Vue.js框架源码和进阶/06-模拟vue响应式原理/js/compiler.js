class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compiler(this.el);
  }
  // 编译模板，处理文本节点和元素节点
  compiler(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compilerTextNode(node);
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compilerElement(node);
      }
      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compiler(node);
      }
    });
  }
  // 编译元素节点，处理指令
  compilerElement(node) {
    // console.log(node.attributes);
    // 遍历所有属性的节点
    Array.from(node.attributes).forEach((attr) => {
      // 判断是否是指令
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName);
      }
    });
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + "Updater"];
    updateFn && updateFn(node, this.vm[key]);
  }

  // 处理v-text
  textUpdater(node, value) {
    node.textContent = value;
  }

  // 处理v-model
  modelUpdater(node, value) {
    node.value = value;
  }

  // 编译文本节点，处理差值表达式
  compilerTextNode(node) {
    // console.dir(node);
    // {{ msg }}
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
