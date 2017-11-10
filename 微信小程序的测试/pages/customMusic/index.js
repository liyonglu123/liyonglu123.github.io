var Common = require('../../utils/music')
var app = getApp()
Page({
    data: {
        id: 436514312,
        name: "成都",
        src: "http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3",
        poster: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
        author: "赵雷",
        isplaying: true,
        islyric: false,
        sumduration: 0,
        lyricobj:{},
        lyricArr:[],
        isadd:false,
        items: [
          {name: 'recent', value: '最近'},
          {name: 'like', value: '我的收藏'}
        ],
        percent:'100%'
      },
    onLoad: function(){
        
    },
    onShow: function(){
    
    },
    audioPlay: function () {
        //背景音乐信息
       debugger
        wx.getBackgroundAudioPlayerState({
          success: function (res) {
            var status = res.status
            var dataUrl = res.dataUrl
            var currentPosition = res.currentPosition
            var duration = res.duration
            var downloadPercent = res.downloadPercent
            wx.playBackgroundAudio({
              dataUrl: dataUrl
            })
            wx.seekBackgroundAudio({
              position: currentPosition
            })
    
          }
        })
        this.setData({
          isplaying: true
        })
      },
      audioPause: function () {
        debugger
        wx.pauseBackgroundAudio()
        this.setData({
          isplaying: false
        })
      },

      slider3change: function (e) {
        sliderToseek(e, function (dataUrl, cal) {
          wx.playBackgroundAudio({
            dataUrl: dataUrl
          })
          wx.seekBackgroundAudio({
            position: cal
          })
        })
    
      },
      //滑动 歌曲快进
sliderToseek: function(e, cb) {
    debugger
  wx.getBackgroundAudioPlayerState({
    success: function (res) {
      var dataUrl = res.dataUrl
      var duration = res.duration
      let val = e.detail.value
      let cal = val * duration / 100
      cb && cb(dataUrl, cal);
    }
  })
}
     
})