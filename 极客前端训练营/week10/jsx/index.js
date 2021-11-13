// import { Component, createElement } from "./framework.js";
// import { Carousel } from "./Carousel.js";
// import { Timeline, Animation } from "./animation.js";

// let d = [
//   {
//     img:
//       "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
//     url: "https://time.geekbang.org/",
//   },
//   {
//     img:
//       "https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg",
//     url: "https://time.geekbang.org/",
//   },
//   {
//     img:
//       "https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg",
//     url: "https://time.geekbang.org/",
//   },
//   {
//     img:
//       "https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg",
//     url: "https://time.geekbang.org/",
//   },
// ];

// let a = (
//   <Carousel
//     src={d}
//     onChange={(event) => console.log(event.detail.position)}
//     onClick={(event) => (window.location.href = event.detail.data.url)}
//   />
// );
// document.body.appendChild(a);
// a.mountTo(document.body);

// let tl = new Timeline();

// // 实现动态的添加
// window.tl = tl;
// window.animation = new Animation(
//   {
//     set a(v) {
//       console.log(v);
//     },
//   },
//   "a",
//   0,
//   100,
//   1000,
//   null
// );
// // tl.add(
// //   new Animation(
// //     {
// //       set a(v) {
// //         console.log(v);
// //       },
// //     },
// //     "a",
// //     0,
// //     100,
// //     1000,
// //     null
// //   )
// // );
// tl.start();

// import { createElement } from "./framework.js";
// import { Button } from "./Button.js";

// let a = <Button>content</Button>;

// a.mountTo(document.body);

// 另一种机制的children
let d = [
  {
    img:
      "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
    url: "https://time.geekbang.org/",
    title: "first",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg",
    url: "https://time.geekbang.org/",
    title: "second",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg",
    url: "https://time.geekbang.org/",
    title: "third",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg",
    url: "https://time.geekbang.org/",
    title: "fourth",
  },
];
import { createElement } from "./framework.js";
import { List } from "./List.js";

let a = (
  <List data={d}>
    {(record) => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
      </div>
    )}
  </List>
);

a.mountTo(document.body);
