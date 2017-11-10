const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  // debugger
  // console.log(n);
  return n[1] ? n : '0' + n  // 判断对应的数值是否存在 不存在则重赋值
}

module.exports = {
  formatTime: formatTime
}
