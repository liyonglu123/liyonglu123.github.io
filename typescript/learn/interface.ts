interface Person {
    readonly id: number;
    name: string;
    age?: number; // ? 可选属性
}

var zhang: Person = {
    id: 100,
    name: "zhangsan",
}
// readonly 修饰属性  const 修饰变量