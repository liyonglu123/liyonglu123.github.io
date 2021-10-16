export class Realm {
  constructor() {
    this.global = new Map();
    this.Object = new Map();
    this.Object.call = function () {};
    this.Object_prototype = new Map();
  }
}

// number string boolean undefined null symbol object, 处理类型转化问题等等
export class JSValue {
  get type() {
    if (this.constructor === JSNumber) {
      return "number";
    }
    if (this.constructor === JSString) {
      return "string";
    }
    if (this.constructor === JSBoolean) {
      return "boolean";
    }
    if (this.constructor === JSObject) {
      return "object";
    }
    if (this.constructor === JSNull) {
      return "null";
    }
    if (this.constructor === JSSymbol) {
      return "symbol";
    }
    return "undefined";
  }
}

export class JSNumber extends JSValue {
  constructor(value) {
    super();
    this.momory = new ArrayBuffer(8);
    if (arguments.length) {
      // Float64Array 符合IEEE的标准的
      new Float64Array(this.momory)[0] = value;
    } else {
      new Float64Array(this.momory)[0] = 0;
    }
  }
  get value() {
    return new Float64Array(this.momory)[0];
  }
  // toString() {}
  toNumber() {
    return this;
  }
  toBoolean() {
    if (new Float64Array(this.momory)[0] === 0) {
      return new JSBoolean(false);
    } else {
      return new JSBoolean(true);
    }
  }
  // toObject() {}
}

export class JSString extends JSValue {
  constructor(characters) {
    super();
    // TODO: 实际上需要按照utf16去存储的, utf16 算法
    // this.momory = new ArrayBuffer(characters.length * 2);
    this.characters = characters;
  }
  toNumber() {}
  toString() {
    return this;
  }
  toBoolean() {
    if ((new Float64Array(this.momory)[0] = 0)) {
      return new JSBoolean(false);
    } else {
      return new JSBoolean(true);
    }
  }
}

export class JSBoolean extends JSValue {
  constructor(value) {
    super();
    this.value = value || false;
  }
  toNumber() {
    if (this.value) {
      return new JSNumber(1);
    } else {
      return new JSNumber(0);
    }
  }
  toString() {
    if (this.value) {
      return new JSString(["t", "r", "u", "e"]);
    } else {
      return new JSNumber(["f", "a", "l", "s", "e"]);
    }
  }
  toBoolean() {
    return this;
  }
}

export class JSObject extends JSValue {
  constructor(proto) {
    super();
    this.properties = new Map();
    this.prototype = proto || null; // 就是[[prototype]]
  }
  set(name, value) {
    // TODO: writeable etc.
    this.setProperty(name, {
      value: value,
      enumrable: true,
      configurable: true,
      writeable: true,
    });
  }
  get(name) {
    // TODO: 原型链和getter
    return this.getProperty(name).value;
  }
  setProperty(name, attributes) {
    this.properties.set(name, attributes);
  }
  getProperty(name) {
    // TODO:
    return this.properties.get(name);
  }
  setPrototype(proto) {
    this.prototype = proto;
  }
  getPrototype() {
    return this.prototype;
  }
}

export class JSNull extends JSValue {
  toNumber() {
    return new JSNumber(0);
  }
  toString() {
    return new JSString(["n", "u", "l", "l"]);
  }
  toBoolean() {
    return new JSBoolean(false);
  }
}

export class JSUndefined extends JSValue {
  toNumber() {
    return new JSNumber(NaN);
  }
  toString() {
    return new JSString(["u", "n", "d", "e", "f", "i", "n", "e", "d"]);
  }
  toBoolean() {
    return new JSBoolean(false);
  }
}

export class JSSymbol extends JSValue {
  constructor(name) {
    super();
    this.name = name || "";
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
    this.object.set(this.property, value);
  }
  get() {
    return this.object.get(this.property);
  }
}

// 作用域
export class EnvironmentRecord {
  constructor(outer) {
    this.variables = new Map();
    this.outer = outer;
  }
  add(name) {
    this.variables.set(name, new JSUndefined());
  }
  get(name) {
    if (this.variables.has(name)) {
      console.log("EnvironmentRecord", this.variables.get(name));
      return this.variables.get(name);
    } else if (this.outer) {
      return this.outer.get(name);
    } else {
      return new JSUndefined();
    }
  }
  set(name, value = new JSUndefined()) {
    if (this.variables.has(name)) {
      return this.variables.set(name, value);
    } else if (this.outer) {
      return this.outer.set(name, value);
    } else {
      return this.variables.set(name, value);
    }
  }
}

export class ObjectEnvironmentRecord {
  constructor(object, outer) {
    this.object = object;
    this.outer = outer;
  }
  add(name) {
    this.object.set(name, new JSUndefined());
  }
  get(name) {
    // TODO: with statement need outer
    console.log("ObjectEnvironmentRecord", this.object.get(name));
    return this.object.get(name);
  }
  set(name, value = new JSUndefined()) {
    this.object.set(name, value);
  }
}

// 处理 continue， break等等语句
export class CompletionRecord {
  constructor(type, value, target) {
    this.type = type || "normal";
    this.value = value || new JSUndefined();
    this.target = target || null;
  }
}
