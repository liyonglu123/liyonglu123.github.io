/**
 * 防抖函数 debounce
 * 特点：在事件被触发N秒后再执行回调，如果在n秒内又被触发，则重新计时
 * 防抖重在清零 clearTimeout(timer)
 * 场景：浏览器resize过于频繁
 *      登录，发短信等按钮避免多次发送请求
 *      文本编辑器实时保存
 *      input, change等频繁触发的事件
 */

const debounce = function (fn, delay) {
  // timer是在闭包中
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
