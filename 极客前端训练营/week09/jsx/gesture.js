let element = document.documentElement;

element.addEventListener("mousedown", (event) => {
  start(event);
  let mousemove = (event) => {
    // console.log(event.clientX, event.clientY);
    move(event);
  };
  let mouseup = (event) => {
    end(event);
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup);
  };
  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
});

// 触屏事件, 各有一个唯一标识符 identifier
element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    start(touch);
  }
});
element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    move(touch);
  }
});
element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    end(touch);
  }
});

// settimeout - alert 可以进行打断
element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    cancel(touch);
  }
});

let handler;
let startX, startY;
let isPan = false;
let isTap = true;
let isPress = false;
let start = (point) => {
  //   console.log("start", point.clientX, point.clientY);
  startX = point.clientX;
  startY = point.clientY;
  isTap = true;
  isPan = false;
  isPress = false;
  handler = setTimeout(() => {
    isTap = false;
    isPan = false;
    isPress = true;
    handler = null;
    console.log("presss");
  }, 500);
};
let move = (point) => {
  let dx = point.clientX - startX;
  let dy = point.clientY - startY;
  // 移动了 10 px
  if (!isPan && dx ** 2 + dy ** 2 > 100) {
    isTap = false;
    isPan = true;
    isPress = false;
    console.log("panstart");
    clearTimeout(handler);
  }
  if (isPan) {
    console.log(dx, dy);
    console.log("pan");
  }
  //   console.log("move", point.clientX, point.clientY);
};
let end = (point) => {
  if (isTap) {
    console.log("tap");
    clearTimeout(handler);
  }
  if (isPan) {
    console.log("panend");
  }
  if (isPress) {
    console.log("pressend");
  }
  //   console.log("end", point.clientX, point.clientY);
};
let cancel = (point) => {
  clearTimeout(handler);
  //   console.log("cancel", point.clientX, point.clientY);
};
