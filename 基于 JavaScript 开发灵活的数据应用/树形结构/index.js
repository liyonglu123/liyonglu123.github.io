// class Tree {
//     constructor(name) {
//         this.name = name;
//         this.parent = null;
//     }
//     addChild(node) {
//         this.children.push(node);
//     }
// }
// export default Tree
/**
 * 1. 拷贝数据结构处理成所需的数据结构形式
 * 2. 结构和视图之间的转化问题
 * 3. 数据的相互转化问题
 */
function Tree(data) {
   this.init(data);
}
Tree.prototype = {
    constructor: Tree,
    // addChild: function (node) {
    //     this.children.push(node);
    // },
    init: function (data) {
        if(!data) { return }
        var id = 0;
        function handler(data) {
            for (var i = 0; i < data.length; i++) {
                id++;
                var item = data[i];
                item.nodeId = id;
                if(item.children && item.children.length > 0) {
                    handler(item.children);
                }
            }  
        }
        handler(data);
        // console.log(data);
    }

}