const { findNode } = require('./easy');
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
  // 第一个错的节点一定是它的值比后面的大； 第二个节点如果能找到，一定是它比后面的小；如果找不到，把第一个错节点和它的下一个互换即可
  const dummy = root;
  let node1 = null; // 第一个错的节点，它比后一个大
  let node1Next = null;
  let node2 = null; // 第二个错的节点，它比前面的小
  let lastNode = { val: -Infinity };
  let rightest = null;

  while (root) {
    if (root.left) {
      rightest = root.left;
      while (rightest.right && rightest.right !== root) {
        rightest = rightest.right;
      }
      // 第一次走
      if (rightest.right === null) {
        rightest.right = root;
        root = root.left;
        // 左子树已经走完，可以执行
      } else {
        if (lastNode.val > root.val) {
          // 如果已经找到第一个错误节点
          if (node1) {
            node2 = root;
          } else {
            node1 = lastNode;
            node1Next = root;
          }
        }
        lastNode = root;
        root = root.right;
        rightest.right = null;
      }
    } else {
      if (root.val < lastNode.val) {
        if (node1) {
          node2 = root;
        } else {
          node1 = lastNode;
          node1Next = root;
        }
      }
      lastNode = root;
      root = root.right;
    }
  }
  // 如果只找到一个，把它和下一个互换即可
  if (!node2) {
    node2 = node1Next;
  }
  [node1.val, node2.val] = [node2.val, node1.val];
  return dummy;
};
// 701. 二叉搜索树中的插入操作
var insertIntoBST = function (root, val) {
  if (!root) {
    return new TreeNode(val);
  }
  if (root.val < val) {
    if (!root.right) {
      root.right = new TreeNode(val);
    } else {
      insertIntoBST(root.right, val);
    }
  }
  if (root.val > val) {
    if (!root.left) {
      root.left = new TreeNode(val);
    } else {
      insertIntoBST(root.left, val);
    }
  }
  return root;
};
// 687. 最长同值路径 有时间再做一次。我可以计算这个节点的结果，同时返回它应该返回的值。
var longestUnivaluePath = function (root) {
  let ret = 0;
  function dfs(node) {
    if (!node) {
      return 0;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    let leftLen = 0;
    let rightLen = 0;
    if (node.left && node.left.val === node.val) {
      leftLen = left + 1;
    }
    if (node.right && node.right.val === node.val) {
      rightLen = right + 1;
    }
    ret = Math.max(leftLen + rightLen, ret);
    return Math.max(leftLen, rightLen);
  }
  dfs(root);
  return ret;
};
// 669. 修剪二叉搜索树
var trimBST = function (root, low, high) {
  if (!root) {
    return null;
  }
  if (root.val < low) {
    return trimBST(root.right, low, high);
  }
  if (root.val > high) {
    return trimBST(root.left, low, high);
  }
  root.left = trimBST(root.left, low, root.val);
  root.right = trimBST(root.right, root.val, high);
  return root;
};
// 814. 二叉树剪枝
var pruneTree = function (root) {
  if (!root) {
    return null;
  }
  root.left = pruneTree(root.left);
  if (root.left && root.left.val === 0 && !root.left.left && !root.left.right) {
    root.left = null;
  }
  root.right = pruneTree(root.right);
  if (root.right && root.right.val === 0 && !root.right.left && !root.right.right) {
    root.right = null;
  }
  if (!root.left && !root.right) {
    return root.val === 0 ? null : root;
  }
  return root;
};
const [zero, one, two, three, four, five, six, seven, eight] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  num => new TreeNode(num)
);
three.left = five;
three.right = one;
five.left = six;
five.right = two;
two.left = seven;
two.right = four;
one.left = zero;
one.right = eight;
// 863. 二叉树中所有距离为 K 的结点
function _runChildren(target, k) {
  if (!target) {
    return [];
  }
  const ret = [];
  if (k === 0) {
    return [target.val];
  }
  if (target.left) {
    ret.push(..._runChildren(target.left, k - 1));
  }
  if (target.right) {
    ret.push(..._runChildren(target.right, k - 1));
  }
  return ret;
}
var distanceK = function (root, target, k) {
  if (!target || k < 0) {
    return [];
  }
  if (k === 0) {
    return [target.val];
  }
  const ret = [];
  // 找到从root到target路径
  const route = findNode(root, target);
  let distance = 0;
  while (distance <= k) {
    const j = route.length - 1 - distance; // route里面的倒数第i个节点
    if (j < 0) {
      break;
    }
    const node = route[j];
    if (node === target) {
      ret.push(..._runChildren(target, k - distance));
    } else {
      const handledNode = route[j + 1];
      const curNode = node.left && node.left.val === handledNode.val ? node.right : node.left;
      ret.push(..._runChildren(curNode, k - distance - 1));
    }
    distance++;
  }
  return ret;
};
console.info(distanceK(three, five, 2));
// console.info(_runChildren(three, 2));
