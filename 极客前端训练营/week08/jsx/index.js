import { Component, createElement } from "./framework.js";
class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    // console.log(this.attributes.src);
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (let record of this.attributes.src) {
      // 使用img 会产生拖拽的效果
      // let child = document.createElement("img");
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }

    let position = 0;
    this.root.addEventListener("mousedown", (event) => {
      let children = this.root.children;
      // clientX, clientY 的好处不受影响， 对比其他的距离问题
      let startX = event.clientX;
      // let startY = event.clientY;
      let move = (event) => {
        let x = event.clientX - startX;
        // let y = event.clientY - startY;
        // console.log(x);
        let current = position - (x - (x % 500)) / 500;
        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500 + (x % 500)
          }px)`;
        }
        // for (let child of children) {
        //   child.style.transition = "none";
        //   child.style.transform = `translateX(${-position * 500 + x}px)`;
        // }
      };
      let up = (event) => {
        // console.log("mouseup");
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);
        // for (let child of children) {
        //   child.style.transition = "";
        //   child.style.transform = `translateX(${-position * 500}px)`;
        // }
        // z-index的关系会有飞跃的问题
        for (let offset of [
          0,
          -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x)),
        ]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500
          }px)`;
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

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
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
  "https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg",
  "https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg",
  "https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg",
];

let a = <Carousel src={d} />;
// document.body.appendChild(a);
a.mountTo(document.body);
