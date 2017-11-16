var app = getApp();
const api = require('../../utils/api')

Page({

    data:{  
        msgList:[  
        //   {id:1,title:"标题一",time:"2017-3-5 23:01:59"},  
        //   {id:2,title:"标题二",time:"2017-3-5 23:02:59"},  
        //   {id:3,title:"标题三",time:"2017-3-5 23:03:59"},  
        //   {id:4,title:"标题四",time:"2017-3-5 23:04:59"}  
        ]  
    },
    onLoad(){
        var that = this;
        // debugger
        api.getMovieList({
            success: function(res){
                // debugger
                that.setData({  
                    msgList: res.data
                })
            }
        })
    
        
       
    },
    goDetail(e){
        // debugger
        // var item = e.currentTarget.dataset.item;
        // wx.navigateTo({
        //    url:'../detail/detail?itemObj=' + JSON.stringify(item)
        // });
    }   
})