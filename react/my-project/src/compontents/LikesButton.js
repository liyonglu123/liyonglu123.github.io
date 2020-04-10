import React, { Component } from "react"

class LikesButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: 0
        }
        // this.increaseLike = this.increaseLike.bind(this) // 方式一
        // 箭头函数  方式二
    } 
    increaseLike() {
        console.log(this)
        this.setState({
            like: ++this.state.like
        })
    }
    render() {
        return(
            <div className="like-container">
                <button className="btn btn-outline-primary"
                    onClick={ ()=> this.increaseLike() }>
                  👍 { this.state.like }
                </button>
            </div>
        )
    }
}

export default LikesButton