import { __decorate } from "tslib";
import { Component, Vue, Prop, Model, Watch, Emit, Inject } from 'vue-property-decorator';
let MyMixin = class MyMixin extends Vue {
    constructor() {
        super(...arguments);
        this.mixinValue = 'mixins';
        // v-model 双向数据绑定的时候
        // set area(value: number) {}
    }
    //   model: {
    //       prop: 'checked',
    //       event: 'change'
    //   }
    //   props: {
    //       checked: {
    //           type: Boolean
    //       }
    //   }
    // 监听
    onWidthChange(val, oldVal) {
        console.log('width changed!', val, oldVal);
    }
    addAge() {
        // 如果是对象的话需要封装成一个对象进行处理
        return 100;
    }
    // 响应式字段最好在data中赋予初始值
    data() {
        return {
            width: 10,
            height: 10
        };
    }
    // 方法
    eat() {
        console.log('eat');
        const { name, age, sex } = this;
        console.log(name, age, sex);
    }
    say() {
        console.log('say');
    }
    changewidth() {
        this.width += 1;
    }
    // 计算属性
    get area() {
        console.log(this);
        const { width, height } = this;
        return width * height;
    }
};
__decorate([
    Prop(Number)
], MyMixin.prototype, "age", void 0);
__decorate([
    Prop({ default: 'zhangsan' })
], MyMixin.prototype, "name", void 0);
__decorate([
    Prop([String, Boolean])
], MyMixin.prototype, "sex", void 0);
__decorate([
    Model('change', { type: Boolean, default: true })
], MyMixin.prototype, "checked", void 0);
__decorate([
    Watch('width', { immediate: false, deep: false })
], MyMixin.prototype, "onWidthChange", null);
__decorate([
    Emit()
], MyMixin.prototype, "addAge", null);
__decorate([
    Inject()
], MyMixin.prototype, "foo", void 0);
MyMixin = __decorate([
    Component
], MyMixin);
export default MyMixin;
//# sourceMappingURL=common.js.map