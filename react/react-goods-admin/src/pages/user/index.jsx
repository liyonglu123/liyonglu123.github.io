import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "components/page-title/index.jsx"
import Pagination from "utils/pagination/index.jsx"
import TableList from "utils/table-list/index.jsx"
import User from "service/user-service.jsx"
import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _user = new User()
class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount() {
        this.loadUserList()
    }
    // 获取用户列表
    loadUserList() {
        _user.getUserList(this.state.pageNum).then((res)=> {
            this.setState(res, ()=> {
                this.setState({
                    firstLoading: false
                })
            })
        },errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg)
        })
    }
    // 页数发生变化时候
    onPageNumChange(pageNum) {
        // 异步函数
        this.setState({
            pageNum: pageNum
        },()=> {
            this.loadUserList()
        })
    }
    render() {
        let tableHeads = ["ID", "用户名","邮箱","电话","注册时间"];
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <TableList tableHeads={tableHeads}>
                        {
                            this.state.list.map((user, index)=> {
                                return (
                                    <tr key={ index }>
                                        <td>{ user.id }</td>
                                        <td>{ user.username }</td>
                                        <td>{ user.email }</td>
                                        <td>{ user.phone }</td>
                                        <td>{ new Date(user.createTime).toLocaleString() }</td>
                                    </tr>
                                )
                            })
                        }
                    </TableList>
                    <Pagination     
                        current={this.state.pageNum} 
                        total={this.state.total}
                        onChange={(pageNum)=> {this.onPageNumChange(pageNum)}}/>
                </div>
            </div>
        )
    }
}

export default UserList
