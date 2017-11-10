Page({
    data:{
        name: '666'
    },
    // 小程序的声明周期
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        console.log("test1 onLoad");
      },
      onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
        console.log("test1 onReady");
      },
      onShow:function(){
        // 生命周期函数--监听页面显示
       console.log("test1 onShow");
      },
      onHide:function(){
        // 生命周期函数--监听页面隐藏
         console.log("test1 onHide");
      },
      onUnload:function(){
        // 生命周期函数--监听页面卸载
         console.log("test1 onUnload");
      },
      onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
         console.log("test1 onPullDownRefresh");
      },
      onReachBottom: function() {
        // 页面上拉触底事件的处理函数
         console.log("test1 onReachBottom");
      }
})