<template>
  <div class="t-main-wrap">
    <!-- 布局容器组件 -->
    <a-layout style="height: 100%">
      <!-- 左侧容器组件 -->
      <a-layout-sider>
        <a-menu
          @click="handleClickMenu"
          :selected-keys="[this.$route.path]"
          theme="dark"
          mode="inline"
        >
          <a-menu-item key="/home">首页</a-menu-item>
          <a-menu-item key="/about">关于</a-menu-item>
          <a-menu-item key="/chart">图表</a-menu-item>
          <a-menu-item key="/editor">富文本编辑器</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 顶部容器组件 -->
        <a-layout-header class="t-main-header">
          <a-dropdown>
            <a-avatar>{{ userName }}</a-avatar>
            <a-menu slot="overlay" @click="handleClickAvatarMenu">
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-layout-header>
        <!-- 内容容器组件 -->
        <a-layout-content>
          <!-- 路由视图渲染组件 -->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import Cookie from 'js-cookie'
@Component({ name: 'TMain' })
export default class TMain extends Vue {
  @State('user_name') userName //// 将store.state.user_name赋给userName
  @Mutation('setUserInfoMutations') setUserInfo
  handleClickMenu({ item, key, keyPath }) {
    this.$router.push({
      path: key
    })
  }
  handleClickAvatarMenu({ item, key, keyPath }) {
    if (key === 'logout') {
      this.logout()
    }
  }
  logout() {
    this.setUserInfo({ user_name: '', email: '' })
    Cookie.set('token', '')
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.t-main-wrap {
  height: 100%;
  .t-main-header {
    background: #fff;
  }
}
</style>
