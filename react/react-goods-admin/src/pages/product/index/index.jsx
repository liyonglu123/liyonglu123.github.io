import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "components/page-title/index.jsx"
import Pagination from "utils/pagination/index.jsx"
import TableList from "utils/table-list/index.jsx"
import ListSearch from "./index-list-search.jsx"
import Product from "service/product-service.jsx"
import MUtils from "utils/mm.jsx"
import "./index.scss"
const _mm = new MUtils()
const _product = new Product()
class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: "list"
        }
    }
    componentDidMount() {
        this.loadProductList()
    }
    // 获取用户列表
    loadProductList() {
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum
        // 搜索的话需要传入类型和关键字
        if(listParam.listType === "search") {
            listParam.searchKeyword = this.state.searchKeyword
            listParam.searchType = this.state.searchType
        }
        // 请求接口
        _product.getProductList(listParam).then((res)=> {
            this.setState(res)
        },errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg)
        })
    }
    // 搜索
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === "" ? "list" : "search"
        // 处理异步的回调
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, ()=> {
            this.loadProductList()
        })
    }
    // 页数发生变化时候
    onPageNumChange(pageNum) {
        // 异步函数
        this.setState({
            pageNum: pageNum
        },()=> {
            this.loadProductList()
        })
    }
    // 上下架
    onSetProductStatus(e, curStatus, productId) {
        let newStatus = curStatus === 1 ? 2 : 1,
            confirmTips = curStatus === 1 ? "确定要下架该商品？" : "确定要上架该商品？";
        if(window.confirm(confirmTips)) {
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then((res)=> {
                _mm.successTips(res)
                // 重新加载列表信息
                this.loadProductList()
            },errMsg => {
                _mm.errorTips(errMsg)
            })
        }
    }
    render() {
        let tableHeads = [
            {name: "商品ID", width: "10%"},
            {name: "商品信息", width: "50%"},
            {name: "价格", width: "10%"},
            {name: "状态", width: "15%"},
            {name: "操作", width: "15%"}
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <Link to="/product/save" className="btn btn-primary product-add">
                        <span>添加商品</span>
                    </Link>
                </PageTitle>
                <ListSearch onSearch={ (searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index)=> {
                            return (
                                <tr key={ index }>
                                    <td>{ product.id }</td>
                                    <td>
                                        <p>{ product.name }</p>
                                        <p>{ product.subtitle }</p>
                                    </td>
                                    <td>￥ { product.price }</td>
                                    <td>
                                        <p>{ product.status === 1 ? '在售' : "已下架" }</p>
                                        <button className="btn btn-xs btn-warning" onClick={(e)=> {this.onSetProductStatus(e, product.status, product.id )}}>{ product.status === 1 ? '下架' : "上架" }</button>
                                    </td>
                                    <td>
                                        <Link className="opera" to={ `/product/detail/${product.id}` }>详情</Link>
                                        <Link className="opera" to={ `/product/save/${product.id}` }>编辑</Link>
                                    </td>
                                </tr>
                             )
                        })
                    }
                </TableList>
                <Pagination     
                        current={this.state.pageNum} 
                        total={this.state.total}
                        onChange={(pageNum)=> {this.onPageNumChange(pageNum)}}/>
            </div>
        )
    }
}

export default ProductList
