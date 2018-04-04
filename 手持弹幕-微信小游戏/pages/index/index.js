var barrage_style_obj = {};
var screenHeight = 0;
var timer;
Page({
  data: {
    barrageTextColor: "#D3D3D3",
    barrage_inputText: "none",
    barrage_shoottextColor: "black",
    bind_shootValue: "",
    barrage_style: {},
    barrageText_height: '',
    textColor: "rgb(255,0,155)",
    barrage_screenHeight: ''
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    //获取屏幕的高度 可以进行自适应的匹配哦。
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          barrage_screenHeight: res.screenHeight
        })
      }
    })
  },
  onReady: function () {
    screenHeight = this.data.barrage_screenHeight;
    barrage_style_obj = {
      barrageText_height: screenHeight,
      barrage_shoottextColor: this.data.textColor,
      barrage_shootText: ["我", "叫", "李", "勇", "鲁"]
    }
    this.setData({
      barrageTextColor: "#04BE02",
      barrage_inputText: "flex",
      barrage_style: barrage_style_obj, //发送弹幕

    });
    //打开定时器    
    timer = setInterval(this.barrageText_move, 60);
  },
  //发射按钮 
  shoot: function (e) {
    clearInterval(timer);
    //字体颜色随机
    var rgb1 = 255, rgb2 = 0, rgb3 = 155;
    var textColor = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";
    //设置弹幕字体的垂直位置样式  
    var barrageText_height = screenHeight;
    barrage_style_obj = {
      barrageText_height: barrageText_height,
      barrage_shootText: this.data.bind_shootValue,
      barrage_shoottextColor: textColor,
    };
    this.setData({
      barrage_style: barrage_style_obj, //发送弹幕
      bind_shootValue: "" //清空输入框  
    })
    //定时器 让弹幕动起来 
    timer = setInterval(this.barrageText_move, 60);
  },
  //定时器 让弹幕动起来 
  barrageText_move: function () {
    var textMove = barrage_style_obj.barrageText_height;
    textMove = textMove - 10;
    barrage_style_obj.barrageText_height = textMove;
    if (barrage_style_obj.barrageText_height <= -barrage_style_obj.barrage_shootText.length * 250) {
      barrage_style_obj.barrageText_height = screenHeight;
    }
    this.setData({
      barrage_style: barrage_style_obj,
    })
  },
  //绑定发射输入框，将值传递给data里的bind_shootValue，发射的时候调用
  bind_shoot: function (e) {
    this.setData({
      bind_shootValue: e.detail.value
    })
  },
})