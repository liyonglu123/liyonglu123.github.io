// 常见的动画帧方法
// setInterval(() => {}, 16);

import { linear } from "./ease";

// let tick = () => {
//   setTimeout(tick, 16);
// };

// let tick = () => {
//   let handle = requestAnimationFrame(tick);
//   //   cancelAnimationFrame(handle)
// };
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    this.state = "inited";
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
  }

  start() {
    if (this.state !== "inited") {
      return;
    }
    this.state = "started";
    let startTime = Date.now();
    // 开始时间为0
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      // console.log("tick");
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        let t;
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        } else {
          t =
            now -
            this[START_TIME].get(animation) -
            this[PAUSE_TIME] -
            animation.delay;
        }
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation);
          t = animation.duration;
        }
        if (t > 0) {
          animation.receive(t);
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }
  //   set rate(v) {}
  //   get rate() {}
  pause() {
    if (this.state !== "started") {
      return;
    }
    this.state = "paused";
    // 暂停
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "started";
    // 重启
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }
  reset() {
    this.pause();
    this.state = "inited";
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[TICK_HANDLER] = null;
    this[PAUSE_START] = 0;
  }
  // 如何添加delay
  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now();
    }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

// 属性动画（对号）， 帧动画
export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timingFunction,
    template
  ) {
    timingFunction = timingFunction || ((v) => v);
    template = template || ((v) => v);
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction; // 0-1
    this.template = template;
  }
  receive(time) {
    // console.log(time);
    let range = this.endValue - this.startValue;
    let progress = this.timingFunction(time / this.duration);
    this.object[this.property] = this.template(
      this.startValue + range * progress
    );
  }
}
