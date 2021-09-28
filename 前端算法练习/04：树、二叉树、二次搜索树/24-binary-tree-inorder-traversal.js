// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
// 二叉树的中序遍历
/**
 * 二叉树的前中后，是根据根节点的遍历位置进行控制的
 *左-根-右
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 1. 递归 O(n)  O(n)
var inorderTraversal = function (root) {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};

// 2. 迭代 O(n)  O(n), 两种方式是等价的，区别在于递归的时候隐式地维护了一个栈，而我们在迭代的时候需要显式地将这个栈模拟出来，其他都相同，
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};

var inorderTraversal = function (root) {
  const stack = [];
  const res = [];

  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      res.push(root.val);
      root = root.right;
    }
  }

  return res;
};

//  中序遍历：左中右
//  压栈顺序：右中左

var inorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    if (node.right) stack.push(node.right); // 右
    stack.push(node); // 中
    stack.push(null);
    if (node.left) stack.push(node.left); // 左
  }
  return res;
};
