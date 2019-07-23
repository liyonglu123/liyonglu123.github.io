<template>
    <div>
        <div id="father">
            <div v-drag-scale class="box" :style="{width:item.width + 'px', height:item.height + 'px', position: 'absolute', top: item.top + 'px', left: item.left + 'px', cursor: 'move', backgroundColor: item.color }" v-for="(item, index) in list" :key="index">
                <div class="aim">
                    {{ item.content }}
                </div>
                    <div class="simple horizontal"></div>
                    <div class="simple vertical"></div>
                    <div class="double scale"></div>
                </div>
            </div>
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标签类型">
                        <el-select v-model="form.type" placeholder="请选择标签类型">
                            <el-option label="div" value="div"></el-option>
                            <el-option label="input" value="input"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签内容">
                        <el-input v-model="form.content"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="addEle">添加</el-button>
            </div>
        </div>


</template>
<script>
    import { deepCopy, getRandom } from "@/utils/tool"
    export default {
        data() {
            return {
                list: [],
                form: {
                    type: "",
                    content: "",
                }
            }
        },
        mounted() {},
        methods: {
            // 添加元素
            addEle() {
                let form = {
                    width: 150,
                    height: 100,
                    top: getRandom(0, 400),
                    left: getRandom(0, 450),
                    color: 'red'
                }
                let list = deepCopy(this.list);
                form = Object.assign({}, form, this.form);
                list.push(form);
                this.list = list;
            }
        }
    }
</script>
<style scoped>
    #box {
        width: 100px;
        height: 100px;
        background-color: aquamarine;
        position: absolute;
        cursor: move;
    }

    #father {
        width: 50%;
        height: 500px;
        background-color: rgb(226, 117, 184);
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        cursor: move;
    }

    .aim {
        width: 100%;
        height: 100%;
    }

    .simple {
        position: absolute;
        font-size: .1px;
        display: block;
    }

    .horizontal {
        cursor: e-resize;
        width: 7px;
        right: -5px;
        top: 0;
        height: 100%;
    }

    .vertical {
        cursor: s-resize;
        height: 7px;
        width: 100%;
        bottom: -5px;
        left: 0;
    }

    .scale {
        width: 10px;
        height: 10px;
        overflow: hidden;
        cursor: se-resize;
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: rgb(122, 191, 238);
    }
</style>