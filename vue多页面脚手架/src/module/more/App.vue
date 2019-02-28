<template>
  <div id="app">
     <HeaderItem></HeaderItem>
    <router-view></router-view>
    <FooterItem></FooterItem>
  </div>
</template>

<script>
import "src/common/css/reset.css";
import HeaderItem from "components/Header";
import FooterItem from "components/Footer";
export default {
  name: "app",
  components: {
    HeaderItem,
    FooterItem
  }
};
</script>

<style>
@import "../../common/css/fontface.css";
</style>
