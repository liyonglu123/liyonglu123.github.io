<template>
    <div class="container">
        <!-- 使用钩子函数 -->
        <!-- <button @click="toggle">toggle</button>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled">
            <p v-show="show">钩子的声明周期</p>
        </transition> -->
        <!-- 使用velocity.js -->
        <div id="example-4">
            <button @click="show = !show">
                Toggle
            </button>
            <transition appear v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
                <p v-if="show">
                    Demo
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
    import Velocity from 'velocity-animate';
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },

            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.transformOrigin = 'left'
            },
            enter: function (el, done) {
                Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
                Velocity(el, { fontSize: '1em' }, { complete: done })
            },
            leave: function (el, done) {
                Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
                Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
                Velocity(el, {
                    rotateZ: '45deg',
                    translateY: '30px',
                    translateX: '30px',
                    opacity: 0
                }, { complete: done })
            }
            // // --------
            // // 进入中
            // // --------

            // beforeEnter: function (el) {
            //     console.log(el)
            //     // ...
            // },
            // // 当与 CSS 结合使用时
            // // 回调函数 done 是可选的
            // enter: function (el, done) {
            //     console.log(el)
            //     // ...
            //     done()
            // },
            // afterEnter: function (el) {
            //     console.log(el)
            //     // ...
            // },
            // enterCancelled: function (el) {
            //     console.log(el)
            //     // ...
            // },

            // // --------
            // // 离开时
            // // --------

            // beforeLeave: function (el) {
            //     console.log(el)
            //     // ...
            // },
            // // 当与 CSS 结合使用时
            // // 回调函数 done 是可选的
            // leave: function (el, done) {
            //     console.log(el)
            //     // ...
            //     done()
            // },
            // afterLeave: function (el) {
            //     console.log(el)
            //     // ...
            // },
            // // leaveCancelled 只用于 v-show 中
            // leaveCancelled: function (el) {
            //     console.log(el)
            //     // ...
            // }
        }
    }
</script>
<style>
</style>