// 自定义装饰器
import { createDecorator } from 'vue-class-component'
export const Log = createDecorator((options, key) => {
  const originalMethod = options.methods[key]
  options.methods[key] = function wrapperMethod(...args) {
    // Print a log.
    console.log(`Invoked: ${key}(`, ...args, ')')

    // Invoke the original method.
    originalMethod.apply(this, args)
  }
})
