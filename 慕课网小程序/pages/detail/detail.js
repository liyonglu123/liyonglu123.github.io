Page({
    data: {
        itemData:{},
        id: '',
        title: '',
        time: ''
    },
    onLoad(params){
        // debugger
        this.setData({
            // itemData: JSON.parse(params.itemObj)
            id: params.id,
            title: params.title,
            time: params.time
        })
    }
})