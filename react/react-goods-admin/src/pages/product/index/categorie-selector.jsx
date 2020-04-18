import React from "react"
import Product from "service/product-service.jsx"
import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _product = new Product()
import "./categorie-selector.scss"
// 品类选择器
class CategorySelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           firstCategoryList: [], 
           firstCategoryId: "",
           secondCategoryList: [], 
           secondCategoryId: ""
        }
    }
    componentDidMount() {
        this.loadFirstCategory()
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        // 都没变化的时候 不做处理
        if(!categoryIdChange && !parentCategoryIdChange) {
            return
        }
        // 只有一级品类
        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, ()=> {
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }
        
    }
    // 加载一级分类
    loadFirstCategory() {
        _product.getCategoryList().then(res=> {
            this.setState({
                firstCategoryList : res
            })
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res=> {
            this.setState({
                secondCategoryList : res
            })
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 选择一级品类
    onFirstCategoryChange(e) {
        if(this.props.readOnly) {
            return
        }
        let newValue = e.target.value || 0
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList : []
        }, ()=> {
            // 异步更新二级分类
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }  
    // 选择二级分类
    onSecondCategoryChange(e) {
        if(this.props.readOnly) {
            return
        }
        let newValue = e.target.value || 0
        this.setState({
            secondCategoryId: newValue,
        }, ()=> {
            this.onPropsCategoryChange()
        }) 
    }
    // 传给父组件的结果
    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === "function"
        // 有二级品类
        if(this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)  
        }
        // 只有一级品类
        else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0) 
        }
    } 
    render() {
        return (
            <div className="form-group">
                <label className="col-md-2 control-label">所属分类</label>
                <div className="col-md-10">
                    <select 
                        value={ this.state.firstCategoryId }
                        readOnly={this.props.readOnly}
                        disabled={this.props.disabled}
                        
                        onChange={(e)=> {this.onFirstCategoryChange(e)}} type="text" className="form-control cate-select">
                        <option value="">请选择一级分类</option>
                        {
                            this.state.firstCategoryList.map((category, index) => {
                               return <option value={category.id} key={index}>{category.name }</option>
                            })
                        }
                    </select>
                    {
                        this.state.secondCategoryList.length 
                        ? (
                            <select readOnly={this.props.readOnly} 
                                    disabled={this.props.disabled}
                                value={ this.state.secondCategoryId } onChange={(e)=> {this.onSecondCategoryChange(e)}} type="text" className="form-control cate-select">
                                 <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category, index) => {
                                    return <option value={category.id} key={index}>{category.name }</option>
                                })
                            }
                            </select>
                        )
                        : null
                    }
                   
                </div>
            </div>
        )
    }
}

export default CategorySelector
