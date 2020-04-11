// 修饰符 public  private protected    readonly
// 静态属性和静态方法
class Animal1 {
    protected name: string;
    static types: string[]  = ["a", "b"];
    static isAnamial(a: Animal1) {
        return a instanceof Animal1
    }
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}
const snake = new Animal1("she")
// console.log(Animal1.types)
// console.log(Animal1.isAnamial(snake))


// console.log(snake.name)
class Dog extends Animal1{
    dark() {
        return `${this.name} is barking`
    }
}

const dog = new Dog("dog")

// console.log(Animal1.isAnamial(dog))
// console.log(dog.dark())

// 重写 多态


class Mao extends Animal1 {
    constructor(name: string) {
        super(name)
        // console.log(this.name)
    }
    // 重写父类方法
    run() {
        return `miao` + super.run()
    }
}

const miao = new Mao("a miao")
// console.log(miao.run())

//  ============ 类和接口=============

interface Radio {
    switchRadio(): void;
}
interface Bettery {
    checkStatus(): void;
}

interface RadioWithBettery extends Radio{
    checkStatus(): void;
}
class Tv implements Radio{
    switchRadio() {

    }
}
// class Phone implements Radio, Bettery {
//     switchRadio() {
        
//     }
//     checkStatus() {

//     }
// }

class Phone implements RadioWithBettery{
    switchRadio() {
        
    }
    checkStatus() {

    }
}