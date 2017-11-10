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
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


var rootDocment = 'https://www.itit123.cn';
function req(url,data,cb){
    wx.request({
      url: rootDocment + url,
      data: data,
      method: 'post',
      header: {'Content-Type':'application/x-www-form-urlencoded'},
      success: function(res){
        return typeof cb == "function" && cb(res.data)
      },
      fail: function(){
        return typeof cb == "function" && cb(false)
      }
    })
}


module.exports = {
  req: req
}