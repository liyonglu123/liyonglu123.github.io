import * as React from "react"
import * as ReactDOM from "react-dom"
import "./index.scss"
import Hello from "./components/Hello"
import "font-awesome/css/font-awesome.min.css"
function App() {
    return(
        <div>
            <i className="fa fa-id-card"></i>
            <Hello message="hello ts"/>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById("app"))