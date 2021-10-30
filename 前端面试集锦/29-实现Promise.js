/**
 * 实现Promise,  https://juejin.cn/post/6844903625769091079，  https://juejin.cn/post/6850037281206566919
 * Promise面试常用点
 * 1. Promise解决了什么问题 --- 异步请求的回调地狱问题，处理多个异步请求并发
 * 2. Promise的业界实现有哪些 --- bluebird,Q,ES6-Promise
 * 3. Promise常用的API有哪些 --- then, catch, all， race, resolve, reject
 * 4. 能不能手写一个符合Promise/A+规范的Promise --- 能
 * 5. Promise 在事件循环中的执行过程是怎样的 --- 微任务
 * 6. Promise 有什么缺陷，可以如何解决 -- 因为Promise 是没有中断方法的，xhr.abort()、ajax 有自己的中断方法，axios 是基于 ajax 实现的；fetch 基于 promise，所以他的请求是无法中断的。
 */

/**
 * Promise的基本特征 A+
 * 1. promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
 * 2. new promise时， 需要传递一个executor()执行器，执行器立即执行；
 * 3. executor接受两个参数，分别是resolve和reject；
 * 4. promise  的默认状态是 pending；
 * 5. promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
 * 6. promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
 * 7. promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
 * 8. promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
 * 9. 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
 * 10. 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
 * 11. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
 */

// 三种状态
// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";
// class Promise {
//   constructor(executor) {
//     // 默认状态为pending
//     this.status = PENDING;
//     // 存放成功状态的值，默认值是undefined
//     this.value = undefined;
//     // 存放失败状态的值，默认值是undefined
//     this.reason = undefined;

//     // 成功调用
//     let resolve = (value) => {
//       // 状态是pending的时候才可以更新状态，防止executor中调用两次 resolve/reject 方法
//       if (this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = value;
//       }
//     };

//     // 失败调用
//     let reject = (reason) => {
//       // 状态是pending的时候才可以更新状态，防止executor中调用两次 resolve/reject 方法
//       if (this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = reason;
//       }
//     };

//     try {
//       // 立即执行，将resolve 和 reject 函数传给使用者
//       executor(resolve, reject);
//     } catch (error) {
//       // 发生异常是执行失败逻辑
//       reject(error);
//     }
//   }

//   // 包含一个then方法，并接收两个参数 onFulfilled, onRejected
//   then(onFulfilled, onRejected) {
//     if (this.status === FULFILLED) {
//       onFulfilled(this.value);
//     }
//     if (this.status === REJECTED) {
//       onRejected(this.reason);
//     }
//   }
// }

// 测试：
//  ---- 同步操作 ----
// const promise = new Promise((resolve, reject) => {
//   resolve("成功");
// }).then(
//   (data) => {
//     console.log("success", data);
//   },
//   (err) => {
//     console.log("failed", err);
//   }
// ); // "success 成功"

// ---- 异步操作 ----

// 三种状态
// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";
// class Promise {
//   constructor(executor) {
//     this.status = PENDING;
//     this.value = undefined;
//     this.reason = undefined;

//     // 存放成功的回调
//     this.onResolvedCallbacks = [];
//     // 存放失败的回调
//     this.onRejectedCallbacks = [];

//     let resolve = (value) => {
//       if (this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = value;
//         // 依次执行对应的函数
//         this.onResolvedCallbacks.forEach((fn) => fn());
//       }
//     };

//     let reject = (reason) => {
//       if (this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = reason;
//         // 依次执行对应的函数
//         this.onRejectedCallbacks.forEach((fn) => fn());
//       }
//     };

//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     if (this.status === PENDING) {
//       // 如果Promise的状态是pending，需要将onFulfilled 和 onRejected 函数存放起来，等待状态确认后，在依次将对应的函数执行
//       this.onResolvedCallbacks.push(() => {
//         onFulfilled(this.value);
//       });
//       this.onRejectedCallbacks.push(() => {
//         onRejected(this.reason);
//       });
//     }
//     if (this.status === FULFILLED) {
//       onFulfilled(this.value);
//     }
//     if (this.status === REJECTED) {
//       onRejected(this.reason);
//     }
//   }
// }

// 使用到发布订阅模式 ----- 下面代码没有执行结构，但是当resolve在setTomeout内执行，then时status还是pending等待状态 我们就需要在then调用的时候，
// 将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
// const promise = new Promise((resolve, reject) => {
//   // 传入一个异步操作
//   setTimeout(() => {
//     resolve("成功");
//   }, 1000);
// }).then(
//   (data) => {
//     console.log("success", data);
//   },
//   (err) => {
//     console.log("failed", err);
//   }
// );

// ----- 链式调用和值的穿透 ----
/**
 * 规范：
 * 1. then 的参数 onFulfilled 和 onRejected 可以缺省，如果 onFulfilled 或者 onRejected不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
 * 2. promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
 * 3. 如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
 * 4. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
 * 5. 如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
 * 6. 如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
 * 7. 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 只能调用依次
  let called;
  // 条件要严格判断，保证代码和别的库一起使用
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject了（比如 reject 和 resolve 同时调用的时候）
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成x.then, 直接 then.call 就可以了， 因为x.then 会再次取值，Object.defineProperty
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能Promise 中还有 Pomise）
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x.then 是个普通值就直接返回 resolve 作为结果
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      // promise.resolve 是具备等待功能的。如果参数是 promise 会等待这个 promise 解析完毕，在向下执行
      // 如果 value 是一个 promise, 那么我们的库中应该也实现一个递归解析
      if (value instanceof Promise) {
        // 递归解析
        return value.then(resolve, reject);
      }

      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 解决 onFulfilled onRejected 没有传值得问题
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    // 因为错误的值要让后面访问到，所以这里也要抛出个错误，不然之后的 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 Promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          // 规定必须异步调用 , 如果你想实现 promise 的微任务，可以 mutationObserver 替代 seiTimeout 来实现微任务。
          try {
            let x = onFulfilled(this.value);
            // x 可能是一个Promise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  // finally 表示不是最终的意思，而是无论如何都会执行的意思。
  // 如果返回一个 promise 会等待这个 promise 也执行完毕。如果返回的是成功的 promise，会采用上一次的结果；
  // 如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中
  finally(callback) {
    return this.then(
      (value) => {
        return Promise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return Promise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  // 静态方法
  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  // promise.all 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败）
  static all(values) {
    if (!Array.isArray(values)) {
      const type = typeof values;
      return new TypeError(`TypeError: ${type} ${values} is not iterable`);
    }

    return new Promise((resolve, reject) => {
      let resultArr = [];
      let orderIndex = 0;
      const processResultByKey = (value, index) => {
        resultArr[index] = value;
        if (++orderIndex === values.length) {
          resolve(resultArr);
        }
      };
      for (let i = 0; i < values.length; i++) {
        let value = values[i];
        if (value && typeof value.then === "function") {
          value.then((value) => {
            processResultByKey(value, i);
          }, reject);
        } else {
          processResultByKey(value, i);
        }
      }
    });
  }

  // Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）。
  static race(promises) {
    return new Promise((resolve, reject) => {
      // 一起执行
      for (let i = 0; i < promises.length; i++) {
        let val = promises[i];
        if (val && typeof val.then === "function") {
          val.then(resolve, reject);
        } else {
          // 普通值
          resolve(val);
        }
      }
    });
  }
}

// 测试

// const promise = new Promise((resolve, reject) => {
//   reject("失败");
// })
//   .then()
//   .then()
//   .then(
//     (data) => {
//       console.log(data);
//     },
//     (err) => {
//       console.log("err", err);
//     }
//   ); // err 失败

// 测试Promise 是否符合规范
// TypeError: adapter.deferred is not a function https://juejin.cn/post/6950476727382441998
// Promise.defer = Promise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };

// 测试 Promise.resolve

// Promise.resolve(
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("错误");
//     }, 3000);
//   })
// )
//   .then((data) => {
//     console.log(data, "success");
//   })
//   .catch((err) => {
//     console.log(err, "error");
//   });

// 测试 finall
// Promise.resolve(456)
//   .finally(() => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // resolve(123);
//         reject(123);
//       }, 3000);
//     });
//   })
//   .then((data) => {
//     console.log(data, "success");
//   })
//   .catch((err) => {
//     console.log(err, "error");
//   });

// 测试 all
// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("ok1");
//   }, 1000);
// });

// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("ok2");
//   }, 1000);
// });

// Promise.all([1, 2, 3, p1, p2]).then(
//   (data) => {
//     console.log("resolve", data);
//   },
//   (err) => {
//     console.log("reject", err);
//   }
// ); // "resolve [ 1, 2, 3, 'ok1', 'ok2' ]"

// 缺陷： 因为Promise 是没有中断方法的，xhr.abort()、ajax 有自己的中断方法，
// axios 是基于 ajax 实现的；fetch 基于 promise，所以他的请求是无法中断的。
// 使用 race 来自己封装中断的方法
function wrap(promise) {
  // 包装一个 Promise， 可以控制原理的 Promise 是成功还是失败
  let abort;
  let newPromise = new Promise((resolve, reject) => {
    // defer 方法
    abort = reject;
  });
  let p = Promise.race([promise, newPromise]); // 任何一个先成功或者失败， 就可以获取到结果
  p.abort = abort;
  return p;
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟的接口调用 ajax 肯定有超时设置
    resolve("成功");
  }, 4000);
});

let newPromise = wrap(promise);
setTimeout(() => {
  // 超过3秒 就算超时 应该让 proimise 走到失败态
  newPromise.abort("超时了");
}, 3000);

newPromise
  .then((data) => {
    console.log("成功的结果" + data);
  })
  .catch((e) => {
    console.log("失败的结果" + e);
  });
