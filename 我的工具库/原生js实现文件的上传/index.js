//  File  API
document.querySelector('input').onchange = function (e) {
    console.log(this.files)
}
// 文件的拖拽
// var textArea = document.querySelector('textarea');
// textArea.ondragover = function () {
//     return false;
// }
// textArea.ondrop = function (e) {
//     e.stopPropagation();
//     e.preventDefault();
//     e = e || window.event;
//     var files = e.dataTransfer.files;
//     console.log(files);
// }
//  Blob 二进制数据
// 1. 构造函数
var a = ["hello", "world"];
var myBlob = new Blob(a, { "type" : "text/xml" });
console.log(myBlob);
//  2. slice
var b = ["hello", "world"];
var myBlob = new Blob(b, { "type" : "text/xml" });
var newBlob = myBlob.slice(0, 5);
console.log(newBlob);
// FileReader 
// readAsText(Blob|File, opt_encoding)：返回文本字符串。默认情况下，文本编码格式是 UTF-8，可以通过可选的格式参数，指定其他编码格式的文本。
// readAsDataURL(Blob|File)：返回一个基于 Base64 编码的 data-uri 对象。
// readAsArrayBuffer(Blob|File)：返回一个 ArrayBuffer 对象。
// onabort 方法：读取中断或调用 reader.abort() 方法时触发。
// onerror 方法：读取出错时触发。
// onload 方法：读取成功后触发。
// onloadend 方法：读取完成后触发，不管是否成功。触发顺序排在 onload 或 onerror 后面。
// onloadstart 方法：读取将要开始时触发。
// onprogress 方法：读取过程中周期性触发。（可以用来获取文件读取的进度）
// ==============================================================
// URL
// var objecturl =  window.URL.createObjectURL(blob);

var blob = new Blob(["Hello hanzichi"]);
var c = document.createElement("a");
c.href = window.URL.createObjectURL(blob);
c.download = "a.txt";
c.textContent = "Download";
document.body.appendChild(c);

//  上面三种的村子啊都依赖于页面    而 URL能给能给他们一个临时的地址
{/* <input type='file' multiple /><br/>
// <img /> */}

document.querySelector("input").onchange = function() {
  var files = this.files;
  document.querySelector("img").src = window.URL.createObjectURL(files[0]);
}
//  Canvas & dataURL & Blob  他们之间的对比和实现的方式
// canvas == toDataURL  ==>  canvas转化为dataURL形式的base64编码 而 Blob 也可以转为 dataURL
// 他们三者又是如何进行转化的呢？ 
// （1）canvas -> dataURL

// 用 toDataURL 方法，比较简单，不多说。

// （2）blob -> dataURL

// 用 FileReader 的 readAsDataURL 方法，使用方式可以看 这个 demo

// （3）dataURL -> blob