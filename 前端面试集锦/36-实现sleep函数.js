/**
 * 实现一个sleep函数
 * 比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现。
 */

// ES5
function sleep(callback, time) {
  if (typeof callback === "function") {
    setTimeout(callback, time);
  }
}

function output() {
  console.log("es5");
}

sleep(output, 1000);
// promise
// const sleep = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, time);
//   });
// };

// sleep(1000).then(() => {
//   console.log("promise");
// });

// Generator
// function* sleepGenerator(time) {
//   yield new Promise(function (resolve, reject) {
//     setTimeout(resolve, time);
//   });
// }

// sleepGenerator(1000)
//   .next()
//   .value.then(() => {
//     console.log("sleepGenerator");
//   });

// async await

// function sleep(time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, time);
//   });
// }

// async function output() {
//   let out = await sleep(1000);
//   console.log("async");
//   return out;
// }

// output();
