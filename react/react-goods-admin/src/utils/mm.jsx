class MUtil {
    request(param){
        // 封装成为promise 方便进行链式调用
        return new Promise((resolve, reject)=> {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success: (res) =>{
                    // 请求成功
                    if(0 === res.status) {
                        typeof resolve == "function" && resolve(res.data, res.msg)
                    }
                    // 没有登录信息， 强制登录
                    else if(10 === res.status) {
                        this.doLogin()
                    }
                    else {
                        typeof reject == "function" && reject(res.msg || res.data)
                    }
                },
                error: (err) =>{
                    typeof reject == "function" && reject(err.statusText)
                }
            })
        })

    }
    // 跳转到登录页面
    doLogin() {
        window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname)
    }
    // 获取url参数
    getUrlParam(name) {
        // xxx.com?param1=123&param2=456  
        // param1=123&param2=456  
        let queryString = window.location.search.split("?")[1] || "",
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
            // result : ["param1=123", "", 123, "$"]
        return result ? decodeURIComponent(result[2]) : null

    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || "好像哪里不对了~")
    }
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || "操所成功!")
    }
    // 本地存储  如何添过期时间的处理  ？
    setStorage(name, data) {
        let dataType = typeof data;
        if (dataType === "object") {
            window.localStorage.setItem(name, JSON.stringify(data))
        }else if(["number", "string", "boolean"].indexOf(dataType) >=0) {
            window.localStorage.setItem(name, data)
        }else {
            alert("该类型不能用于存储！")
        }
    }
    // 读取本地存储
    getStorage(name) {
        let data = window.localStorage.getItem(name)
        if(data) {
            return JSON.parse(data)
        }else {
            return ""
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name)
    }
}

export default MUtil