import React, { Component } from "react"

class CommentBox extends Component {
    constructor(props) {
        super(props)
        // 受控组件 多的话太麻烦  === 》 转化为非受控组件 绑定到dom上
        // this.state = {
        //     value: ""
        // }
        // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    // handleChange(event) {
    //     this.setState({
    //         value: event.target.value
    //     })
    // }
    handleSubmit(event) {
        // ref  ==== >  this.textInput   获取到对用的dom
        console.log(this.textInput.value)
        event.preventDefault()
        this.props.onAddComment(this.textInput.value)
    }

    render() {
        return (
            <form className="p-5" onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <label>留言内容</label>
                    <input className="form-control"
                        type="text"
                        placehodlers="请输入内容"
                        ref={(textInput) => {this.textInput = textInput}}>
                    </input>
                </div>
                <button className="btn btn-primary">
                    留言
                </button>
                <p>已有{ this.props.commentsLength }评论</p>
            </form>
        )
    }
}
export default CommentBox