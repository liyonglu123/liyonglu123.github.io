/**
 * 对字符串进行反转
 */
// export default (str) => {
//     let arr = str.split(' ');
//     let result = arr.map(item=> {
//         return item.split('').reverse().join('')
//     })
//     return result.join(' ')
// }


// export default (str) => {
//     return str.split(' ').map(item=> {
//         return item.split('').reverse().join('')
//     }).join(' ')
// }


// export default (str) => {
//     return str.split(/\s/g).map(item=> {
//         return item.split('').reverse().join('')
//     }).join(' ')
// }


export default (str) => {
    return str.match(/[\w']+/g).map(item=> {
        return item.split('').reverse().join('')
    }).join(' ')
}