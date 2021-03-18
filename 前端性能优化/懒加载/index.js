function limitLoad(urls, handlers, limit) {
  const sequence = [].concat(urls); //拷贝另一个数组
  let promises = [];
  promises = sequence.splice(0, limit).map((url, index) => {
    return handlers(url).then(() => {
      return index;
    });
  });
  let p = Promise.race(promises);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promises[res] = handlers(sequence[i]).then(() => {
        return res;
      });
      return Promise.race(promises);
    });
  }
  //链式调用
}
const urls = [
  {
    time: 1000,
    info: "link1",
  },
  {
    time: 1000,
    info: "link2",
  },
  {
    time: 1000,
    info: "link3",
  },
  {
    time: 1000,
    info: "link4",
  },
  {
    time: 1000,
    info: "link5",
  },
  {
    time: 1000,
    info: "link6",
  },
  {
    time: 1000,
    info: "link7",
  },
  {
    time: 1000,
    info: "link8",
  },
  {
    time: 1000,
    info: "link9",
  },
  {
    time: 1000,
    info: "link10",
  },
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("----" + url.info + "start!");
    setTimeout(() => {
      console.log(url.info + "ok!");
      resolve();
    }, url.time);
  });
}
limitLoad(urls, loadImg, 3);
//目的：为了实现限制同时加载的只有3个图片，如果一个加载完成，则立即引入下一个
//不能.all 原因：是等3个同时加载完成，不是某一个加载完成并填补空缺
