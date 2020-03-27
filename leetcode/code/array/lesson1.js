export default (str) => {
    // 映射的map
    let map = ['', 1 , 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    // 输入字符的分割
    let num = str.split('')
    // 保存键盘映射后的字母内容 2,3 => ['abc', 'def']
    let code = []
    num.forEach((item)=> {
        if(map[item]) {
            code.push(map[item])
        }
    });
    // 组合
    let comb = (arr)=> {
        // 临时变量用来保存前两个组合的结果
        let temp = [];
        // 外出循环遍历第一元素  内存循环遍历第二个元素
        for(let i = 0, il= arr[0].length; i < il; i++) {
            for(let j = 0, jl= arr[1].length; j < jl; j++) {
                temp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        arr.splice(0,2,temp)
        if(arr.length > 1){
            comb(arr)
        }else {
            return temp
        }
        return arr[0]
    }
    return comb(code)
}