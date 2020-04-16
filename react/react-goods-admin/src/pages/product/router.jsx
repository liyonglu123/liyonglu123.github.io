// 路由的分离 
import React from "react"
import {
    Switch,
    Link,
    Route,
    Redirect
} from "react-router-dom";

//页面
import ProductList from "pages/product/index/index.jsx"


class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ ProductList }/>
                <Redirect from="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter