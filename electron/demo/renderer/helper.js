exports.$ =(id) => {
  return document.getElementById(id)
}

// exports.convertDuration =(time) =>{
//     // 计算分钟  1.2 -> 1 一位 01 多位 010
//     const munites = "0" + Math.floor(time / 60)
//     const seconds = "0" + Math.floor(time - munites * 60)
//     return munites.substr(-2) + ":" + seconds.substr(-2)
// }

exports.convertDuration =(time) => {
    const munites = Math.floor(time / 60).toString().padStart(2, "0")
    const seconds = Math.floor(time - munites * 60).toString().padStart(2, "0")
    return `${munites} : ${seconds}`
}