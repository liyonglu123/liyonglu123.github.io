
var app = getApp();
var URL = "https://www.itit123.cn/itdragon/findAll"

/**
 * 请求
 */
const wxRequest = function(params, url){
    wx.request({
        url: url,
        success: function(res){ 
            // console.log(res.data);
            if (params.success) {
                params.success(res);
            }
        }
    })
}
// 
const getMovieList = (params) => wxRequest(params, URL);
module.exports = {
    getMovieList
}
