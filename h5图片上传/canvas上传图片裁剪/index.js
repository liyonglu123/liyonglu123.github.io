document.querySelector('.file').addEventListener('change', function (event) {
    var files = event.target.files;
    // onloadstart回调
    let vm = document.createDocumentFragment();
    const handleLoadStart = (ev, file) =>
        console.log(`>>> Start load ${file.name}`);
    // onload回调
    const handleOnload = (ev, file) => {
        console.log(`<<< End load ${file.name}`);

        const img = document.createElement("img");
        img.height = 300;
        img.width = 300;
        img.src = ev.target.result;
        vm.appendChild(img);
        // 完成加载后，将其放入dom元素中
        document.querySelector("#images").appendChild(vm);
        // 画canvas
        var c = document.querySelector("#canvas");
        var ctx = c.getContext("2d");
        // ctx.drawImage(img, 0, 0, 300, 300);
        // 裁剪区域
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();

        // 裁剪
        document.querySelector('.clip').addEventListener('click', function () {
            // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            var c1 = document.querySelector("#canvas1");
            var ctx1 = c1.getContext("2d");
            ctx1.drawImage(img, 100, 100, 100, 100,0,0);
            // ctx.rect(0,0,50,50);  
            // ctx.stroke(); 
            // ctx.clip();   
        });
    };

    for (let file of files) {
        const reader = new FileReader();
        reader.onloadstart = ev => handleLoadStart(ev, file);
        reader.onload = ev => handleOnload(ev, file);
        // 读取文件对象
        reader.readAsDataURL(file);
    }
}, false)