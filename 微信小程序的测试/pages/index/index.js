//index.js
//获取应用实例
const app = getApp()

Page({
//   data: {
//     imgUrls: [
//       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
//     ],
//     indicatorDots: false,
//     autoplay: false,
//     interval: 5000,
//     duration: 1000,
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   /**
//    * 这是用户的缓存和搜索的问题
//    * 流程这么走：
// 1.用户输入数据，点击搜索
// 2.如果数据不为空，加入（设置）本地缓存
// 3.去服务器搜索用户想要的数据，赋值给这个页面的变量
// 4.点击删除，去除本地这个key的value
// 这里的缓存形式的  key=>value
// var searchData = wx.getStorageSync('searchData') || []
// 获取本地名字为'searchData'的缓存，如果'searchData'这个缓存不存在就相当于重新什么一个空数组，赋值给searchData这个变量
// searchData.push(this.data.inputValue)
// 将用户输入的值PUSH进searchData这个变量里
// wx.setStorageSync('searchData', searchData)
// 调用API接口，重新设置key = 'searchData'的这个缓存的value等于searchData
// 下面的wx.request是请求数据的内容，说腻了，印象够深了。
// 这里没有绑定获取缓存的bindtap，只要获取到，然后添加到Page里面的data
//    */
//   //获取用户输入框的值
//   searchNameInput:function(e){
//     var that = this;
//     that.setData({
//       inputValue:e.detail.value
//     })
//   },
//   //将用户输入的内容存入本地缓存,并且将搜索数据放到首页
// setSearchStorage:function(){
//   var that = this
//   if(this.data.inputValue != ''){
//     //调用API向本地缓存存入数据
//     var searchData = wx.getStorageSync('searchData') || [] 
//     searchData.push(this.data.inputValue) 
//     wx.setStorageSync('searchData', searchData)
 
//     //读取用户搜索商品
//     var name = this.data.inputValue
//     wx.request({
//      url: 'www.shop.com/home/product/search',
//      data: {name:name},
//      method: 'GET', 
//      success: function(res){
//         that.setData({
//         goodsList: res.data.info,
//       })
//      },
//     })
//   }
// },
// // //从本地获取历史搜索数据
 
// // var searchData = wx.getStorageSync('searchData')||[]

// //      this.setData({

// //        searchData:searchData

// //      })

 

// // // deleteHistory

// // //删除历史搜索数据

// //  deleteHistory:function(){

// //    var that = this

// //    wx.showModal({

// //    title: '提示',

// //    content: '是否删除历史搜索',

// //    success: function(res) {

// //      if (res.confirm) {

// //        wx.setStorageSync('searchData', []);

// //        wx.switchTab({

// //          url: '/pages/index/index',

// //        })

// //       }

// //      }

// //    })

// // },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
onReady: function (e) {
  // 使用 wx.createAudioContext 获取 audio 上下文 context
  this.audioCtx = wx.createAudioContext('myAudio')
},
data: {
  position: '', // 当前的位置
  tempFilePaths: '', // 文件的位置
  poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
  name: '此时此刻',
  author: '许巍',
  src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
},
audioPlay: function () {
  this.audioCtx.play()
},
audioPause: function () {
  this.audioCtx.pause()
},
audio14: function () {
  this.audioCtx.seek(14)
},
audioStart: function () {
  this.audioCtx.seek(0)
},
onLoad(){
  //  逆向解码获得具体的位置信息
  var that = this;
  wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var location = latitude+','+longitude
    //   wx.openLocation({
    //   latitude: latitude,
    //   longitude: longitude,
    //   scale: 28
    // })
      wx.request({
        url: 'http://api.map.baidu.com/geocoder/v2/?location='+location+'&output=json&pois=1&ak=TmrCpX3fYsHAczyCnoL7cln6AADvYHCu',
        success: function(res){
          // debugger
          console.log(res.data.result.formatted_address)
          that.setData({
            position: res.data.result.formatted_address
          })
        }
      })
      // that.chooseImg()
    }
  })
},
chooseImg(){
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
     that.setData({
      tempFilePaths: res.tempFilePaths[0]
     })
    
    }
  })
},
// 转发  开启之后才会有效果的
onShareAppMessage(){ 
  // debugger
  // return {
  //   title: '你好，世界',
  //   path: '/pages/index/index'
  // }
  }
})
