// 泛型  占位符
function echo(arg) {
    return arg;
}
var arg = echo(true);
// tuple
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var re = swap(["s", 100]);
// 泛型约束 
function echoWithArr(arg) {
    // console.log(arg.length)
    return arg;
}
function echoWithArr1(arg) {
    console.log(arg.length);
    return arg;
}
function echoWithLength(arg) {
    console.log(arg.length);
    return arg;
}
var string1 = echoWithLength("aaa");
var array1 = echoWithLength([1, 2, 3]);
var object1 = echoWithLength({ length: 10, width: 100 });
// const number1 = echoWithLength(100)
// 泛型 -- 类和接口
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        return this.data.push(item);
    };
    Queue.prototype.pop = function () {
        return this.data.shift();
    };
    return Queue;
}());
var queue = new Queue();
queue.push(1);
console.log(queue.pop().toFixed());
