import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
class User {
    // 登录接口
    login(loginInfo) {
        return  _mm.request({
                type: "post",
                url: "/manage/user/login.do",
                data: loginInfo
            });
    }
    // 检查用户登录的信息
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username)
        let password = $.trim(loginInfo.password)
        // 判断用户名不为空
        if(typeof username !== "string" || username.length === 0) {
            return {
                status: false,
                msg: "用户名不能为空"
            }
        }
        // 判断密码不为空
        if(typeof password !== "string" || password.length === 0) {
            return {
                status: false,
                msg: "密码不能为空"
            }
        }
        return {
            status: true,
            msg: "验证通过"
        }
    }
}
export default User