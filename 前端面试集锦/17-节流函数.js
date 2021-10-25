/**
 * 节流函数 throttle
 * 特点：在一定单位时间内，只触发一次函数，如果在这个单位时间内触发多次函数，只有一个生效
 * 节流中在加锁 flag
 * 场景：scroll滚动事件，每隔特点描述执行函数
 *      拖拽 --- 比如每个100ms触发一次
 */

const throttle = function (fn, delay) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

const throttle = function (fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

throttle(fn, 300);
