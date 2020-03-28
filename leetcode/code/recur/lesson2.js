export default (str, words) => {
    // 保存结果
    let result = []
    // 记录数组的长度 做边界条件计算
    let num = words.length
    // 递归
    let range = (r, _arr)=> {
        if(r.length === num) {
            result.push(r)
        }else {
            _arr.forEach((item, idx)=> {
                let temp = [].concat(_arr)
                temp.splice(idx, 1)
                range(r.concat(item), temp)
            })
        }
    }
    range([], words)
    return result.map(item => {
        return str.indexOf(item.join(''))
    }).filter(item => item !== -1).sort()
}