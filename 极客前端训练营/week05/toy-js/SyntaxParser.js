import { scan } from "./LexerParser.js";

// 构建语法树
let syntax = {
  Program: [["StatementList", "EOF"]],
  StatementList: [["Statement"], ["StatementList", "Statement"]],
  Statement: [
    ["ExpressionStatement"],
    ["IfStatement"],
    ["VariableDeclaration"],
    ["FunctionDeclaration"],
  ],
  IfStatement: [["if", "(", "Expression", "Statement"]],
  VariableDeclaration: [
    ["var", "Identifier", ";"],
    ["let", "Identifier", ";"],
  ],
  FunctionDeclaration: [
    ["function", "Identifier", "(", ")", "{", "StatementList", "}"],
  ],
  ExpressionStatement: [["Expression", ";"]],
  Expression: [["AdditiveExpression"]],
  AdditiveExpression: [
    ["MultiplicativeExpression"],
    ["AdditiveExpression", "+", "MultiplicativeExpression"],
    ["AdditiveExpression", "-", "MultiplicativeExpression"],
  ],
  MultiplicativeExpression: [
    ["PrimaryExpression"],
    ["MultiplicativeExpression", "*", "MultiplicativeExpression"],
    ["MultiplicativeExpression", "/", "MultiplicativeExpression"],
  ],
  PrimaryExpression: [["(", "Expression", ")"], ["Literal"], ["Identifier"]],
  Literal: [
    ["Number"],
    ["String"],
    ["Boolean"],
    ["Null"],
    ["RegularExpression"],
  ],
};

let hash = {};

function closure(state) {
  hash[JSON.stringify(state)] = state;
  // 广度优先搜索
  let queue = [];
  for (let symbol in state) {
    if (symbol.match(/^\$/)) {
      return;
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
      return;
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

function parse(source) {
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

let evaluator = {
  Program(node) {
    return evaluate(node.children[0]);
  },
  StatementList(node) {
    // console.log(node);
    if (node.children.length == 1) {
      return evaluate(node.children[0]);
    } else {
      // TODO: 为什么return 后面，是根据标准来进行的
      evaluate(node.children[0]);
      return evaluate(node.children[1]);
    }
  },
  Statement(node) {
    return evaluate(node.children[0]);
  },
  VariableDeclaration(node) {
    console.log("Declaration variable", node.children[1].name);
  },
  EOF() {
    return null;
  },
};

// 执行语法树
function evaluate(node) {
  if (evaluator[node.type]) {
    return evaluator[node.type](node);
  }
}

// ------------------------ 用户执行 -------------------------- //

let source = `
  var a;
  var b;
`;
let tree = parse(source);

evaluate(tree);
