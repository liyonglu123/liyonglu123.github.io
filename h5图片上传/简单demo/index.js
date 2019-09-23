// filereader文档 https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
// 参考地址:  https://juejin.im/post/5d35af63e51d454fa33b199e#heading-6 
if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    throw new Error("当前浏览器对FileAPI的支持不完善");
}

function handleFileSelect(event) {
    const { files } = event.target;
    if (!files.length) {
        console.log("没有选择文件");
        return;
    }

    const innerHTML = [];
    const reImage = /image.*/;

    for (let file of files) {
        if (!reImage.test(file.type)) {
            continue;
        }

        innerHTML.push(
            `
        <li>
          <strong>${file.name}</strong>
          (${file.type || "n/a"}) -
          ${file.size} bytes
        </li>
        `
        );
    }

    document.querySelector("#list").innerHTML = `<ul>${innerHTML.join("")}</ul>`;
}

function handleFileSelect(event) {
    let { files } = event.target;
    if (!files.length) {
        return;
    }

    let vm = document.createDocumentFragment(),
        re = /image.*/,
        loaded = 0, // 完成加载的图片数量
        total = 0; // 总共图片数量

    // 统计image文件数量
    for (let file of files) {
        re.test(file.type) && total++;
    }

    // onloadstart回调
    const handleLoadStart = (ev, file) =>
        console.log(`>>> Start load ${file.name}`);
    // onload回调
    const handleOnload = (ev, file) => {
        console.log(`<<< End load ${file.name}`);

        const img = document.createElement("img");
        img.height = 250;
        img.width = 250;
        img.src = ev.target.result;
        vm.appendChild(img);

        // 完成加载后，将其放入dom元素中
        if (++loaded === total) {
            document.querySelector("#images").appendChild(vm);
        }
    };

    for (let file of files) {
        if (!re.test(file.type)) {
            continue;
        }

        const reader = new FileReader();
        reader.onloadstart = ev => handleLoadStart(ev, file);
        reader.onload = ev => handleOnload(ev, file);
        // 读取文件对象
        reader.readAsDataURL(file);
    }
}

document
    .querySelector("#files")
    .addEventListener("change", handleFileSelect, false);

/** 
 * 文件读取需要使用FileReader对象，它常用 3 个回调方法：

onload: 文件读取完成
onloadstart：文件上传开始
onprogress : 文件上传中触发

和Image类似，在读取文件之前，需要先绑定事件处理。它读取操作有：readAsArrayBuffer、readAsDataURL、readAsBinaryString、readAsText。传入的参数就是File对象
*/
// function handleFileSelect(event) {
//     let { files } = event.target;
//     if (!files.length) {
//       return;
//     }

//     const handleLoadStart = (ev, file) =>
//       console.log(`>>> Start load ${file.name}`);
//     const handleProgress = (ev, file) => {
//       if (!ev.lengthComputable) {
//         return;
//       }
//       // 计算进度，并且以百分比形式展示
//       const percent = Math.round((ev.loaded / ev.total) * 100);
//       console.log(`<<< Loding ${file.name}, progress is ${percent}%`);
//     };

//     for (let file of files) {
//       const reader = new FileReader();
//       reader.onloadstart = ev => handleLoadStart(ev, file);
//       reader.onprogress = ev => handleProgress(ev, file);
//       reader.readAsArrayBuffer(file); // 显示进度条的问题
//     }
//   }

//   document
//     .querySelector("#files")
//     .addEventListener("change", handleFileSelect, false);