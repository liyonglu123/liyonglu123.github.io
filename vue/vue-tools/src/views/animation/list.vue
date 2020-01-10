<template>
    <div id="list-demo" class="demo">
        <!-- <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list" tag="p">
            <span v-for="item in items" v-bind:key="item" class="list-item">
                {{ item }}
            </span>
        </transition-group> -->

        <!-- 过渡解决上面卡顿的问题 -->
        <!-- <div id="flip-list-demo" class="demo">
            <button v-on:click="shuffle">Shuffle</button>
            <transition-group name="flip-list" tag="ul">
                <li v-for="item in items" v-bind:key="item">
                    {{ item }}
                </li>
            </transition-group>
        </div> -->

        <!-- 列表的排序过渡 -->
        <!-- <div id="list-complete-demo" class="demo">
            <button v-on:click="shuffle">Shuffle</button>
            <button v-on:click="add">Add</button>
            <button v-on:click="remove">Remove</button>
            <transition-group name="list-complete" tag="p">
                <span v-for="item in items" v-bind:key="item" class="list-complete-item">
                    {{ item }}
    </span>
            </transition-group>
        </div> -->
        <!-- 列表的交错过渡 -->
        <!-- <div id="staggered-list-demo">
            <input v-model="query">
            <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                <li v-for="(item, index) in computedList" v-bind:key="item.msg" v-bind:data-index="index">{{ item.msg }}</li>
            </transition-group>
        </div> -->

        <!-- 可复用的过渡组件 -->
        <button @click="flag = !flag">toggle</button>

        <CusTransition>
            <div class="content" v-show="flag">
                <div class="title">可复用的过渡组件</div>
            </div>
        </CusTransition>
    </div>
</template>
<script>
    // import _ from "lodash";
    import Velocity from "velocity-animate";
    import CusTransition from "@/components/functional/functional"

    export default {
        data() {
            return {
                flag: true,
                // items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                // nextNum: 10,

                // 列表交错
                query: '',
                list: [
                    { msg: 'Bruce Lee' },
                    { msg: 'Jackie Chan' },
                    { msg: 'Chuck Norris' },
                    { msg: 'Jet Li' },
                    { msg: 'Kung Fury' }
                ]
            }
        },
        computed: {
            computedList: function () {
                var vm = this
                return this.list.filter(function (item) {
                    return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        },
        components: {
            CusTransition
        },
        methods: {
            // randomIndex: function () {
            //     return Math.floor(Math.random() * this.items.length)
            // },
            // add: function () {
            //     this.items.splice(this.randomIndex(), 0, this.nextNum++)
            // },
            // remove: function () {
            //     this.items.splice(this.randomIndex(), 1)
            // },
            // // 洗牌排序
            // shuffle: function () {
            //     this.items = _.shuffle(this.items)
            // }

            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 150  // 根据index可以实现不同的显示时间=== 如何进行分析的呢?  找到不同的点
                setTimeout(function () {
                    Velocity(
                        el, { opacity: 1, height: '1.6em' }, { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el, { opacity: 0, height: 0 }, { complete: done }
                    )
                }, delay)
            }
        }
    }
</script>
<style lang="less">
    // .list-item {
    //     display: inline-block;
    //     margin-right: 10px;
    // }

    // .list-enter-active,
    // .list-leave-active {
    //     transition: all 1s;
    // }

    // .list-enter,
    // .list-leave-to

    // /* .list-leave-active for below version 2.1.8 */
    //     {
    //     opacity: 0;
    //     transform: translateY(30px);
    // }

    // // 过渡动画
    // .flip-list-move {
    //     transition: transform 1s;
    // }


    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter,
    .list-complete-leave-to

    /* .list-complete-leave-active for below version 2.1.8 */
        {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }
</style>