import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "components/page-title/index.jsx"
import TableList from "utils/table-list/index.jsx"
import Product from "service/product-service.jsx"
import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _product = new Product()
class ProductCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount() {
        this.loadCategoryList()
    }
    // 同一个组件时候 
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        console.log(this.props.match.params.categoryId)
        console.log(newId)
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId : newId
            }, ()=> {
                this.loadCategoryList()
            })
        }
    }
    // 获取品类列表
    loadCategoryList() {
        // 请求接口
        _product.getCategoryList(this.state.parentCategoryId).then((res)=> {
            this.setState({
                list: res
            })
        },errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg)
        })
    }
    // 修改名称
    onEditCategoryName(categoryId, categoryName) {
        let newName = window.prompt("请输入新的品类名称", categoryName)
        if(newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _mm.successTips(res)
                this.loadCategoryList()
            }, errMsg=> {
                _mm.errorTips(errMsg)
            })
        }
    }
    render() {
        let tableHeads = [
            {name: "品类ID", width: "10%"},
            {name: "品类名称", width: "40%"},
            {name: "操作", width: "50%"}
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="品类管理">
                    <Link to="/product-category/add" className="btn btn-primary product-add">
                        <i className="fa fa-plus"></i>
                        <span>添加品类</span>
                    </Link>
                </PageTitle>
               
                <div className="row">
                    <div className="col-md-12">
                        <p>父分类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((category, index)=> {
                            return (
                                <tr key={ index }>
                                    <td>{ category.id }</td>
                                    <td>
                                       {category.name }
                                    </td>
                                    <td>
                                        <a className="opera" onClick={(e)=> {this.onEditCategoryName(category.id, category.name)}}>修改名称</a>
                                        {
                                            category.parentId === 0 ? 
                                                <Link className="opera" to={ `/product-category/index/${category.id}` }>查看其子品类</Link>
                                            : null
                                            
                                        }
                                    </td>
                                </tr>
                             )
                        })
                    }
                </TableList>
            </div>
        )
    }
}

export default ProductCategory
