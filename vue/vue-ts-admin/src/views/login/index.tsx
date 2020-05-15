import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
@Component
export default class Login extends Vue {
  @Action('loginActions') public loginAction
  public user_name: string = ''
  public password: string | number = ''
  // 然后这里就可以直接调用loginAction方法
  // 效果和this.$store.dispatch('loginActions', { 参数 })是一样的
  public login() {
    this.loginAction({
      user_name: this.user_name,
      password: this.password
    }).then(() => {
      this.$router.push('/home')
    })
  }

  protected render() {
    return (
      <div class="login-page">
        <input v-model={this.user_name} />
        <input
          v-model={this.password}
          type="password"
          style="margin-left: 10px;"
        />
        <button style="margin-left: 10px;" on-click={this.login}>
          登录
        </button>
      </div>
    )
  }
}
