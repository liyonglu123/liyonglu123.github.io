function Node(name) {
    this.name = name;
    this.parent = null;
    this.children = [];
}
Node.prototype.addChild = function (node) {
    node.parent = this;
    this.children.push(node);
    return this;
}
Node.prototype.siblings = function () {
    var self = this;
    if (this.parent) {
        return this.parent.children.filter(function (node) {
            return node !== self;
        })
    } else {
        return [];
    }
}

Node.prototype.getDegree = function() {
    return this.children.length;
}