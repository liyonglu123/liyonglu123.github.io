//判断照片文件大小 obj为input js元素 size单位为KB
export function checkPhoto(fileId,size) {
    var obj=document.getElementById(fileId);
    var photoExt = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase();//获得文件后缀名
    if (photoExt != 'jpg' && photoExt != 'png' && photoExt != 'gif' && photoExt != 'jpeg') {
        console.log(photoExt);
        return false;
    }
    var fileSize = 0;
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE && !obj.files) {
        var filePath = obj.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = obj.files[0].size;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    if(fileSize>size){
    	 alert("照片最大尺寸为"+size+"，请重新上传!");
        obj.value=null;
        return false;
    }
    return true;
}

//预览图片
function preview(fileId, imgId) {
    var file = document.getElementById(fileId);
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            $("#" + imgId).attr("src", evt.target.result);
        }
        reader.readAsDataURL(file.files[0]);
    }
}

//上传文件
export function uploadFile(url, fileInputId, callback) {
    var fd = new FormData();
    fd.append("fileToUpload", document.getElementById(fileInputId).files[0]);
    var xhr = new XMLHttpRequest();
    //xhr.upload.addEventListener("progress", uploadProgress, false);//上传进度
    xhr.addEventListener("load", callback, false);
    xhr.open("POST", url);
    xhr.send(fd);
}
//上传进度
export function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML =
            percentComplete.toString() + "%<div style='height:5px;background-color:red;width:" + percentComplete.toString() + "%'></div>";
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}
//上传图片 并在完成时预览图片
export function uploadImgFile(url,fileInputId, imgId) {
    function uploadImgFileCallBack(evt) {
        /* 服务器端返回响应时候触发event事件*/
        var data = JSON.parse(evt.target.responseText);
        console.log(data);
        preview(fileInputId, imgId);
    }

    uploadFile(url, fileInputId, uploadImgFileCallBack);
}
