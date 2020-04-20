import React from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// import "font-awesome/css/font-awesome.min.css"
// 引入其他的路由模块实现
import ProductRouter from "pages/product/router.jsx"
import OrderRouter from "pages/order/router.jsx"


// 布局
import Layout from "components/layout/index.jsx"
//页面
import Home from "pages/home/index.jsx"

import Login from "pages/login/index.jsx"
import UserList from "pages/user/index.jsx"
import ErrorPage from "pages/error/index.jsx"

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let LayoutRoute = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route  path="/product" component={ ProductRouter }/>
                    <Route  path="/product-category" component={ ProductRouter }/>
                    <Route  path="/order" component={ OrderRouter }/>
                    <Route  path="/user/index" component={ UserList }/>
                    <Redirect exact from="/user" to="/user/index"/>
                    {/* 从上到一个一个进行匹配 */}
                    <Route component={ ErrorPage }/>
                </Switch>
             </Layout>
        )
        return (
            // exact  完全匹配
            <Router>
               <Switch>
                <Route path="/login" component={ Login }/>
                <Route path="/" render={ props => LayoutRoute}/>
               </Switch>
            </Router>
            // <Home/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);