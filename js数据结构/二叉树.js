/**
 * 排序二叉树， 前，中，后的排列是根节点的位置决定的
 * 1. 二叉树的构造
 * 2. 二叉树的排序
 * 3. 二叉树的查找
 * 4. 二叉树的删除
 */

// 二叉树节点类
function TreeNode(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

// 1. 二叉树的构造
function BinaryTree() {
  // 根元素
  var root = null;
  var insertNode = function (node, newNode) {
    if (node.key > newNode.key) {
      // 左子树
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      // 右子树
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };
  // 插入节点
  this.insert = function (key) {
    var newNode = new TreeNode(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  };
  // 中序遍历-- 从小到大排列
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback);
  };

  var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };
  // 前序排序-  可以有效率的复制二叉树对象，比直接在使用二叉树构造的速度快大约10倍
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  };

  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };
  // 后序遍历--- 遍历查找子集的特点可以用于文件系统的遍历
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  };

  // 查找最大值
  var maxNode = function (node, callback) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      callback(node.key);
      return node.key;
    }
    return null;
  };
  this.max = function (callback) {
    maxNode(root, callback);
  };

  var minNode = function (node, callback) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      callback(node.key);
      return node.key;
    }
    return null;
  };

  // 查找最小值
  this.min = function (callback) {
    minNode(root, callback);
  };

  var searchNode = function (node, key) {
    if (node == null) {
      return false;
    }
    if (node.key > key) {
      // 小于当前节点往左找
      searchNode(node.left, key);
    } else if (node.key < key) {
      // 往右找
      searchNode(node.right, key);
    } else {
      return true;
    }
  };
  // 查找指定值
  this.search = function (key) {
    searchNode(root, key);
  };

  // 二叉树的删除，删除左叶子节点，删除右叶子节点以及删除拥有左右两个节点的主节点
  // 拥有左右两个节点的主节点删除要考虑到数据的可排序行需要将删掉的节点重新赋值。

  //如果存在左右两个节点的话查找右节点的最小节点
  var findMinNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  };
  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (node.key > key) {
      // 递归查找左叶子节点，直接等于返回的null值
      node.left = removeNode(node.left, key);
      return node;
    } else if (node.key < key) {
      // 递归查找右叶子节点，直接等于返回的null值
      node.right = removeNode(node.right, key);
      return node;
    } else {
      //  如果查找到相等的情况下
      if (node.left === null && node.right === null) {
        // 当只有一个节点，而且被选中
        node = null;
        return node;
      }
      if (node.left === null) {
        //左节点为空
        node = node.right;
        return node;
      } else if (node.right === null) {
        //右节点为空
        node = node.left;
        return node;
      }
      //查找到右节点最小节点赋值
      var aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  };
  this.remove = function (key) {
    removeNode(root, key);
  };
}

var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];
var binaryTree = new BinaryTree();
nodes.forEach((node) => {
  binaryTree.insert(node);
});

var callback = function (key) {
  console.log(key);
};
// binaryTree.inOrderTraverse(callback);
// binaryTree.preOrderTraverse(callback);
// binaryTree.postOrderTraverse(callback);
// binaryTree.max(callback);
// binaryTree.min(callback);
// binaryTree.search(3);
binaryTree.remove(3);
