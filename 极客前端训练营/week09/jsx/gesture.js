let element = document.documentElement;
let contexts = new Map();
let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
  //   console.log(event.button);
  let context = Object.create(null);
  contexts.set("mouse" + (1 << event.button), context);
  start(event, context);
  let mousemove = (event) => {
    // TODO: event.buttons 掩码 ob11111, 5种类型
    let button = 1;
    while (button <= event.buttons) {
      if (button & event.buttons) {
        // order of buttons  & button property in not same
        let key;
        if (button === 2) {
          key === 4;
        } else if (button === 4) {
          key === 2;
        } else {
          key = button;
        }
        let context = contexts.get("mouse" + button);
        move(event, context);
      }
      button = button << 1;
    }
    // console.log(event.clientX, event.clientY);
  };
  let mouseup = (event) => {
    console.log("end", event.button);
    let context = contexts.get("mouse" + (1 << event.button));
    end(event, context);
    contexts.delete("mouse" + (1 << event.button));

    if (event.buttons === 0) {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }
  };
  if (!isListeningMouse) {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }
});

// 触屏事件, 各有一个唯一标识符 identifier
element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});
element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
});
element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch, context);
    contexts.delete(touch.identifier);
  }
});

// settimeout - alert 可以进行打断
element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch, context);
    contexts.delete(touch.identifier);
  }
});

let handler;
let startX, startY;
let isPan = false;
let isTap = true;
let isPress = false;
let start = (point, context) => {
  //   console.log("start", point.clientX, point.clientY);
  context.startX = point.clientX;
  context.startY = point.clientY;
  // 存储点， 用于速度计算，平均值
  context.points = [{ t: Date.now(), x: point.clientX, y: point.clientY }];
  context.isTap = true;
  context.isPan = false;
  context.isPress = false;
  context.handler = setTimeout(() => {
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.handler = null;
    console.log("presss");
  }, 500);
};
let move = (point, context) => {
  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;
  // 移动了 10 px
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log("panstart");
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log(dx, dy);
    console.log("pan");
  }
  // 过滤, 只存取半秒内的点
  context.points = context.points.filter((point) => Date.now() - point.t < 500);
  context.points.push({ t: Date.now(), x: point.clientX, y: point.clientY });
  //   console.log("move", point.clientX, point.clientY);
};
let end = (point, context) => {
  if (context.isTap) {
    // console.log("tap");
    dispatch("tap", {});
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log("panend");
  }
  if (context.isPress) {
    console.log("pressend");
  }
  context.points = context.points.filter((point) => Date.now() - point.t < 500);
  let d, v;
  if (!context.points.length) {
    v = 0;
  } else {
    // console.log(context, context.points);
    d = Math.sqrt(
      (point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2
    );
    v = d / (Date.now() - context.points[0].t);
  }
  if (v > 1.5) {
    console.log("flick");
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }

  console.log(v);
  //   console.log("end", point.clientX, point.clientY);
};
let cancel = (point, context) => {
  clearTimeout(context.handler);
  //   console.log("cancel", point.clientX, point.clientY);
};

// 派发事件
function dispatch(type, properties) {
  let event = new Event(type);
  //   console.log(event);
  for (let name in properties) {
    event[name] = properties[name];
  }
  element.dispatchEvent(event);
}
