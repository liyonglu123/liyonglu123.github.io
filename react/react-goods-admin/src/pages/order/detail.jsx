import React from "react"
import PageTitle from "components/page-title/index.jsx"
import Order from "service/order-service.jsx"
import TableList from "utils/table-list/index.jsx"

import MUtils from "utils/mm.jsx"
import "./detail.scss"
const _mm = new MUtils()
const _order = new Order()
class OrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            orderNumber: this.props.match.params.orderNumber, // 区分新增和编辑
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrderDetail()
    }
    // 请求加载订单详情
    loadOrderDetail() {
        // 编辑 == 需要进行表单回填
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 发货
    onSendGoods() {
        if(window.confirm("是否确认该订单已经发货？")) {
            _order.sendGoods(this.state.orderNumber).then(res=> {
                _mm.successTips("发货成功！")
                this.loadOrderDetail()
            }, errMsg => {
                _mm.errorTips(err)
            })
        }
    }
    render() {
        let tableHeads = [
            {name: "商品图片", width: "10%"},
            {name: "商品信息", width: "45%"},
            {name: "单价", width: "15%"},
            {name: "数量", width: "15%"},
            {name: "合计", width: "15%"},
            
        ]
        let receiveInfo = this.state.orderInfo.shippingVo || {}
        let productList = this.state.orderInfo.orderItemVoList || []
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="row">
                    <div className="col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单号</label>
                            <div className="col-md-5">
                                <p className="form-control-static"> { this.state.orderInfo.orderNo }</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">创建时间</label>
                            <div className="col-md-5">
                              <p className="form-control-static"> { this.state.orderInfo.createTime }</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">收件人</label>
                            <div className="col-md-5">
                              <p className="form-control-static"> 
                                  { receiveInfo.receiverName}，
                                  { receiveInfo.receiverProvince}
                                  { receiveInfo.receiverCity}
                                  { receiveInfo.receiverAddress}
                                  { receiveInfo.receiverMobile || receiveInfo.receiverPhone}
                              </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单状态</label>
                            <div className="col-md-5">
                              <p className="form-control-static">
                                  {/* 判断是不是已付款 */}
                                   { this.state.orderInfo.statusDesc }
                                   {
                                       this.state.orderInfo.statusDesc  === 20
                                       ? <button onClick={(e)=> {this.onSendGoods(e)}} className="btn btn-sm btn-default btn-send-goods">立即发货</button>
                                       : null
                                   }
                             </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">支付方式</label>
                            <div className="col-md-5">
                              <p className="form-control-static">
                                   { this.state.orderInfo.paymentTypeDesc }
                             </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单金额</label>
                            <div className="col-md-5">
                              <p className="form-control-static">
                                   ￥ { this.state.orderInfo.payment }
                             </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品列表</label>
                            <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                    {
                                       productList.map((product, index)=> {
                                         return (
                                             <tr key={ index }>
                                                    <td>
                                                        <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName}/>
                                                    </td>
                                                    <td>{ product.productName }</td>
                                                    <td>{ product.currentUnitPrice }</td>
                                                    <td>{ product.quantity }</td>
                                                    <td>{ product.totalPrice }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </TableList>
                            </div>
                        </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail
