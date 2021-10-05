export class Realm {
  constructor() {
    this.global = new Map();
    this.Object = new Map();
    this.Object.call = function () {};
    this.Object_prototype = new Map();
  }
}

export class EnvironmentRecord {
  constructor() {
    this.thisValue;
    this.variables = new Map();
    this.outer = null;
  }
}

// 执行上下文
export class ExecutionContext {
  // 词法环境
  // LexicalEnvironment = { a: 1, b :2};
  constructor(realm, lexicalEnvironment, variableEnvironment) {
    variableEnvironment = variableEnvironment || lexicalEnvironment;
    // 下面三个是js执行的基石
    this.lexicalEnvironment = lexicalEnvironment;
    this.variableEnvironment = variableEnvironment;
    this.realm = realm;
  }
}

// Reference类型 js 中很重要的机制, js运行时中真实存在的类型
export class Reference {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }
  set(value) {
    this.object[this.property] = value;
  }
  get() {
    return this.object[this.property];
  }
}
