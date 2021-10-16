import {
  ExecutionContext,
  Reference,
  Realm,
  JSObject,
  JSNumber,
  JSString,
  JSBoolean,
  JSNull,
  JSUndefined,
  JSSymbol,
  CompletionRecord,
  EnvironmentRecord,
  ObjectEnvironmentRecord,
} from "./runtime.js";
// 运行时
export class Evaluator {
  constructor() {
    this.realm = new Realm();
    this.globalObject = new JSObject();
    this.globalObject.set("log", new JSObject());
    this.globalObject.get("log").call = (args) => {
      console.log(args);
    };
    this.ecs = [
      new ExecutionContext(
        this.realm,
        // 最开始的时候一致的
        new ObjectEnvironmentRecord(this.globalObject),
        new ObjectEnvironmentRecord(this.globalObject)
      ),
    ];
  }
  evaluateModule(node) {
    let globalEC = this.ecs[0];
    let newEC = new ExecutionContext(
      this.realm,
      new EnvironmentRecord(globalEC.lexicalEnvironment),
      new EnvironmentRecord(globalEC.lexicalEnvironment)
    );
    this.ecs.push(newEC);
    let result = this.evaluate(node);
    this.ecs.pop();
    return result;
  }
  // 执行语法树
  evaluate(node) {
    if (this[node.type]) {
      let r = this[node.type](node);
      return r;
    }
  }
  Program(node) {
    return this.evaluate(node.children[0]);
  }
  IfStatement(node) {
    // refrence 对象
    let condition = this.evaluate(node.children[2]);
    if (condition instanceof Reference) {
      condition = condition.get();
    }
    // console.log(condition);
    if (condition.toBoolean().value) {
      return this.evaluate(node.children[4]);
    }
  }
  WhileStatement(node) {
    // refrence 对象
    while (true) {
      let condition = this.evaluate(node.children[2]);
      if (condition instanceof Reference) {
        condition = condition.get();
      }
      // console.log(condition);
      if (condition.toBoolean().value) {
        let record = this.evaluate(node.children[4]);
        if (record.type === "continue") {
          continue;
        }
        if (record.type === "break") {
          return new CompletionRecord("normal");
        }
      } else {
        return new CompletionRecord("normal");
      }
    }
  }
  BreakStatement(node) {
    return new CompletionRecord("break");
  }
  ContinueStatement(node) {
    return new CompletionRecord("continue");
  }
  StatementList(node) {
    // console.log(node);
    if (node.children.length == 1) {
      return this.evaluate(node.children[0]);
    } else {
      // TODO: 为什么return 后面，是根据标准来进行的
      let record = this.evaluate(node.children[0]);
      if (record.type === "normal") {
        return this.evaluate(node.children[1]);
      } else {
        return record;
      }
    }
  }
  Statement(node) {
    return this.evaluate(node.children[0]);
  }
  VariableDeclaration(node) {
    let runningEC = this.ecs[this.ecs.length - 1];
    runningEC.lexicalEnvironment.add([node.children[1].name]);
    return new CompletionRecord("normal", new JSUndefined());
  }
  ExpressionStatement(node) {
    let result = this.evaluate(node.children[0]);
    if (result instanceof Reference) {
      result = result.get();
    }
    return new CompletionRecord("normal", result);
  }
  Expression(node) {
    return this.evaluate(node.children[0]);
  }
  AdditiveExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    } else {
      let left = this.evaluate(node.children[0]);
      let right = this.evaluate(node.children[2]);
      if (left instanceof Reference) {
        left = left.get();
      }
      if (right instanceof Reference) {
        right = right.get();
      }
      if (node.children[1].type === "+") {
        return new JSNumber(left.value + right.value);
      }
      if (node.children[1].type === "-") {
        return new JSNumber(left.value - right.value);
      }
    }
  }
  MultiplicativeExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    } else {
      // TODO:
    }
  }
  PrimaryExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
  }
  Literal(node) {
    return this.evaluate(node.children[0]);
  }
  NumberLiteral(node) {
    // return this.evaluate(node.children[0]);
    let str = node.value;
    let l = str.length;
    let value = 0;
    let n = 10;
    // 处理不同的进制问题
    if (str.match(/^0b/)) {
      n = 2;
      l -= 2;
    } else if (str.match(/^0o/)) {
      n = 8;
      l -= 2;
    } else if (str.match(/^0x/)) {
      n = 16;
      l -= 2;
    }
    while (l--) {
      let c = str.charCodeAt(str.length - l - 1);
      if (c >= "a".charCodeAt(0)) {
        c = c - "a".charCodeAt(0) + 10;
      } else if (c >= "A".charCodeAt(0)) {
        c = c - "A".charCodeAt(0) + 10;
      } else if (c >= "0".charCodeAt(0)) {
        c = c - "0".charCodeAt(0);
      }
      value = value * n + c;
    }
    // console.log(value);
    return new JSNumber(node.value);
  }
  StringLiteral(node) {
    // console.log(node.value);
    let i = 1;
    let result = [];
    for (let i = 1; i < node.value.length - 1; i++) {
      // 转义
      if (node.value[i] === "\\") {
        ++i;
        let c = node.value[i];
        let map = {
          '"': '"',
          "'": "'",
          "\\": "\\",
          0: String.fromCharCode(0x0000),
          b: String.fromCharCode(0x0008),
          f: String.fromCharCode(0x000c),
          n: String.fromCharCode(0x000a),
          r: String.fromCharCode(0x000d),
          t: String.fromCharCode(0x0009),
          v: String.fromCharCode(0x000b),
        };
        if (c in map) {
          result.push(map[c]);
        } else {
          result.push(c);
        }
      } else {
        result.push(node.value[i]);
      }
    }
    // console.log(result);
    return new JSString(result);
  }
  ObjectLiteral(node) {
    if (node.children.length === 2) {
      return {};
    }
    if (node.children.length === 3) {
      let obj = new JSObject();
      this.PropertyList(node.children[1], obj);
      // obj.prototype =
      return obj;
    }
  }
  PropertyList(node, object) {
    if (node.children.length === 1) {
      this.Property(node.children[0], object);
    } else {
      this.PropertyList(node.children[0], object);
      this.Property(node.children[2], object);
    }
  }
  Property(node, object) {
    let name;
    if (node.children[0].type === "Identifier") {
      name = node.children[0].name;
    } else if (node.children[0].type === "StringLiteral") {
      name = this.evaluate(node.children[0]);
    }
    // descript
    object.set(name, {
      value: this.evaluate(node.children[2]),
      writeable: true,
      enumerable: true,
      configurable: true,
    });
  }
  BooleanLiteral(node) {
    if (node.value === "false") {
      return new JSBoolean(false);
    } else {
      return new JSBoolean(true);
    }
  }
  null() {
    return new JSNull();
  }
  AssignmentExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    let left = this.evaluate(node.children[0]);
    let right = this.evaluate(node.children[2]);
    left.set(right);
  }
  LogicalORExpression(node) {
    // 短路逻辑
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    let result = this.evaluate(node.children[0]);
    if (result) {
      return result;
    } else {
      return this.evaluate(node.children[2]);
    }
  }
  LogicalANDExpression(node) {
    // 短路逻辑
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    let result = this.evaluate(node.children[0]);
    if (!result) {
      return result;
    } else {
      return this.evaluate(node.children[2]);
    }
  }
  LeftHandsSideExpression(node) {
    return this.evaluate(node.children[0]);
  }
  NewExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    if (node.children.length === 2) {
      let cls = this.evaluate(node.children[1]);
      return cls.construct();
      /**
         *  new 的实现原理
           * let object = this.realm.Object.construct();
        let cls = this.evaluate(node.children[1]);
        let result = cls.call(object);
        if (typeof result === "object") {
          return result;
        } else {
          return object;
        }
      */
    }
  }
  CallExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    if (node.children.length === 2) {
      let func = this.evaluate(node.children[0]);
      let args = this.evaluate(node.children[1]);
      // 解引用
      if (func instanceof Reference) {
        func = func.get();
      }
      return func.call(args);
    }
  }
  MemberExpression(node) {
    if (node.children.length === 1) {
      return this.evaluate(node.children[0]);
    }
    if (node.children.length === 3) {
      let obj = this.evaluate(node.children[0]).get();
      let prop = obj.get(node.children[2].name);
      if ("value" in prop) {
        return prop.value;
      }
      if ("get" in prop) {
        return prop.get.call(obj);
      }
    }
  }
  Identifier(node) {
    let runningEC = this.ecs[this.ecs.length - 1];
    return new Reference(runningEC.lexicalEnvironment, node.name);
  }
  Arguments(node) {
    if (node.children.length === 2) {
      return [];
    } else {
      return this.evaluate(node.children[1]);
    }
  }
  ArgumentList(node) {
    if (node.children.length === 1) {
      let result = this.evaluate(node.children[0]);
      if (result instanceof Reference) {
        result = result.get();
      }
      return [result];
    } else {
      let result = this.evaluate(node.children[2]);
      if (result instanceof Reference) {
        result = result.get();
      }
      return this.evaluate(node.children[0]).concat(result);
    }
  }
  Block(node) {
    if (node.children.length === 2) {
      return;
    }
    // TODO: 外面嵌套里面的可以使用esc进行处理, 这里块级作用域没有生效,
    let runningEC = this.ecs[this.ecs.length - 1];
    let newEC = new ExecutionContext(
      runningEC.realm,
      new EnvironmentRecord(runningEC.lexicalEnvironment),
      runningEC.variableEnvironment
    );
    this.ecs.push(newEC);
    let result = this.evaluate(node.children[1]);
    this.ecs.pop(newEC);
    return result;
  }
  FunctionDeclaration(node) {
    let name = node.children[1].name;
    let code = node.children[node.children.length - 2];
    let func = new JSObject();
    func.call = (args) => {
      let newEC = new ExecutionContext(
        this.realm,
        new EnvironmentRecord(func.environment),
        new EnvironmentRecord(func.environment)
      );
      this.ecs.push(newEC);
      this.evaluate(code);
      this.ecs.pop();
    };
    let runningEC = this.ecs[this.ecs.length - 1];
    runningEC.lexicalEnvironment.add(name);
    runningEC.lexicalEnvironment.set(name, func);
    func.environment = runningEC.lexicalEnvironment;
    return new CompletionRecord("normal");
  }
  // EOF() {
  //   return null;
  // },
}
