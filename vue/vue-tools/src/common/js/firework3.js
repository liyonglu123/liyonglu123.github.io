var Fireworks = function() {
    this.time1 = 1;
}
Fireworks.prototype.clear = function() {
    console.log(this, this.time1)
}
export default Fireworks