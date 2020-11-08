// 引入 css
import "./style/style1.css";
import "./style/style2.less";
import _ from "lodash";
import { sum } from "./common";

const sumRes = sum(10, 20);
console.log("sumRes", sumRes);

console.log("loash-sumRes", _.sum([20, 50]));
// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./common'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }
