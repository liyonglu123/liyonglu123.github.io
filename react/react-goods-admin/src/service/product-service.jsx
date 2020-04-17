import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
class Product {
    // 获取列表数据
    getProductList(listParam) {
        let url = "",
            data = {}
        // 应该是公用一个接口 处理的
        if(listParam.listType === "list") {
            url = "/manage/product/list.do"
            data.pageNum = listParam.pageNum
        }else if(listParam.listType === "search") {
            url = "/manage/product/search.do" 
            data.pageNum = listParam.pageNum
            data[listParam.searchType] = listParam.searchKeyword
        }
        return _mm.request({
            type: "post",
            url: url,
            data: data
        })
    }
    // 上下架
    setProductStatus(data) {
        return _mm.request({
            type: "post",
            url: "/manage/product/set_sale_status.do",
            data: data
        })
    }
}
export default Product