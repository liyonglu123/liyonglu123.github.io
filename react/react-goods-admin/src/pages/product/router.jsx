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
import ProductSave from "pages/product/index/save.jsx"
import ProductDetail from "pages/product/index/detail.jsx"
import CategoryList from "pages/product/category/index.jsx"
import CategoryAdd from "pages/product/category/add.jsx"


class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ ProductList }/>
                {/* ？ 表示可选 */}
                <Route path="/product/save/:pid?" component={ ProductSave }/>  
                <Route path="/product/detail/:pid" component={ ProductDetail }/>   
                <Route path="/product-category/index/:categoryId?" component={ CategoryList }/>  
                <Route path="/product-category/add/" component={ CategoryAdd }/>   
                <Redirect from="/product" to="/product/index"/>
                <Redirect from="/product-category" to="/product-category/index"/>
                
            </Switch>
        )
    }
}

export default ProductRouter