// export default (arr) => {
//     let quickSort = (arr) => {
//         let len = arr.length
//         if(len < 2) {
//             return arr
//         }else {
//             let flag = arr[0] // 标尺
//             let left = []
//             let right = []
//             for(let i = 1, temp; i < len; i ++) {
//                 temp = arr[i]
//                 if(temp < flag) {
//                     left.push(temp)
//                 }else {
//                     right.push(temp)
//                 }
//             }
//             return quickSort(left).concat(flag, quickSort(right))
//         }
//     }
//     return quickSort(arr)
// }

export default (arr) => {
    //数组指点两个位置值交换  === 如何不使用中间变量进行交换 位运算
    let swap = (arr, i, j) => {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    // 完成一次划分交换
    let findCenter = (arr, left, right) => {
        let flag = arr[left]
        let idx = left + 1 
        for(let i = idx; i <= right; i++) {
            if(arr[i] < flag) {
                swap(arr, idx, i)
                idx++
            }
        }
        swap(arr, left, idx - 1)
        return idx
    }
    // 递归排序
    let sort = (arr, left, right) => {
        if(left < right) {
            let center = findCenter(arr, left, right)
            sort(arr, left, center - 1)
            sort(arr, center, right)
        }
    }
    sort(arr, 0, arr.length - 1)
    return arr
}