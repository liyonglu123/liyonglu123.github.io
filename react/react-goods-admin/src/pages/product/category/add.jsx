import React from "react"
import PageTitle from "components/page-title/index.jsx"
import Product from "service/product-service.jsx"
import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _product = new Product()
class CategoryAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ""
        }
    }
    componentDidMount() {
        this.loadCategoryList()
    }
    // 获取品类列表 显示父品类列表
    loadCategoryList() {
        // 请求接口
        _product.getCategoryList().then((res)=> {
            this.setState({
                categoryList: res
            })
        },errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 简单字段的改变
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }
    // 提交品类
    onSubmit(e) {
        let categoryName = this.state.categoryName.trim()
        if(categoryName) {
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then((res)=> {
               _mm.successTips(res)
               this.props.history.push("./product-category/index")
            },errMsg => {
                _mm.errorTips(errMsg)
            })
        }
        // 品类名称为空
        else {
            _mm.errorTips("请输入品类名称")
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属品类</label>
                            <div className="col-md-5">
                                <select name="parentId" className="form-control"
                                    onChange={(e)=>{this.onValueChange(e)}}>
                                    <option value="0">根品类</option>
                                    {
                                        this.state.categoryList.map((category, index)=> {
                                            return <option key={index} value={category.id}>根品类/{category.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">品类名称</label>
                            <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入品类名称"
                                name="categoryName"
                                value={ this.state.name }
                                onChange={(e)=> {this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-2 col-md-10">
                            <button className="btn btn-primary" onClick={(e)=> {this.onSubmit(e)}}>提交</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd
