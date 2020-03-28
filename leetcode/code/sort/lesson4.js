// export default (arr) => {
//     // 过滤负数
//     arr = arr.filter((item) => { return item > 0})
//     // 数组是不是为空
//     if (arr.length) {
//        arr.sort((a, b) => a - b) 
//        if (arr[0] !== 1) {
//            return 1
//        } else {
//            for(let i = 0; i < arr.length; i ++) {
//             if(arr[i+1] - arr[i] > 1) {
//                 return arr[i] +1
//             }
//            }
//            // 如果是连续的正整数
//            return arr.pop() + 1
//        }
//     } else {
//         return 1
//     }
// }

export default (arr) => {
    arr = arr.filter(item => item > 0)
    // 选择排序 如果第一个元素不是1返回1， 是1的话 判断相邻元素的差值
    for (let i = 0, len = arr.length, min; i < len; i++) {
        min = arr[i]
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                let c = min
                min = arr[j]
                arr[j] = c
            }
        }
        arr[i] = min
        if(i > 0) {
            if (arr[i] - arr[i - 1] > 1) {
                return arr[i -1] +1
            }
        }else {
           if(min !== 1) {
                return 1
           }
        }
    }
    return arr.length ? arr.pop() + 1 : 1
}