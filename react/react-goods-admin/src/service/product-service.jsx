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
    // 获取商品详情
    getProduct(id) {
        return _mm.request({
            type: "post",
            url: "/manage/product/detail.do",
            data: {
                productId: id || 0
            }
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
    // 品类接口
    getCategoryList(categoryId) {
        return _mm.request({
            type: "post",
            url: "/manage/category/get_category.do",
            data: {
                categoryId: categoryId || 0
            }
        })
    }
    // 验证表单信息
    checkResult(product) {
        let result = {
            status: true,
            msg: "验证通过"
        }
        // 判断商品名称不能为空
        if(typeof product.name !== "string" ||  product.name.length === 0) {
            return {
                status: false,
                msg: "商品名称不能为空"
            }
        }
         // 判断商品描述不能为空
         if(typeof product.subtitle !== "string" ||  product.subtitle.length === 0) {
            return {
                status: false,
                msg: "商品描述不能为空"
            }
        }
         // 品类Id
         if(typeof product.categoryId !== "number" ||  !(product.categoryId > 0)) {
            return {
                status: false,
                msg: "请选择商品品类"
            }
        }
         // 判断价格
         if(typeof product.price !== "number" ||  !(product.price >= 0)) {
            return {
                status: false,
                msg: "请输入正确的商品价格"
            }
        }
         // 判断库存
         if(typeof product.stock !== "number" ||  !(product.stock >= 0)) {
            return {
                status: false,
                msg: "请输入正确的商品库存"
            }
        }
        
        return result
    }
    // 保存表单信息
    saveProduct(product) {
        return _mm.request({
            type: "post",
            url: "/manage/product/save.do",
            data: product
        })
    }
}
export default Product