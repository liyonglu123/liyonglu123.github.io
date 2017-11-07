import wepy from 'wepy';
// import Promise from ''
// 下面是对请求的封装
const host = "http://api.dev.grdoc.org";
const wxRequest = function(parmas, url){
    wx.showToast({
        title: '加载中。。。',
        icon: 'loading',
        duration: 2000
      });
    return wepy.request({
        url: url,
    });
    wx.hideToast();
}
// 资讯页面
const getDataList = (parmas)=> wxRequest(parmas,host + '/article/category?type=584ba6400cbc667fe121b8ae&');
export default {
    getDataList
}