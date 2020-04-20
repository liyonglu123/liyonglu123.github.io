// 路由的分离 
import React from "react"
import {
    Switch,
    Link,
    Route,
    Redirect
} from "react-router-dom";

//页面
import OrderList from "pages/order/index.jsx"
import OrderDetail from "pages/order/detail.jsx"



class OrderRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/order/index" component={ OrderList }/>
                <Route path="/order/detail/:orderNumber" component={ OrderDetail }/>
                
                {/* ？ 表示可选 */} 
                <Redirect from="/order" to="/order/index"/>
                
            </Switch>
        )
    }
}

export default OrderRouter