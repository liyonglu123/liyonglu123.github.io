class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data 中对应的属性名称
    this.key = key;
    // 回调函数负责更新试图
    this.cb = cb;
    // 把watcher对象记录到Dep的静态属性target上
    Dep.target = this;
    // 触发get方法， 在get方法中会调用addSub
    this.oldValue = vm[key];
    Dep.target = null;
  }
  // 当数据发生变化时更新视图
  update() {
    let newValue = this.vm[this.key];
    if (newValue === this.oldValue) {
      return;
    }
    this.cb(newValue);
  }
}
