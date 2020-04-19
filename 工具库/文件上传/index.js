window.addEventListener("DOMContentLoaded", function() {
    var inputFile = document.querySelector("#fileInput")
    var img = document.querySelector(".img")
    console.log(inputFile)
    inputFile.addEventListener("change", function(e) {
        var file = e.target.files[0]
        var fileReader = new FileReader();
        console.log(fileReader)
        fileReader.onloadstart = function() {
            console.log('开始上传')
        }
        fileReader.onload = function(e) {
            console.log('上传成功', e.target.result)
            img.src = e.target.result
        }
        fileReader.readAsDataURL(file)
    })
})