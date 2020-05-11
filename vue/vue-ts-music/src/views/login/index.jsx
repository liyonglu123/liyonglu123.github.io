import { __decorate } from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import { loginReq } from '@/api/user';
import Cookies from 'js-cookie';
let Login = class Login extends Vue {
    constructor() {
        super(...arguments);
        this.user_name = '';
        this.password = '';
    }
    login() {
        loginReq({ user_name: this.user_name, password: this.password }).then(res => {
            const { data: { code, msg } } = res;
            if (code === 0) {
                Cookies.set('token', 'value'); // 这里实际开发中不会在这个地方写，而是抽离到路由守卫或store中
                // 而且一般这个值不会是写死的字符串，而是从服务端返回的随机且唯一的字符串
                this.$router.push('/');
            }
            else {
                console.error(msg);
            }
        });
    }
    render() {
        return (<div class="login-page">
        <input v-model={this.user_name}/>
        <input v-model={this.password} type="password" style="margin-left: 10px;"/>
        <button style="margin-left: 10px;" on-click={this.login}>
          登录
        </button>
      </div>);
    }
};
Login = __decorate([
    Component
], Login);
export default Login;
//# sourceMappingURL=index.jsx.map