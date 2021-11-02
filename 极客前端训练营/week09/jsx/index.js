import { Component, createElement } from "./framework.js";
import { Carousel } from "./carousel.js";
import { Timeline, Animation } from "./animation.js";

let d = [
  "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
  "https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg",
  "https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg",
  "https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg",
];

let a = <Carousel src={d} />;
// document.body.appendChild(a);
a.mountTo(document.body);

let tl = new Timeline();

// 实现动态的添加
window.tl = tl;
window.animation = new Animation(
  {
    set a(v) {
      console.log(v);
    },
  },
  "a",
  0,
  100,
  1000,
  null
);
// tl.add(
//   new Animation(
//     {
//       set a(v) {
//         console.log(v);
//       },
//     },
//     "a",
//     0,
//     100,
//     1000,
//     null
//   )
// );
tl.start();
