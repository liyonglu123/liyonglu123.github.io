import React from "react"
import TopNav from "components/topNav/index.jsx"
import SideNav from "components/SideNav/index.jsx"
import "./theme.css"

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                { this.props.children }
            </div>
        )
    }
}
export default Layout