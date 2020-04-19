(function(win, doc){
    /**
     * 合并配置项 返回新的配置
     * @param {*} source 源配置
     * @param {*} target 目标配置
     */
    function extendOpt(source, target) {
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                source[key] = target[key];
            }
        }
        return source
    }

    /**
     * 判断是不是图片类型
     * @param {*} type  传入的类型
     */
    function isImage(type) {
        var reg = /(image\/jpeg|image\/jpg|image\/gif|image\/png)/gi;
        return reg.test(type)
    }
    function qFile(opt) {
        var defaultOpt = {
            el: doc.body,
            accept: "*",
            cName: "q-wrapper",
            beforeUpload: function() {

            },
            onProgress: function() {

            },
            onSuccess: function() {

            },
            onError: function() {

            }
        }
        // 优化dom选择
        if(opt.el){
            typeof opt.el === "string" ? document.querySelector(opt.el) : opt.el
        }
        // 合并配置项
        this.opt = extendOpt(defaultOpt, opt)

        this.value = ""
        // 初始化
        this.init()
       
    }
    // 初始化
    qFile.prototype.init = function() {
        this.render()
        this.watch()
    }
    // 渲染dom
    qFile.prototype.render = function() {
        var fragment = document.createDocumentFragment(),
            file = document.createElement("input"),
            imgBox = document.createElement("div");
            img = document.createElement("img")
        file.type = "file"
        file.accept = this.opt.accept || "*"
        file.className = "q-file"
        imgBox.className = "q-pre-container"
        img.className = "img"
        fragment.appendChild(file)
        imgBox.appendChild(img)
        fragment.appendChild(imgBox)
        this.opt.el.className = this.opt.cName
        this.opt.el.appendChild(fragment)
    }
    // 监听文件的上传
    qFile.prototype.watch = function() {
        var inputEl = doc.querySelector(".q-file")
        var that = this
        inputEl.addEventListener("change", function(e) {
            var file = e.target.files[0]
            var type = file.type
            that.value = file
            var fileReader = new FileReader()
            // 读取文件开始时
            fileReader.onloadstart = function(e) {
                // 判断是不是图片类型
                if(that.opt.accept !== "*" && that.opt.accept.indexOf(type.toLowerCase())){
                    fileReader.abort()
                    that.opt.beforeUpload(file, e)
                    console.error('文件格式有误', type.toLowerCase());
                }
            }
            // 读取成功
            fileReader.onload = function(e) {
                var imgBox = doc.querySelector(".q-pre-container")                
                var img = doc.querySelector(".img")
                if(isImage(type)) {
                    img.src = e.target.result
                }else {
                    imgBox.innerHTML = e.target.result
                }
                imgBox.title = file.name
                that.opt.onSuccess(e)
            }
            // 读取失败
            fileReader.onerror = function(e) {
                that.opt.onError(e)
            }
            // 读取中
            fileReader.onprogress = function(e) {
                // 显示进度条
                that.opt.onProgress(e)
            }

            isImage(type) ? fileReader.readAsDataURL(file) : fileReader.readAsText(file)
        })
    }
    // 清楚input 和组件的值 返回this 链式调用
    qFile.prototype.clearFile = function() {
        this.opt.el.querySelector(".q-file").value = ""
        this.value = ""
        return this
    }
    win.qFile = qFile
})(window, document)