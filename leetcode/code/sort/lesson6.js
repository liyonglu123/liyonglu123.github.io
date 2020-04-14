// 洗牌算法、
// 时间复杂度以及空间复杂度分析
function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}
let arr = [1,2,3,4,5,6,7]
shuffle(arr)
console.log(arr)
