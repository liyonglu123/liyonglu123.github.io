<template>
    <div class="star-container">
        <!-- 用户可点击进行评分等级交互 -->
        <div class="star-wrapper" v-if="userFlag">
            <span class="star-item" :style="{color: starColor(index+1)}" v-for="(item, index) in ratingScoreList" :key="index" @click="clickHandler(item, index)">
                {{ item }}
            </span>
        </div>
        <!-- 单纯的展示评分等级不能进行点击交互 -->
        <div v-else class="star-wrapper">
            <span class="star-item" v-for="(item, index) in scoreList" :key="index">
                {{ item }}
            </span>
        </div>
    </div>
</template>
<script>
    const ON = "on";
    const HALF = "half";
    const OFF = "off";
    const LENGTH = 5;
    export default {
        data() {
            return {
                starColorArr: ["gray", "red", "orange", "yellow", "greenyellow", "green"]
            }
        },
        props: {
            score: {
                type: Number
            },
            userFlag: {
                type: Boolean,
                default: false
            },
            ratingScore: {
                type: Number,
                default: 0
            }
        },
        computed: {
            // 根据score来显示不同的星级评分
            scoreList() {
                let result = [];
                // 算法规则 Math.floor(score * 2)/2
                let score = Math.abs(Math.floor(this.score * 2) / 2);
                let decimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(ON);
                }
                if (decimal) {
                    result.push(HALF);
                }
                while (result.length < LENGTH) {
                    result.push(OFF);
                }
                console.log(result);
                return result;
            },
            // 根据ratingScore来显示不同的星级评分
            ratingScoreList() {
                let result = [];
                // 算法规则 Math.floor(score * 2)/2
                let ratingScore = Math.abs(Math.floor(this.ratingScore * 2) / 2);
                let decimal = ratingScore % 1 !== 0;
                let integer = Math.floor(ratingScore);
                for (let i = 0; i < integer; i++) {
                    result.push(ON);
                }
                if (decimal) {
                    result.push(HALF);
                }
                while (result.length < LENGTH) {
                    result.push(OFF);
                }
                console.log(result);
                return result;
            },
            // 根据不同的星级显示不同的颜色
            starColor() {
                return function(i) {
                    if(i <= this.ratingScore ) {
                       return this.starColorArr[this.ratingScore];
                    }else {
                       return this.starColorArr[0];
                    }
                }               
                // switch (this.ratingScore) {
                // case 0:
                //     return "star-item_0"
                //     break;
                // case 1:
                //     return "star-item_1"
                //     break;
                // case 2:
                //     return "star-item_2"
                //     break;
                // case 3:
                //     return "star-item_3"
                //     break;
                // case 4:
                //     return "star-item_4"
                //     break;
                // case 5:
                //     return "star-item_5"
                //     break;
                // default:
                //     return "star-item_0"
                //     break;
                // }
            }
        },
        methods: {
            // 点击改变星星的等级 
            clickHandler(item, index) {
                this.$emit("starHandler", index);
            }
        }
    }
</script>

<style lang="less">
    .star-item {
        font-size: 24px;
        &.star-item_0 {
            color: gray;
        }
        &.star-item_1 {
            color: red;
        }
        &.star-item_2 {
            color: orange;
        }
        &.star-item_3 {
            color: yellow;
        }
        &.star-item_4 {
            color: greenyellow;
        }
        &.star-item_5 {
            color: green;
        }
    }
</style>