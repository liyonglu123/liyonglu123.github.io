// 派发事件
export class Dispatcher {
  constructor(element) {
    this.element = element;
  }

  dispatch(type, properties) {
    let event = new Event(type);
    //   console.log(event);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

// listen => recognize => dispatch 监听，识别，分发
// new Listener(new Recognizer(dispatch))
export class Listener {
  constructor(element, recognizer) {
    let contexts = new Map();
    let isListeningMouse = false;

    element.addEventListener("mousedown", (event) => {
      //   console.log(event.button);
      let context = Object.create(null);
      contexts.set("mouse" + (1 << event.button), context);
      recognizer.start(event, context);
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
            recognizer.move(event, context);
          }
          button = button << 1;
        }
        // console.log(event.clientX, event.clientY);
      };
      let mouseup = (event) => {
        // console.log("end", event.button);
        let context = contexts.get("mouse" + (1 << event.button));
        recognizer.end(event, context);
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
        recognizer.start(touch, context);
      }
    });
    element.addEventListener("touchmove", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.move(touch, context);
      }
    });
    element.addEventListener("touchend", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });

    // settimeout - alert 可以进行打断
    element.addEventListener("touchcancel", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  start(point, context) {
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
      //   console.log("presss");
      this.dispatcher.dispatch("press", {});
    }, 500);
  }
  move(point, context) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    // 移动了 10 px
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      //   console.log("panstart");
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
      clearTimeout(context.handler);
    }
    if (context.isPan) {
      //   console.log(dx, dy);
      //   console.log("pan");
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
    }
    // 过滤, 只存取半秒内的点
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    );
    context.points.push({ t: Date.now(), x: point.clientX, y: point.clientY });
    //   console.log("move", point.clientX, point.clientY);
  }
  end(point, context) {
    if (context.isTap) {
      // console.log("tap");
      this.dispatcher.dispatch("tap", {});
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      //   console.log("pressend");
      this.dispatcher.dispatch("pressend", {});
    }
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    );
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
      //   console.log("flick");
      context.isFlick = true;
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      });
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      //   console.log("panend");
      this.dispatcher.dispatch("panend", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      });
    }

    // console.log(v);
    //   console.log("end", point.clientX, point.clientY);
  }
  cancel(point, context) {
    clearTimeout(context.handler);
    this.dispatcher.dispatch("cancel", {});
    //   console.log("cancel", point.clientX, point.clientY);
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}
