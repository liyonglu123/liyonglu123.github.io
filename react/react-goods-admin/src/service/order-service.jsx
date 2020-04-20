import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
class Order {
    // 获取列表数据
    getOrderList(listParam) {
        let url = "",
            data = {}
        // 应该是公用一个接口 处理的
        if(listParam.listType === "list") {
            url = "/manage/order/list.do"
            data.pageNum = listParam.pageNum
        }else if(listParam.listType === "search") {
            url = "/manage/order/search.do" 
            data.pageNum = listParam.pageNum
            data.orderNo = listParam.orderNo
        }
        return _mm.request({
            type: "post",
            url: url,
            data: data
        })
    }
    // 获取商品详情
    getOrderDetail(orderNumber) {
        return _mm.request({
            type: "post",
            url: "/manage/order/detail.do",
            data: {
                orderNo: orderNumber
            }
        })
    }
    // 发货
    sendGoods(orderNumber) {
        return _mm.request({
            type: "post",
            url: "/manage/order/send_goods.do",
            data: {
                orderNo: orderNumber
            }
        })
    }
}
export default Order