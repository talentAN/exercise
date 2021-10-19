function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
//96. 不同的二叉搜索树
const map = {
  0: 1,
  1: 1,
  2: 2,
};
var numTrees = function (n) {
  if (map[n]) {
    return map[n];
  }
  let ret = 0;
  if (n % 2 === 0) {
    const end = n / 2;
    for (let i = 1; i <= end; i++) {
      const leftNum = i - 1;
      const rightNum = n - i;
      ret += numTrees(leftNum) * numTrees(rightNum) * 2;
    }
  } else {
    const end = (n - 1) / 2;
    for (let i = 1; i <= end; i++) {
      const leftNum = i - 1;
      const rightNum = n - i;
      ret += numTrees(leftNum) * numTrees(rightNum) * 2;
    }
    ret += numTrees(end) * numTrees(end);
  }

  map[n] = ret;
  return ret;
};
//不同的二叉搜索树 II
var generateTrees = function (n, plus = 0) {
  if (n === 0) {
    return [null];
  }
  if (n === 1) {
    return [new TreeNode(n + plus)];
  }
  let ret = [];
  for (let i = 1; i <= n; i++) {
    const leftCdds = generateTrees(i - 1, plus);
    const rightCdds = generateTrees(n - i, i + plus);
    for (let j = 0; j < leftCdds.length; j++) {
      for (let k = 0; k < rightCdds.length; k++) {
        const root = new TreeNode(i + plus);
        root.left = leftCdds[j];
        root.right = rightCdds[k];
        ret.push(root);
      }
    }
  }
  return ret;
};
// 98. 验证二叉搜索树
var isValidBST = function (root) {
  if (!root || (!root.left && !root.right)) {
    return true;
  }
  let last = -Infinity;
  while (root) {
    if (root.left) {
      let rightest = root.left;
      while (rightest.right) {
        rightest = rightest.right;
      }
      rightest.right = root;
      const temp = root;
      root = root.left;
      temp.left = null;
    } else {
      if (root.val <= last) {
        return false;
      }
      last = root.val;
      root = root.right;
    }
  }
  return true;
};
// 恢复二叉搜索树
var recoverTree = function (root) {
  const dummy = root;
  let node = null;
  let last = null;

  while (root) {
    if (root.left) {
      let rightest = root.left;
      while (rightest.right) {
        rightest = rightest.right;
      }
      rightest._right = root;
      const temp = root;
      root = root.left;
      temp.left = null;
    } else {
      if (last) {
        if (last.val > root.val) {
          node = root;
          break;
        }
      }
      last = root;
      root = root.right || root._right;
    }
  }
  let start = dummy;
  while (start) {
    if (start.left) {
      let rightest = start.left;
      while (rightest.right) {
        rightest = rightest.right;
      }
      rightest._right = root;
      const temp = root;
      root = root.left;
      temp.left = null;
    } else {
      if (last) {
        if (last.val > root.val) {
          node = root;
          break;
        }
      }
      last = root;
      root = root.right || root._right;
    }
  }
  return dummy;
};
