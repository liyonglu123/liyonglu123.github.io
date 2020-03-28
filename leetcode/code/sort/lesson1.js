export default (arr)=> {
    // 数组降序排序
    arr.sort((a, b)=> a - b)
    // 声明一个空数组用来存储奇偶排序后的数组
    let r = []
    // 记录奇数偶数下标
    let odd = 1
    let even = 0
    // 对数组进行遍历
    arr.forEach((item)=> {
        if (item % 2 === 1) {
            r[odd] = item
            odd+=2
        } else {
            r[even] = item
            even+=2
        }
    })
    return r
}