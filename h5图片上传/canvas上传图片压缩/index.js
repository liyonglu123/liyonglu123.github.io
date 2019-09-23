var file = document.querySelector("[type=file]");
file.addEventListener("change", function (e) {
    for (var i = 0, f; f = e.target.files[i]; i++) {
        if (f.type.indexOf("image") !== 0) continue;
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.src = e.target.result;
            document.getElementById("preview").appendChild(img);

            // canvas压缩
            var images = document.querySelectorAll("#preview img");
            console.log(images);
            var dstWidth = 400,
                dstHeight = 300;
            var compressedImages = [];
            [].forEach.call(images, function (image) {
                var canvas = document.createElement("canvas");
                canvas.width = dstWidth;
                canvas.height = dstHeight;
                canvas.getContext("2d").drawImage(image); // 这里传入img元素对象
                var compressed = canvas.toDataURL("image/jpeg", 0.7);
                // 上传
                function b64toBlob(b64Data, contentType, sliceSize) {
                    contentType = contentType || '';
                    sliceSize = sliceSize || 512;

                    var byteCharacters = atob(b64Data);
                    var byteArrays = [];

                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        var slice = byteCharacters.slice(offset, offset + sliceSize);

                        var byteNumbers = new Array(slice.length);
                        for (var i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                        }

                        var byteArray = new Uint8Array(byteNumbers);

                        byteArrays.push(byteArray);
                    }

                    var blob = new Blob(byteArrays, { type: contentType });
                    return blob;
                }
                var fileBlob = b64toBlob(compressed.substr(23), "image/jpeg");
                var fd = new FormData();
                fd.append("file", fileBlob);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "upload.php");
                xhr.send(fd)
                compressedImages.push(compressed);
            });
            console.log(compressedImages);
        }
        reader.readAsDataURL(f);
    }
}, false);