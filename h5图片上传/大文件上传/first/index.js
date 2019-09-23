// 大文件分片处理   ====>>>  后台的大文件切片的处理   https://github.com/purplebamboo/blog/issues/17  
function handleFileSelect(event) {
    let { files } = event.target;
    if (!files.length) {
      return;
    }
    // 为了方便说明，这里仅仅读取第一个文件
    const file = files[0];
    // 读取前5个字节的内容
    const blob = file.slice(0, 5);
  
    const reader = new FileReader();
    // 控制台输出结果应该是：hello
    reader.onload = ev => console.log(ev.target.result);
    reader.readAsText(blob);
  }
  
  document
    .querySelector("#files")
    .addEventListener("change", handleFileSelect, false);
  