<template>
    <transition
      name="very-special-transition"
      mode="out-in"
     @before-enter="beforeEnter"
     @after-enter="afterEnter">
        <slot></slot>
    </transition>
</template>
<script>
export default {
    // functional: true,
    data() {
        return {

        }
    },
    methods: {
        beforeEnter(el) {
            console.log(el, "beforeEnter");
        },
        afterEnter(el) {
            console.log(el,"afterEnter");
        }
    },
}
</script>
<style lang="less">
    
</style>