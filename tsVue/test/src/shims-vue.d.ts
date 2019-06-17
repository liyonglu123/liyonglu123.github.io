declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// shims-vue.d.ts 主要用于 TypeScript 识别.vue 文件，Ts默认并不支持导入 vue 文件，这个文件告诉ts 导入.vue 文件都按VueConstructor<Vue>处理。
