import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
class Product {
    // 获取列表数据
    getProductList(pageNum) {
        return _mm.request({
            type: "post",
            url: "/manage/product/list.do",
            data: {
                pageNum: pageNum
            }
        })
    }
}
export default Product