// export default (arr) => {
//     if (arr.length < 2) {
//         return 0
//     }
//     arr.sort()
//     let max = 0
//     for(let i = 0, len = arr.length -1, temp; i < len; i ++) {
//         temp = arr[i+1] - arr[i]
//         if(temp > max) {
//             max = temp
//         }
//     }
//     return max
// }

export default (arr) => {
    if (arr.length < 2) {
        return 0
    }
    let max = 0
    let len = arr.length
    let space
    for(let i = len, temp; i > 0; i--) {
        for(let j = 0; j  < i; j ++) {
            temp = arr[j]
            if(temp > arr[j + 1]) {
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
        if (i < len) {
            space = arr[i + 1] - arr[i]
            if(space > max) {
                max = space
            }
        }
    }
    return Math.max(max, arr[1] - arr[0])
}