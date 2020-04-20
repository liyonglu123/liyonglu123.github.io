import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "components/page-title/index.jsx"
import Pagination from "utils/pagination/index.jsx"
import TableList from "utils/table-list/index.jsx"
import ListSearch from "./index-list-search.jsx"
import Order from "service/order-service.jsx"
import MUtils from "utils/mm.jsx"
import "./index.scss"
const _mm = new MUtils()
const _order = new Order()
class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: "list"
        }
    }
    componentDidMount() {
        this.loadOrderList()
    }
    // 获取用户列表
    loadOrderList() {
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum
        // 搜索的话需要传入类型和关键字
        if(listParam.listType === "search") {
            listParam.orderNo = this.state.orderNumber
        }
        // 请求接口
        _order.getOrderList(listParam).then((res)=> {
            this.setState(res)
        },errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg)
        })
    }
    // 搜索
    onSearch(orderNumber) {
        let listType = orderNumber === "" ? "list" : "search"
        // 处理异步的回调
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber
        }, ()=> {
            this.loadOrderList()
        })
    }
    // 页数发生变化时候
    onPageNumChange(pageNum) {
        // 异步函数
        this.setState({
            pageNum: pageNum
        },()=> {
            this.loadOrderList()
        })
    }
    render() {
        let tableHeads = [
            {name: "订单号", width: "20%"},
            {name: "收件人", width: "10%"},
            {name: "订单状态", width: "10%"},
            {name: "订单总价", width: "20%"},
            {name: "创建时间", width: "30%"},
            {name: "操作", width: "10%"}
            
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="订单 列表"/>
                <ListSearch onSearch={ (orderNumber) => this.onSearch(orderNumber)}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index)=> {
                            return (
                                <tr key={ index }>
                                    <td>
                                        <Link className="opera" to={ `/order/detail/${order.orderNo}` }>{ order.orderNo }</Link>
                                    </td>
                                    <td>{ order.receiverName }</td>
                                    <td>{ order.statusDesc }</td>
                                    <td>{ order.payment }</td>
                                    <td>{ order.createTime }</td>
                                    <td>
                                        <Link className="opera" to={ `/order/detail/${order.orderNo}` }>详情</Link>
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

export default OrderList
