class MUtil {
    request(param){
        // 封装成为promise 方便进行链式调用
        return new Promise((resolve, reject)=> {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success(res) {
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
                error(err) {
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
        alert(errMsg || "66")
    }
}

export default MUtil