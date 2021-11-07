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

let start = (point) => {
  console.log("start", point.clientX, point.clientY);
};
let move = (point) => {
  console.log("move", point.clientX, point.clientY);
};
let end = (point) => {
  console.log("end", point.clientX, point.clientY);
};
let cancel = (point) => {
  console.log("cancel", point.clientX, point.clientY);
};
