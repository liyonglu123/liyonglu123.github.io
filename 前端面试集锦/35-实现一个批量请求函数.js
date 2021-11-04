/**
 * https://juejin.cn/post/6916317088521027598
 * 实现一个批量请求的函数
 * 要求最大并发数 maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * 这当中使用了什么样的数据结构和算法
 * 场景： 现有 30 个异步请求需要发送，但由于某些原因，我们必须将同一时刻并发请求数量控制在 5 个以内，同时还要尽可能快速的拿到响应结果。
 */

// 使用Promise 封装一个图片加载
// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = url;
//     img.onload = function () {
//       console.log(url, "加载完成");
//       resolve(img);
//     };

//     img.onerror = function () {
//       reject(new Error("error at:" + url));
//     };
//   });
// }

// // 实现批量请求
// function multiRequest(urls, maxNum) {
//   const firstMaxNum = urls.splice(0, maxNum);
//   let promises = firstMaxNum.map((url, index) => {
//     return loadImg(url).then(() => {
//       return index;
//     });
//   });

//   return urls
//     .reduce((res, cur) => {
//       return res
//         .then(() => {
//           return Promise.race(promises);
//         })
//         .then((idx) => {
//           promises[idx] = loadImg(cur).then(() => {
//             return idx;
//           });
//         });
//     }, Promise.resolve())
//     .then(() => {
//       return Promise.all(promises);
//     });
// }

// const urls = [
//   "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
//   "https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg",
//   "https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg",
//   "https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg",
// ];
// multiRequest(urls, 4).then(() => {
//   console.logs("finish");
// });

// 串行
// let p = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("1000");
//       resolve();
//     }, 1000);
//   });
// };
// let p1 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("2000");
//       resolve();
//     }, 2000);
//   });
// };
// let p2 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("3000");
//       resolve();
//     }, 3000);
//   });
// };

// p()
//   .then(() => {
//     return p1();
//   })
//   .then(() => {
//     return p2();
//   })
//   .then(() => {
//     console.log("end");
//   });

// 并行
// Promise.all 可以做到， promises数组中所有的promise对象都达到resolve状态，才执行then回调
// let promises = function () {
//   return [1000, 2000, 3000].map((current) => {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => {
//         console.log(current);
//       }, current);
//     });
//   });
// };

// Promise.all(promises()).then(() => {
//   console.log("end");
// });

// 当promises 数组中的每个对象都是http请求的时候， 数量大，可能导致堆积了无数调用栈导致内存溢出，
// 如何给promise.all添加并发限制, 每个时刻并发执行的promises数量是固定的，最终的执行结果还是保持与原先的Promise.all 一致
// 思路分析：
// 整体采用递归调用来实现：最初发送的请求数量上限为允许的最大值，
// 并且这些请求中的每一个都应该在完成时继续递归发送，
// 通过传入的索引来确定了urls里面具体是那个URL，保证最后输出的顺序不会乱，而是依次输出。

function multiRequest(urls = [], maxNum) {
  // 请求总数
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求 maxNum 个
    while (count < maxNum) {
      next();
    }

    function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成，将promise设置为成功状态，然后result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成，递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成，递归
          if (current < len) {
            next();
          }
        });
    }
  });
}

// multiRequest([1, 2, 3], 2).then((res) => {
//   console.log(res);
// });

// ------ 方式三 -------
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;
  const handleRequest = (url) => {
    const req = fetch(url)
      .then((res) => {
        console.log("当前并发： " + requestsQueue);
        const len = results.push(res);
        if (len < urlCount && i + 1 < urlCount) {
          requestsQueue.shift();
          handleRequest(urls[++i]);
        } else if (len === urlCount) {
          "function" === typeof callback && callback(results);
        }
      })
      .catch((e) => {
        results.push(e);
      });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i]);
    }
  };
  handleRequest(urls[i]);
}

const urls = Array.from({ length: 10 }, (v, k) => k);

const fetch = function (idx) {
  return new Promise((resolve) => {
    console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      console.log(`end request ${idx}`);
      resolve(idx);
    }, timeout);
  });
};

const max = 4;

const callback = () => {
  console.log("run callback");
};

handleFetchQueue(urls, max, callback);
