function sum(a, b) {
    return a + b;
}
export default sum;

// function fn() {
//     getValue = function(){
//         console.log(1)
//     }
//     return this
// }
// fn.getValue = function() {
//     console.log(2)
// }
// fn.prototype.getValue = function() {
//     console.log(3)
// }
// var getValue = function () {
//     console.log(4)
// }
// function getValue() {
//     console.log(5)
// }
// getValue() 4
// fn().getValue() 1
// getValue() 1 
// new fn.getValue() 2
// new fn().getValue() 3


// var a = 10
// var foo = {
//     a: 20,
//     bar: function() {
//         var a = 30
//         return this.a
//     }
// }
// console.log(foo.bar())  20 
// console.log((foo.bar)()) 20 
// console.log((foo.bar = foo.bar)()) 10 
// console.log((foo.bar, foo.bar)()) 10