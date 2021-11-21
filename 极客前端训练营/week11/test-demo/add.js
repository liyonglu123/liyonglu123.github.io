// mocha --require @babel/register 找不到全局的问题
// ./node_modules/.bin/mocha --requrie @babel/register 报错找不到需要转化的格式 config
// .babelrc   ----->  @babel/preset-env
export function add(a, b) {
  return a + b;
}

// module.exports = add;
