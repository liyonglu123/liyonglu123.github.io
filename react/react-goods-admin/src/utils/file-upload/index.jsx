import React        from 'react'
import FileUpload   from './react-fileupload.jsx'
// import FileUpload   from 'react-fileupload'

// 上传图片
class FileUploader extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        const options={
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,
            uploadSuccess   : (res) => {
                this.props.onSuccess(res.data)
            },
            uploadError     : (err) => {
                this.props.onError(err.message || '上传图片出错啦')
            }
        }
        return (
            <FileUpload options={options}>
            {/* ref 必须写 */}
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )           
    }
}
export default FileUploader