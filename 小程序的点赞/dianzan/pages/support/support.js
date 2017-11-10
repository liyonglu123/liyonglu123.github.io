Page({
    data: {
        // support: false,
        // itemId: ''
    },
    //  本地模拟的点赞的效果  同步的效果
    onLoad(option){
        // debugger
        var openId = option.id;
        this.setData({
            currentId: openId
        })
        //  先查看有没有缓存没有就缓存有就直接的使用
        // 读取所有文章列表的缓存状态
        var cache = wx.getStorageSync('cache_key');
        // 如果缓存的状态存在
        if(cache){
            //  拿到缓存中的对应的一个
            var currentCache = cache[openId];
           // 把拿到的缓存状态中的1个赋值给data中的support，
            //    如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，
            // 那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
            this.setData({
                support: currentCache
            })  

        }else{
            // 如果所有的缓存状态都不存在 就让不存在的缓存存在
            var cache = {};
            // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，
            // 我们可以把当前这个文章点赞的缓存值设置为 false
            cache[openId] = false;
            // 把设置的当前文章点赞放在整体的缓存中
            wx.setStorageSync('cache_key', cache);
        }
    },
    //  点击改变缓存的状态 点击图片的点赞事件  这里使用的是同步的方式
    toSupport(event){
        // 获取所有的缓存
        // debugger
        var cache = wx.getStorageSync('cache_key');   
        //  获取当前文章是否被点赞的缓存
        var currentCache = cache[this.data.currentId];
        // 取反，点赞的变成未点赞 未点赞的变成点赞
        currentCache = !currentCache;
        // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值
        cache[this.data.currentId] = currentCache;
        // 重新设置缓存
        // wx.setStorageSync('cache_key',cache);
        //  更新数据绑定,从而切换图片
        // this.setData({
        //     support: currentCache
        // });
         // 良好的用户交互的效果
        // 方法一：
        // wx.showToast({
        //     title: currentCache?'点赞':'取消',
        //     icon: 'success',
        //     duration: 1000
        // });
        //  方法二： 调用showModal
        this.showModal(cache,currentCache);
    },
    showModal: function(cache,currentCache) {
        var that = this;
        wx.showModal({
            title: "点赞",
            content: currentCache?"要点赞吗？":"要取消赞吗？",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#666",
            confirmText: "确定",
            confirmColor: "#222",
            success: function(res) {
                if (res.confirm) {
                    // 重新设置缓存
                    wx.setStorageSync('cache_key',cache);
                    // 更新数据绑定,从而切换图片
                    that.setData({
                        support: currentCache
                    })
                }
            }
        })
    }
})