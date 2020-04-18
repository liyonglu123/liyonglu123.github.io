import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "components/page-title/index.jsx"
import CategorySelector from "./categorie-selector.jsx"
// 上传图片
import FileUploader from "utils/file-upload/index.jsx"
// 富文本编辑器
import RichEditor from "utils/rich-editor/index.jsx"
import Product from "service/product-service.jsx"
import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
const _product = new Product()
import "./save.scss"
class ProductSave extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            id: this.props.match.params.pid, // 区分新增和编辑
            name: "",
            subtitle: "",
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: "",
            stock: "",
            detail: "",
            status: 1, // 商品状态1 表示在售
        }
    }
    componentDidMount() {
        this.loadProduct()
    }
    // 请求加载商品详情
    loadProduct() {
        // 编辑 == 需要进行表单回填
        if(this.state.id) {
            _product.getProduct(this.state.id).then(res => {
                let images = res.subImages.split(",")
                res.subImages = images.map(imgUri => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                })
                res.defaultDetail = res.detail
                this.setState(res)
            }, errMsg => {
                _mm.errorTips(errMsg)
            })
        }
    }
    // 简单字段的改变
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }
    // 选择品类
    onCategoryChange(categoryId, parentCategoryId){
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })
    }
    // 上传图片成功
     onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    // 上传图片失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    // 删除图片
    onImageDelete(e) {
        let index = e.target.dataset.index,
            subImages = this.state.subImages;
        console.log("index", index)
        subImages.splice(index, 1)
        this.setState({
            subImages: subImages
        })
    }
    // 富文本编辑器内容变化
    onDetailValueChange(value){
        console.log(value)
        this.setState({
            detail: value
        })
    }
    getSubImagesString() {
        return this.state.subImages.map(image => image.uri).join(",")
    }
    // 提交表单
    onSubmit(e) {
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            subImages: this.getSubImagesString(),
            categoryId: parseInt(this.state.categoryId),
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status,
            detail: this.state.detail
        }
        
        let productCheckResult = _product.checkResult(product)
        // 编辑
        if(this.state.id) {
            product.id = this.state.id 
        }
        // 验证通过
        if(productCheckResult.status) {
            _product.saveProduct(product).then(res => {
                _mm.successTips(res)
                this.props.history.push("/product/index")
            }, errMsg=> [
                _mm.errorTips(errMsg)
            ])
        }
        // 验证不通过
        else {
            _mm.errorTips(productCheckResult.msg)
        }
    }
    render() {
        let title = this.state.id ? "编辑商品" : "添加商品"
        return (
            <div id="page-wrapper">
                <PageTitle title={title}/>
                <div className="row">
                    <div className="col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品名称"
                                name="name"
                                value={ this.state.name }
                                onChange={(e)=> {this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品描述"
                                name="subtitle"
                                value={ this.state.subtitle }
                                onChange={(e)=> {this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <CategorySelector 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {
                                this.onCategoryChange(categoryId, parentCategoryId)
                            }}/>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="商品价格"
                                    name="price"
                                    value={ this.state.price }
                                    onChange={(e)=> {this.onValueChange(e)}}/>
                                <span className="input-group-addon">元</span>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" 
                                    placeholder="商品库存"
                                    name="stock"
                                    value={ this.state.stock }
                                    onChange={(e)=> {this.onValueChange(e)}}/>
                                <span className="input-group-addon">件</span>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品图片</label>
                            <div className="col-md-10">
                               {
                                   this.state.subImages.length ? this.state.subImages.map((image, index)=> (
                                       <div className="img-con" key={index}>
                                           <img className="img" src={ image.url } alt=""/>
                                           <i className="fa fa-close" data-index={index} onClick={(e)=> {this.onImageDelete(e)}}></i>
                                       </div>
                                   )) : (<div>暂未上传图片，请上传图片</div>)
                               }
                            </div>
                            <div className="col-md-offset-2 col-md-10 file-upload-con">
                                <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                    onError={(errMsg) => this.onUploadError(errMsg)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-10">
                                <RichEditor 
                                    detail={this.state.detail}
                                    defaultDetail={this.state.defaultDetail}
                                    onValueChange={(value) => { this.onDetailValueChange(value)}}/>
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

export default ProductSave
