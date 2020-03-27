export default (str)=> {
    // 正则匹配 模式匹配
    let reg = /^(\w+)\1+$/
    return reg.test(str)
}