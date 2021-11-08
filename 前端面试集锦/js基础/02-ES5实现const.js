/**
 * es5环境下实现const
 * Object.defineProperty(obj, prop, desc) 属性描述符的控制
 */

function _const(key, value) {
  const desc = {
    value,
    writable: false,
  };
  Object.defineProperty(window, key, desc);
}

_const("obj", { a: 1 }); // 定义obj

obj.b = 2; // 可以正常给obj的属性赋值
obj = {}; // 无法赋值新对象
