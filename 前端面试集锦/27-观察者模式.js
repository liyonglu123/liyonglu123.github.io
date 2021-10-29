/**
 * 实现观察者模式
 * 分为观察者和被观察者，需要被观察者先收集观察者，当被观察者的状态改变时通知观察者，两者之间存在依赖关系
 * 被观察者数据发生变化时直接通知观察者改变
 * 应用： 学校教师和学生， addEventListener
 * 观察者模式好处是能够降低耦合，目标对象和观察者对象逻辑互不干扰，两者都专注于自身的功能，只提供和调用了更新接口；
 * 而缺点也很明显，在目标对象中维护的所有观察者都能接收到通知，无法进行过滤筛选。
 */

// 定义一个目标对象
class Subject {
  constructor() {
    this.Observers = [];
  }

  // 添加观察者
  add(observer) {
    this.Observers.push(observer);
  }

  // 移除观察者
  remove(observer) {
    // 最好通过唯一的标识 如 ID进行移除
    this.Observers.filter((item) => item !== observer);
  }

  // 通知所有观察者
  notify() {
    this.Observers.forEach((item) => {
      item.update();
    });
  }
}

// 定义观察者对象
class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(`my name is: ${this.name}`);
  }
}

// 测试
let sub = new Subject();
let ob1 = new Observer("observer1");
let ob2 = new Observer("observer2");

sub.add(ob1);
sub.add(ob2);
sub.notify();
