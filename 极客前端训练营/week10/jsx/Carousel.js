import { Component, STATE, ATTRIBUTE } from "./framework.js";
import { enableGesture } from "./gesture.js";
import { Timeline, Animation } from "./animation.js";
import { ease } from "./ease.js";

export { STATE, ATTRIBUTE } from "./framework.js";
console.log(STATE);

export class Carousel extends Component {
  constructor() {
    super();
    // this.attributes = Object.create(null);
  }
  // setAttribute(name, value) {
  //   this.attributes[name] = value;
  // }
  render() {
    // console.log(this.attributes.src);
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (let record of this[ATTRIBUTE].src) {
      // 使用img 会产生拖拽的效果
      // let child = document.createElement("img");
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record.img}')`;
      this.root.appendChild(child);
    }

    // 添加手势
    enableGesture(this.root);

    // 添加时间线
    let timeline = new Timeline();
    timeline.start();

    let handler = null;

    let children = this.root.children;
    // let position = 0;
    this[STATE].position = 0;

    let t = 0;
    let ax = 0;

    this.root.addEventListener("start", (event) => {
      timeline.pause();
      clearInterval(handler);

      if (Date.now() - t < 1500) {
        let progress = (Date.now() - t) / 1500;
        ax = ease(progress) * 500 - 500;
      } else {
        ax = 0;
      }
    });

    // 点击事件
    this.root.addEventListener("tap", (event) => {
      this.triggerEvent("click", {
        position: this[STATE].position,
        data: this[ATTRIBUTE].src[this[STATE].position],
      });
    });

    this.root.addEventListener("pan", (event) => {
      // console.log(event.clientX);
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;
        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${
          -pos * 500 + offset * 500 + (x % 500)
        }px)`;
      }
    });

    this.root.addEventListener("end", (event) => {
      timeline.reset();
      timeline.start();
      handler = setInterval(nextPicture, 2000);

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;

      let direction = Math.round((x % 500) / 500);

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
        // console.log(event.velocity);
      }
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;
        children[pos].style.transition = "none";
        // children[pos].style.transform = `translateX(${
        //   -pos * 500 + offset * 500 + (x % 500)
        // }px)`;

        timeline.add(
          new Animation(
            children[pos].style,
            "transform",
            -pos * 500 + offset * 500 + (x % 500),
            -pos * 500 + offset * 500 + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          )
        );
      }
      this[STATE].position =
        this[STATE].position - (x - (x % 500)) / 500 - direction;
      // 有可能是负的变为正数
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length;
      this.triggerEvent("change", { position: this[STATE].position });
    });

    let nextPicture = () => {
      let children = this.root.children;
      // 取余的技巧
      let nextIndex = (this[STATE].position + 1) % children.length;
      // 添加两张图片
      let current = children[this[STATE].position];
      let next = children[nextIndex];

      t = Date.now();
      // next.style.transition = "none";
      // next.style.transform = `translateX(${500 - nextIndex * 500}px)`;
      timeline.add(
        new Animation(
          current.style,
          "transform",
          -this[STATE].position * 500,
          -500 - this[STATE].position * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      );
      timeline.add(
        new Animation(
          next.style,
          "transform",
          500 - nextIndex * 500,
          -nextIndex * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      );
      this[STATE].position = nextIndex;
      // 触发事件
      this.triggerEvent("change", { position: this[STATE].position });
    };

    handler = setInterval(nextPicture, 2000);

    // this.root.addEventListener("mousedown", (event) => {
    //   let children = this.root.children;
    //   // clientX, clientY 的好处不受影响， 对比其他的距离问题
    //   let startX = event.clientX;
    //   // let startY = event.clientY;
    //   let move = (event) => {
    // let x = event.clientX - startX;
    // // let y = event.clientY - startY;
    // // console.log(x);
    // let current = position - (x - (x % 500)) / 500;
    // for (let offset of [-1, 0, 1]) {
    //   let pos = current + offset;
    //   pos = (pos + children.length) % children.length;
    //   children[pos].style.transition = "none";
    //   children[pos].style.transform = `translateX(${
    //     -pos * 500 + offset * 500 + (x % 500)
    //   }px)`;
    // }
    //     // for (let child of children) {
    //     //   child.style.transition = "none";
    //     //   child.style.transform = `translateX(${-position * 500 + x}px)`;
    //     // }
    //   };
    //   let up = (event) => {
    //     // console.log("mouseup");
    //     let x = event.clientX - startX;
    //     position = position - Math.round(x / 500);
    //     // for (let child of children) {
    //     //   child.style.transition = "";
    //     //   child.style.transform = `translateX(${-position * 500}px)`;
    //     // }
    //     // z-index的关系会有飞跃的问题
    // for (let offset of [
    //   0,
    //   -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x)),
    // ]) {
    //   let pos = position + offset;
    //   pos = (pos + children.length) % children.length;
    //   children[pos].style.transition = "";
    //   children[pos].style.transform = `translateX(${
    //     -pos * 500 + offset * 500
    //   }px)`;
    // }
    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //   };
    //   document.addEventListener("mousemove", move);
    //   document.addEventListener("mouseup", up);
    // });

    // let currentIndex = 0;
    // setInterval(() => {
    //   let children = this.root.children;
    //   // 取余的技巧
    //   let nextIndex = (currentIndex + 1) % children.length;
    //   // 添加两张图片
    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = "none";
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

    //   // 为什么不能使用requestAnimationFrame, 这里需要使用2次进行实现
    //   setTimeout(() => {
    //     next.style.transition = "";
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`;
    //     currentIndex = nextIndex;
    //   }, 16);

    //   for (let child of children) {
    //     child.style.transform = `translateX(-${current * 100}%)`;
    //   }
    // }, 1000);
    return this.root;
  }
  // mountTo(parent) {
  //   parent.appendChild(this.render());
  // }
}
