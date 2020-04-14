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
// 布局
import Layout from "components/layout/index.jsx"
//页面
import Home from "pages/home/index.jsx"

import Login from "pages/login/index.jsx"


class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // exact  完全匹配
            <Router>
               <Switch>
                <Route path="/login" component={ Login }/>
                <Route path="/" render={ props => (
                  <Layout>
                    <Switch>
                        <Route exact path="/" component={ Home }/>
                        <Route exact path="/product" component={ Home }/>
                        {/* <Redirect from="*" to="/"/> */}
                    </Switch>
                 </Layout>
                )}/>
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