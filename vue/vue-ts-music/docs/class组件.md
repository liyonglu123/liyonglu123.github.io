# Vue 与 typescript 的结合应用说明

> 主要是对[vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator)和[vuex-class](https://www.npmjs.com/package/vuex-class)的一些说明和代码示例

## 1.Vue

### **Component**

#### ts:

```ts
import { Vue, Component } from 'vue-property-decorator'

/**
 * @Component
 * 中可接受一个对象基本可以视作曾经的
 * export default的对象来使用
 * 不过为了更好的一致性
 * 希望可以尽可能的使用class的方式来构建组件
 * 当没有参数时可以省略({})
 */
@Component({
  name: 'YourComponent',
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    }
  }
})
export default class YourComponent extends Vue {}
```

#### js:

```javascript
export default {
  name: 'YourComponent',
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    }
  }
}
```

### **Mixin**

```typescript
// mixin.ts
import Vue from 'vue'
import Component from 'vue-class-component'

// 你可以声明一个混合组件相同的样式。
@Component
export default class MyMixin extends Vue {
  mixinValue = 'Hello'
}
```

```typescript
// component.vue
import Component, { mixins } from 'vue-class-component'
import MyMixin from './mixin.js'

// 使用mixins(MyMixin)来替代原本的Vue
// `mixins` 可以接受任意数量的参数
@Component
export class MyComp extends mixins(MyMixin) {
  created() {
    console.log(this.mixinValue) // -> Hello
  }
}
```

### **data**

#### ts:

```typescript
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  /**
   * 所有需要使用的字段都需要在类中声明,
   */
  foo: string
  bar: number
  data () {
    return {
      // 需要响应式的字段,最好在data中赋予初始值
      foo: 'hello',
      bar: 123
  }
}
```

#### js:

```javascript
export default {
  name: 'YourComponent',
  data() {
    return {
      foo: 'hello',
      bar: 123
    }
  }
}
```

### **method**

> 基本来说只要褪去 method 层并且去掉中间的逗号就好了

#### ts:

```typescript
@Component
export default class YourComponent extends Vue {
  eat() {
    console.log('eat some thing')
  }
  say() {
    console.log('say something')
  }
}
```

#### js:

```javascript
export default {
  method() {
  eat() {
    console.log('eat some thing')
  },
  say() {
    console.log('say something')
  }
  }
}
```

### **computed**

> 去掉 computed 层,去掉逗号然后加上 get 的前缀即可

#### ts:

```typescript
@Component
export default class YourComponent extends Vue {
  width: number
  height: number
  data() {
    return {
      width: 10,
      height: 10
    }
  }
  get area() {
    const { width, height } = this
    return width * height
  }
}
```

#### js:

```javascript
export default {
  name: 'YourComponent',
  data() {
    return {
      width: 10,
      height: 10
    }
  },
  computed: {
    area() {
      const { width, height } = this
      return width * height
    }
  }
}
```

### **Prop**

```typescript
@Prop(options: (PropOptions | Constructor[] | Constructor) = {}) decorator
```

#### ts:

```typescript
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC!: string | boolean
}
```

#### js:

```javascript
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    }
  }
}
```

### **Model**

```typescript
@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {}) decorator
```

#### ts:

```typescript
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) checked!: boolean
}
```

#### js:

```javascript
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean
    }
  }
}
```

### **Watch**

```typescript
@Watch(path: string, options: WatchOptions = {}) decorator
```

#### ts:

```typescript
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch('person')
  onChildChanged2(val: Person, oldVal: Person) {}
}
```

#### js:

```javascript
export default {
  watch: {
    'child': [
      {
        handler: 'onChildChanged',
        immediate: false,
        deep: false
      }
    ],
    'person': [
      {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true
      },
      {
        handler: 'onPersonChanged2',
        immediate: false,
        deep: false
      }
    ]
  },
  methods: {
    onChildChanged(val, oldVal) { },
    onPersonChanged1(val, oldVal) { }
    onPersonChanged2(val, oldVal) { }
  }
}
```

### **Emit**

```typescript
@Emit(event?: string) decorator
```

#### ts:

```typescript
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

#### js:

```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}
```

### **Provide**

```typescript
@Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey) decorator
```

#### ts:

```typescript
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Vue {
  @Inject() foo!: string
  @Inject('bar') bar!: string
  @Inject({ from: 'optional', default: 'default' }) optional!: string
  @Inject(symbol) baz!: string

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```

#### js:

```javascript
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({
  inject: {
    foo: 'foo',
    bar: 'bar',
    optional: { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data() {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```

# 2. vuex

> vuex-class 的使用非常简单方便

```typescript
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const someModule = namespace('path/to/module')

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  // 如果省略的参数,使用属性名
  // 以下分别是 state/getter/action/mutation 的示例
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created() {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```
