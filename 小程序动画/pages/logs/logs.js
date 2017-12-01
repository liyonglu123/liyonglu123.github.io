//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    message: '',
    flag: true
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
      delay: 100,
      // transformOrigin: 'left top 0',
      success: function(res){
        debugger
      }
    })
  },
  translate(){
    this.animation.translateY(100, 0).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
    setTimeout(function () {  
      // debugger
      this.animation.translateY(0).step()  
      this.setData({  
        animation: this.animation.export(),
        flag: false
      })  
  }.bind(this), 1000)  
  },
  onReachBottom: function(){

  }
      
   
})
