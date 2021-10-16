import { scan } from "./LexerParser.js";

// 构建语法树
let syntax = {
  Program: [["StatementList", "EOF"]],
  StatementList: [["Statement"], ["StatementList", "Statement"]],
  Statement: [
    ["ExpressionStatement"],
    ["IfStatement"],
    ["WhileStatement"],
    ["VariableDeclaration"],
    ["FunctionDeclaration"],
    ["Block"],
    ["BreakStatement"],
    ["ContinueStatement"],
  ],
  FunctionDeclaration: [
    ["function", "Identifier", "(", ")", "{", "StatementList", "}"],
  ],
  BreakStatement: [["break", ";"]],
  ContinueStatement: [["continue", ";"]],
  Block: [
    ["{", "StatementList", "}"],
    ["{", "}"],
  ],
  WhileStatement: [["while", "(", "Expression", ")", "Statement"]],
  IfStatement: [["if", "(", "Expression", ")", "Statement"]],
  VariableDeclaration: [
    // ["var", "Identifier", ";"],
    ["let", "Identifier", ";"],
  ],
  FunctionDeclaration: [
    ["function", "Identifier", "(", ")", "{", "StatementList", "}"],
  ],
  ExpressionStatement: [["Expression", ";"]],
  Expression: [["AssignmentExpression"]],
  // Identifier 变量
  AssignmentExpression: [
    ["LeftHandsSideExpression", "=", "LogicalORExpression"],
    ["LogicalORExpression"],
  ],
  // 逻辑运算
  LogicalORExpression: [
    ["LogicalANDExpression"],
    ["LogicalORExpression", "||", "LogicalANDExpression"],
  ],
  LogicalANDExpression: [
    ["AdditiveExpression"],
    ["LogicalANDExpression", "&&", "AdditiveExpression"],
  ],
  AdditiveExpression: [
    ["MultiplicativeExpression"],
    ["AdditiveExpression", "+", "MultiplicativeExpression"],
    ["AdditiveExpression", "-", "MultiplicativeExpression"],
  ],
  MultiplicativeExpression: [
    ["LeftHandsSideExpression"],
    ["MultiplicativeExpression", "*", "LeftHandsSideExpression"],
    ["MultiplicativeExpression", "/", "LeftHandsSideExpression"],
  ],
  LeftHandsSideExpression: [["CallExpression"], ["NewExpression"]],
  CallExpression: [
    ["MemberExpression", "Arguments"],
    ["CallExpression", "Arguments"],
  ], // new a()
  Arguments: [
    ["(", ")"],
    ["(", "ArgumentList", ")"],
  ],
  ArgumentList: [
    ["AssignmentExpression"],
    ["ArgumentList", ",", "AssignmentExpression"],
  ],
  NewExpression: [["MemberExpression"], ["new", "NewExpression"]], // new a
  MemberExpression: [
    ["PrimaryExpression"],
    ["PrimaryExpression", ".", "Identifier"],
    ["PrimaryExpression", "[", "Expression", "]"],
  ], // new a.b()
  // example: new f().a().a
  PrimaryExpression: [["(", "Expression", ")"], ["Literal"], ["Identifier"]],
  Literal: [
    ["NumberLiteral"],
    ["StringLiteral"],
    ["BooleanLiteral"],
    ["NullLiteral"],
    ["RegularExpressionLiteral"],
    ["ObjectLiteral"],
    ["ArrayLiteral"],
  ],
  ObjectLiteral: [
    ["{", "}"],
    ["{", "PropertyList", "}"],
  ],
  PropertyList: [["Property"], ["PropertyList", ",", "Property"]],
  Property: [
    ["StringLiteral", ":", "AdditiveExpression"],
    ["Identifier", ":", "AdditiveExpression"],
  ],
};

let hash = {};

function closure(state) {
  hash[JSON.stringify(state)] = state;
  // 广度优先搜索
  let queue = [];
  for (let symbol in state) {
    if (symbol.match(/^\$/)) {
      continue;
    }
    queue.push(symbol);
  }
  while (queue.length) {
    let symbol = queue.shift();
    // console.log(symbol);
    // 终结符不会出现在语法树中的
    if (syntax[symbol]) {
      for (let rule of syntax[symbol]) {
        // console.log(state, rule[0]);
        if (!state[rule[0]]) {
          queue.push(rule[0]);
        }
        // state[rule[0]] = true;
        let current = state;
        for (let part of rule) {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
        current.$reduceType = symbol;
        current.$reduceLength = rule.length;
        // console.log("current==", current, current.$reduceType);
      }
    }
  }
  // 递归调用展开每一层, 存在递归调用自身的问题-》 使用hash进行处理
  for (let symbol in state) {
    if (symbol.match(/^\$/)) {
      continue;
    }
    if (hash[JSON.stringify(state[symbol])]) {
      state[symbol] = hash[JSON.stringify(state[symbol])];
    } else {
      closure(state[symbol]);
    }
  }
}

let end = {
  $isEnd: true,
};

let start = {
  Program: end,
};

closure(start);

export function parse(source) {
  // let state = start;
  // console.log(start);
  let stack = [start];
  let symbolStack = [];
  function reduce() {
    let state = stack[stack.length - 1];
    // console.log("reduceType--", state.$reduceType);
    if (state.$reduceType) {
      let children = [];
      // state = state.$redeState;
      for (let i = 0; i < state.$reduceLength; i++) {
        stack.pop();
        children.push(symbolStack.pop());
      }
      // create a non-terminal symbol and shift it
      return {
        type: state.$reduceType,
        children: children.reverse(),
      };
    } else {
      throw new Error("unexpected token");
    }
  }

  function shift(symbol) {
    let state = stack[stack.length - 1];
    if (symbol.type in state) {
      stack.push(state[symbol.type]);
      symbolStack.push(symbol);
      // state = state[symbol.type];
    } else {
      // reduce to not-terminal symbols
      shift(reduce());
      shift(symbol);
    }
  }

  for (let symbol /** 终结符 */ of scan(source)) {
    shift(symbol);
    // console.log(symbol);
  }
  return reduce();
  // console.log(reduce());
}

// ------------------------ 用户执行 -------------------------- //

// let source = `
//   "ab\\tc";
// `;
// let tree = parse(source);

// evaluate(tree);

// window.js = {
//   evaluate,
//   parse,
// };
