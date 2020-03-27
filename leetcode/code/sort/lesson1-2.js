export default (arr) => {
    // 选择排序
    for(let i = 0, len = arr.length; i < len; i++) {
        let min = arr[i]
        for(let j = i + 1; j < arr.length; j ++) {
            if (arr[j] < min) {
                let c = min
                min = arr[j]
                arr[j] = c
            }
        }
        // 两种情况  是不是最小值的判断
        arr[i] = min
    }
    return arr
}