//index.js
//获取应用实例
var order = ['red', 'yellow', 'blue', 'green', 'red']
const app = getApp()

Page({
  // https://www.cnblogs.com/ailingfei/p/6932058.html  进度条的练习的问题 总时长好像只能动态的获取了
  data: {
    // 音频文件
    currentTime: '0',//  播放的时间
    totalTime: '',//  播放的总时间
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    isHideLoadMore: false,
    toView: 'red',
    scrollTop: 100,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //  自己模拟的数据列表
    dataList: [
      {
        id: '1',
        title: "第一篇"
      },
      {
        id: '2',
        title: "第二篇"
      }
    ]
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx.duration)
    console.log(this.audioCtx)

  },
  change(e){
    // debugger
    console.log(e);
    // 总时长如果不给的话初始化的时候应该如何展示呢？
    this.setData({
      currentTime: e.detail.currentTime,
      totalTime: e.detail.duration 
    })
    console.log(e.detail)
  },
  audioPlay: function (e) {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function (e) {
    console.log(e)
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  // ============= 以上是音频的文件的问题
  //自定义的滚东的问题
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
    setTimeout(()=>{
      this.setData({
        isHideLoadMore: true
      })
    },2000)
    

  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //  去文章的详情页面
  goDetail:function(query){
    //  这里和wepy传递的参数不同之处
    var openId = query.currentTarget.dataset.item.id;
    // debugger
    wx.navigateTo({
      url: '../support/support?id='+ openId
    })
  },
  //  去搜索页面： 
  goSearch(){
    wx.navigateTo({
      url: '../search/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 1. 调用系统的API，系统有提供下拉刷新的API接口 
   * 2. 监听scroll-view,自定义下拉刷新，还记得scroll-view里面有一个bindscrolltoupper属性吗
   */
  onPullDownRefresh(){
    　　console.log('--------下拉刷新-------')
    　　wx.showNavigationBarLoading() //在标题栏中显示加载
     
    　　wx.request({
              url: "http://www.imooc.com/course/ajaxlist",
              data: {},
              method: 'GET',
             // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
              }
        })  
      },
      // 上拉加载回调接口
    onReachBottom: function () {
      // debugger
      console.log('加载更多')
      // concat 通过concat 实现数组的连接
      var newDataList = this.data.dataList.concat([{
        id: '3',
        title: "第三篇"
      }])
      // setTimeout(()=>{
      //   this.setData({
      //     isHideLoadMore: true,
      //     dataList: newDataList
      //   })
      // },2000)
    },   
})
