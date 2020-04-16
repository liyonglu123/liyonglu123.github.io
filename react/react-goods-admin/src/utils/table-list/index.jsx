import React from "react"

// 通用的列表
class TableList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFirstLoading: true,

        }
    }
    // 传递参数 props变化的时候执行
    componentWillReceiveProps() {
        // 列表第一次挂载的时候为true
        this.setState({
            isFirstLoading: false
        })
    }
   render() {
    // 表头信息
    let tableHeader = this.props.tableHeads.map((item, index)=> {
        return <th key={index}>{ item }</th>
    })
    // 列表信息
    let listBody = this.props.children // 获取包裹的信息
    // 列表信息
    let listInfo = (
        <tr>
            <td colSpan={this.props.tableHeads.length} className="text-center">{ this.state.firstLoading ? "正在加载数据。。。" : "没有找到相应的结果~~" }</td>
        </tr>   
    )
    let tableBody = listBody.length > 0 ? listBody : listInfo    
    return(
        <div className="row">
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                       { tableHeader }
                    </tr>
                </thead>
                <tbody>{ tableBody }</tbody>
           </table>
        </div>
    </div>
    )
   }
}
export default TableList