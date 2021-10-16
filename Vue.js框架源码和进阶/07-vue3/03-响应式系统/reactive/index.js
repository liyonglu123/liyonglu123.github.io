const isObject = (val) => val !== null && typeof val === "object";
const convert = (target) => (isObject(target) ? reactive(target) : target);
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
/**
 * 1. 接收一个参数，判断这参数是否是对象
 * 2. 创建拦截器对象 handler，设置 get/set/deleteProperty
 * 3. 返回 Proxy 对象
 * @param {*} target
 */
export function reactive(target) {
  if (!isObject(target)) return target;

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      console.log("get", key);
      const result = Reflect.get(target, key, receiver);
      return convert(result);
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      let result = true;
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver);
        // 触发更新
        console.log("set", key, value);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hasKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hasKey && result) {
        // 触发更新
        console.log("delete", key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}
