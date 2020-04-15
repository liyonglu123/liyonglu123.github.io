import React from "react"
import User from "service/user-service.jsx"

import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _user = new User()
import "./index.scss"
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            redirect: _mm.getUrlParam("redirect") || "/"
        }
    }
    componentWillMount() {
        document.title = "登录--- MMall"
    }
    // 输入值变化的时候
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name
        this.setState({
            [inputName]: inputValue
        })
    }
    // 回车提交
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit()
        }
    }
    // 提交登录
    onSubmit(e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo)
        // 验证通过
        if(checkResult.status) {
            _user.login(loginInfo).then((res)=> {
                // 本地存储
                // localStorage.setItem("userInfo", JSON.stringify(res))
                _mm.setStorage("userInfo", res)
                this.props.history.push(this.state.redirect)
            }, (errMsg)=> {
                _mm.errorTips(errMsg)
            })
        }
        // 验证不通过
        else {
            _mm.errorTips(checkResult.msg)
        }
      
    }
    render() {
        return (
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">欢迎登录--管理系统</div>
                        <div className="panel-body">
                        <div>
                            <div className="form-group">
                                 <input 
                                    type="text" 
                                    name="username"
                                    className="form-control" 
                                    placeholder="请输入用户名"
                                    onChange= {e=> {this.onInputChange(e)}}
                                    onKeyUp= {e=> {this.onInputKeyUp(e)}}/>
                             </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    name="password"                                    
                                    className="form-control" 
                                    placeholder="请输入密码"
                                    onChange= {e=> {this.onInputChange(e)}}
                                    onKeyUp= {e=> {this.onInputKeyUp(e)}}/>
                            </div>
                            <button     
                                className="btn btn-lg btn-block btn-primary"
                                onClick={ e=> { this.onSubmit(e)}}>登录</button>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login
