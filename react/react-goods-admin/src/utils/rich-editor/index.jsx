import React from "react"
import Simditor from 'simditor';
import "simditor/styles/simditor.scss"
import "./index.scss"
// 通用的富文本编辑器  基于jquery
class RichEditor extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.loadEidtor()
    }
    componentWillReceiveProps(nextProps) {
        // 防止多次渲染
       if(this.props.defaultDetail !== nextProps.defaultDetail) {
        this.simditor.setValue(nextProps.defaultDetail) 
       }
    }
    // 加载编辑器
    loadEidtor() {
        let element = this.refs["editor"]
        console.log("element===", element)
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || "请输入内容",
            upload: {
                url: "/manage/product/richtext_img_upload.do",
                defaultImage: "",
                fileKey: "upload_file"
            }
        })
        this.bindEditorEvent()
    }
    // 初始化富文本事件
    bindEditorEvent() {
        this.simditor.on("valuechanged", e=> {
            this.props.onValueChange(this.simditor.getValue())
        })
    }
   render() {
    return(
        <div className="rich-editor">
            <textarea ref="editor"></textarea>
        </div>
    )
   }
}

export default RichEditor