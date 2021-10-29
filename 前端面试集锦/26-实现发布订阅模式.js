/**
 * 发布订阅模式
 * 分为两个部分： on， emit 发布和订阅之间没有依赖关系，发布者告诉第三方（事件中心）发生了改变
 * 第三方再通知订阅者发生了改变
 * 例子：node中的EventEmitter, Vue中的$on, $emit
 * 实现思路：
 * 1. 创建一个对象
 * 2. 在该对象上创建一个缓存列表（调度中心）
 * 3. on方法用来把函数fn都添加到缓存列表中（订阅者注册事件到调度中心）
 * 4. emit方法取到arguments里的第一个当做event，根据event值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理相关逻辑）
 * 5. off方法可以根据event值取消订阅（取消订阅）
 * 6. once方法只监听一次，调用完毕之后删除缓存函数（订阅一次）
 */

// 公众号对象
class EventEmitter {
  constructor() {
    // 缓存列表 {{click: [fn1, fn2], change: [fn1]}}
    this.list = {};
  }

  // 订阅事件
  on(event, fn) {
    // 如果对象中没有对应的event值，表示没有订阅过，就给event创建个缓存列表。
    // 如果有对应的event值，把fn添加到对应event的缓存列表中
    (this.list[event] || (this.list[event] = [])).push(fn);
    return this;
  }

  // 发布事件
  emit() {
    // 第一个参数对应的是event值
    let event = [].shift.call(arguments);
    let fns = [...this.list[event]];
    // 如果缓存列表中没有fn，返回false
    if (!fns || fns.length === 0) {
      return false;
    }
    // 遍历event值对应缓存列表，依次执行fn
    fns.forEach((fn) => {
      fn.apply(this, arguments);
    });
    return this;
  }

  // 订阅一次
  once(event, fn) {
    // 先进行绑定，调用后删除
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  }

  // 取消订阅
  off(event, fn) {
    let fns = this.list[event];
    // 如果缓存列表中没有对应的fn，返回false
    if (!fns || fns.length === 0) {
      return false;
    }
    if (!fn) {
      // 如果没有传fn的话，就会将event值对应的缓存列表中的fn都清空
      fns && (fns.length = 0);
    } else {
      // 如果有fn, 则遍历缓存列表，看看传入的fn与那个函数相同，如果相同就直接从缓存列表中删除极即可
      let cb;
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i];
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    }
    return this;
  }
}

function user1(content) {
  console.log("用户1订阅了:", content);
}

function user2(content) {
  console.log("用户2订阅了:", content);
}

function user3(content) {
  console.log("用户3订阅了:", content);
}

function user4(content) {
  console.log("用户4订阅了一次:", content);
}

// 调度中心
var eventEmitter = new EventEmitter();

// 订阅
eventEmitter.on("article1", user1);
eventEmitter.on("article1", user2);
eventEmitter.on("article1", user3);

// 取消user2方法的订阅
eventEmitter.off("article1", user2);

// user4只订阅了一次
eventEmitter.once("article2", user4);

// 发布
eventEmitter.emit("article1", "js-发布-订阅模式");
eventEmitter.emit("article1", "js-发布-订阅模式");
eventEmitter.emit("article2", "js");
eventEmitter.emit("article2", "js");

// 支持链式调用
// eventEmitter.on("article", user3).emit("article", "测试链式调用");
eventEmitter
  .on("article", user3)
  .off("article", user3)
  .emit("article", "测试链式调用");
