const { findNode } = require('./easy');
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
function sort(a, b) {
  return a > b ? 1 : -1;
}
const [zero, one, two, three, four, five, six, seven, eight, nine] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
].map(num => new TreeNode(num));
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
      const key = node.left && node.left.val === handledNode.val ? 'left' : 'right';
      node[key] = null;
      ret.push(..._runChildren(node, k - distance));
    }
    distance++;
  }
  return ret;
};
// 863. 二叉树中所有距离为 K 的结点(dfs版)
var distanceK = function (root, target, k) {
  if (!target || k < 0) {
    return [];
  }
  if (k === 0) {
    return [target.val];
  }
  const parentMap = {};
  let cdds = [root];
  // 走一遍，标记所有的parent
  while (cdds.length) {
    const next_cdds = [];
    for (let node of cdds) {
      if (node.left) {
        parentMap[node.left.val] = node;
        next_cdds.push(node.left);
      }
      if (node.right) {
        parentMap[node.right.val] = node;
        next_cdds.push(node.right);
      }
    }
    cdds = next_cdds;
  }
  const ret = [];
  // 递归一遍
  function dfs(node, from, distance) {
    if (distance === 0) {
      ret.push(node.val);
      return;
    }
    node.left && node.left.val !== from.val && dfs(node.left, node, distance - 1);
    node.right && node.right.val !== from.val && dfs(node.right, node, distance - 1);
    parentMap[node.val] &&
      parentMap[node.val].val !== from.val &&
      dfs(parentMap[node.val], node, distance - 1);
  }
  dfs(target, target, k);
  return ret;
};
// 331. 验证二叉树的前序序列化
var isValidSerialization = function (preorder) {
  if (preorder === '#') {
    return true;
  }
  if (preorder[0] === '#' && preorder.length > 1) {
    return false;
  }
  const arr = preorder.split(',');
  const stark = [];
  let curNode = new TreeNode(arr[0]);
  stark.push(curNode);
  let i = 1;
  while (curNode && i < arr.length) {
    const child = new TreeNode(arr[i]);
    // 先生成root节点
    if (!curNode) {
      if (child === null) {
        break;
      } else {
        curNode = child;
        stark.push(child);
      }
    } else if (curNode.left === null) {
      curNode.left = child;
      if (child.val !== '#') {
        curNode = child;
        stark.push(child);
      }
    } else if (curNode.right === null) {
      curNode.right = child;
      if (child.val !== '#') {
        stark.push(child);
        curNode = child;
      } else {
        let node = null;
        do {
          node = stark.pop();
        } while (node && node.left && node.left.val && node.right && node.right.val);
        curNode = node;
      }
    }
    i++;
  }
  // console.info(curNode, i);
  return i >= arr.length && !curNode;
};
// // 331. 验证二叉树的前序序列化(蹲坑版)
var isValidSerialization = function (preorder) {
  if (preorder === '#') {
    return true;
  }
  const arr = preorder.split(',');
  let i = 0;
  let positions = 0;
  while (i < arr.length) {
    if (positions < 0) {
      return false;
    }
    const code = arr[i];
    if (code === '#') {
      positions--;
    } else {
      if (i > 0 && positions === 0) {
        return false;
      }
      positions += i === 0 ? 2 : 1;
    }
    i++;
  }
  return positions === 0;
};
// console.info(isValidSerialization('9,3,4,#,#,1,#,#,2,#,6,#,#'));
// console.info(isValidSerialization('1,#'));
// console.info(isValidSerialization('9,#,#,1'));
// 623. 在二叉树中增加一行
var addOneRow = function (root, val, depth) {
  if (depth === 1) {
    const ret = new TreeNode(val, root);
    return ret;
  }
  if (depth === 2) {
    root.left = new TreeNode(val, root.left);
    root.right = new TreeNode(val, null, root.right);
    return root;
  }
  if (root.left) {
    addOneRow(root.left, val, depth - 1);
  }
  if (root.right) {
    addOneRow(root.right, val, depth - 1);
  }
  return root;
};
//652. 寻找重复的子树
var findDuplicateSubtrees = function (root) {
  const map = {};
  function dfs(node) {
    const key = JSON.stringify(node);
    map[key] = (map[key] || 0) + 1;
    if (node.left) {
      dfs(node.left);
    }
    if (node.right) {
      dfs(node.right);
    }
  }
  dfs(root);
  return Object.keys(map)
    .filter(key => map[key] > 1)
    .map(str => JSON.parse(str));
};
// 可以用序列化的方式展示tree的结构
var findDuplicateSubtrees = function (root) {
  const ret = [];
  const map = {};
  function dfs(node) {
    if (!node) {
      return '#';
    }
    let key = `${node.val},${dfs(node.left)},${dfs(node.right)}`;
    map[key] = (map[key] || 0) + 1;
    if (map[key] === 2) {
      ret.push(node);
    }
    return key;
  }
  dfs(root);
  return ret;
};
//654. 最大二叉树
var constructMaximumBinaryTree = function (nums) {
  if (nums.length === 0) {
    return null;
  }
  if (nums.length === 1) {
    return new TreeNode(nums[0]);
  }
  const max = nums.reduce((pre, cur) => Math.max(pre, cur), -Infinity);
  const i = nums.indexOf(max);
  const root = new TreeNode(max);
  root.left = constructMaximumBinaryTree(nums.slice(0, i));
  root.right = constructMaximumBinaryTree(nums.slice(i + 1, nums.length));
  return root;
};
// 662. 二叉树最大宽度 TODO:
var widthOfBinaryTree = function (root) {
  if (!root) {
    return 0;
  }
  let res = 1;
  let cdds = [root];
  while (cdds.length) {
    const next_head = [];
    const next_tail = [];

    let i = 0;
    let j = cdds.length - 1;

    while (i <= j) {
      // 从前向后
      const start = cdds[i];
      if (!next_head.length) {
        start.left && next_head.push(start.left);
        if (next_head.length) {
          next_head.push(start.right || '#');
        } else {
          start.right && next_head.push(start.right);
        }
      } else {
        next_head.push(start.left || '#');
        next_head.push(start.right || '#');
      }
      if (i < j) {
        // 从后向前
        const end = cdds[j];
        if (!next_tail.length) {
          end.right && next_tail.unshift(end.right);
          if (next_tail.length) {
            next_tail.unshift(end.left || '#');
          } else {
            end.left && next_tail.unshift(end.left);
          }
        } else {
          next_tail.unshift(end.right || '#');
          next_tail.unshift(end.left || '#');
        }
      }
      i++;
      j--;
    }
    cdds = [...next_head, ...next_tail];
    while (cdds.length && cdds[cdds.length - 1] === '#') {
      cdds.pop();
    }
    res = Math.max(cdds.length, res);
  }
  return res;
};
// one.left = two;
// three.left = five;
// five.left = six;
// one.right = two;
// two.right = nine;
// nine.right = seven;
console.info(widthOfBinaryTree(one));
//129. 求根节点到叶节点数字之和
var sumNumbers = function (root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return root.val;
  }
  let res = 0;
  const arr = [root]; // 候选值
  const stark = []; // 栈
  while (arr.length) {
    const node = arr.pop();
    // 加入候选值
    if (node.right) {
      arr.push(node.right);
    }
    if (node.left) {
      arr.push(node.left);
    }
    // 入栈操作
    if (!stark.length) {
      stark.push(node);
    } else {
      while (stark[stark.length - 1].left !== node && stark[stark.length - 1].right !== node) {
        stark.pop();
      }
      stark.push(node);
      if (!node.left && !node.right) {
        res += stark.reduce((pre, cur) => pre + cur.val, '') * 1;
      }
    }
  }
  return res;
};
// 117. 填充每个节点的下一个右侧节点指针 II
var connect = function (root) {
  if (!root) {
    return null;
  }
  let cdds = [root];
  while (cdds.length) {
    const next = [];
    for (let i = 0; i < cdds.length; i++) {
      cdds[i].next = cdds[i + 1] || null;
      if (cdds[i].left) {
        next.push(cdds[i].left);
      }
      if (cdds[i].right) {
        next.push(cdds[i].right);
      }
    }
    cdds = next;
  }
  return root;
};
// 116. 填充每个节点的下一个右侧节点指针
var connect = function (root) {
  if (!root) {
    return null;
  }
  function dfs(node, father, isLeftChild) {
    if (!father) {
      node.next = null;
    } else if (isLeftChild) {
      node.next = father.right;
    } else {
      node.next = father.next ? father.next.left : null;
    }
    node.left && dfs(node.left, node, true);
    node.right && dfs(node.right, node, false);
  }
  dfs(root, null, false);
  return root;
};
// 114. 二叉树展开为链表
var flatten = function (root) {
  if (!root) {
    return null;
  }
  function dfs(node) {
    const { left, right } = node;
    if (!left && !right) {
      return node;
    }
    if (left) {
      node.left = null;
      node.right = left;
      node = dfs(left);
    }
    if (right) {
      node.right = right;
      node = dfs(right);
    }
    return node;
  }
  dfs(root);
};
var flatten = function (root) {
  if (!root) {
    return null;
  }
  if (!root.left && !root.right) {
    return root;
  }
  const { left, right } = root;
  left && flatten(left);
  right && flatten(right);
  root.left = null;
  if (left) {
    root.right = left;
    while (root && root.right) {
      root = root.right;
    }
  }
  root.right = right;
};
// one.left = two;
// two.left = three;
// two.right = four;
// one.right = five;
// five.right = six;
// console.info(flatten(one));
// 113. 路径总和 II
var pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }
  if (!root.left && !root.right) {
    return root.val === targetSum ? [[root.val]] : [];
  }
  const ret = [];
  if (root.left) {
    const leftRet = pathSum(root.left, targetSum - root.val);
    if (leftRet.length) {
      leftRet.forEach(item => {
        ret.push([root.val, ...item]);
      });
    }
  }
  if (root.right) {
    const rightRet = pathSum(root.right, targetSum - root.val);
    if (rightRet.length) {
      rightRet.forEach(item => {
        ret.push([root.val, ...item]);
      });
    }
  }
  return ret;
};
// 109. 有序链表转换二叉搜索树
var sortedListToBST = function (head) {
  if (!head) {
    return null;
  }
  const arr = [];
  while (head) {
    arr.push(head);
    head = head.next;
  }
  function dfs(arr) {
    if (!arr.length) {
      return null;
    }
    if (arr.length === 1) {
      arr[0].left = null;
      arr[0].right = null;
      return arr[0];
    }
    const len = arr.length;
    const i = len % 2 === 0 ? len / 2 : (len - 1) / 2;
    arr[i].left = dfs(arr.slice(0, i));
    arr[i].right = dfs(arr.slice(i + 1, len));
    return arr[i];
  }
  return dfs(arr);
};
// 107. 二叉树的层序遍历 II
var levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }
  const ret = [];
  let cdds = [root];
  while (cdds.length) {
    const next_cdds = [];
    const res_child = []; //
    cdds.forEach(node => {
      res_child.push(node.val);
      node.left && next_cdds.push(node.left);
      node.right && next_cdds.push(node.right);
    });
    cdds = next_cdds;
    ret.unshift(res_child);
  }
  return ret;
};
// 107. 二叉树的层序遍历 II dfs版本
var levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }
  const ret = [[root.val]];
  function dfs(node) {
    if (!node.left && !node.right) {
      return [node.val];
    }

    ret.unshift();
  }
  dfs(root);
  return ret;
};
// 106. 从中序与后序遍历序列构造二叉树
var buildTree = function (inorder, postorder) {
  const len_in = inorder.length;
  const len_po = postorder.length;
  if (len_in === 0) {
    return null;
  }
  if (len_in === 1) {
    return new TreeNode(inorder[0]);
  }
  // 找到根节点
  const rootVal = postorder[len_po - 1];
  const root = new TreeNode(rootVal);
  // 区分中序的左右子树
  const i_root = inorder.findIndex(node => node === rootVal);
  const inorder_left_arr = inorder.slice(0, i_root);
  const inorder_right_arr = inorder.slice(i_root + 1, len_in);
  // 区分后序的左右子树
  const postorder_left_arr = postorder.slice(0, i_root);
  const postorder_right_arr = postorder.slice(i_root, len_po - 1);
  root.left = buildTree(inorder_left_arr, postorder_left_arr);
  root.right = buildTree(inorder_right_arr, postorder_right_arr);
  return root;
};
// 105. 从前序与中序遍历序列构造二叉树
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) {
    return null;
  }
  if (preorder.length === 1) {
    return new TreeNode(preorder[0]);
  }
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const i_root = inorder.findIndex(node => node === rootVal);
  // 中序左右子树
  const left_inorder = inorder.slice(0, i_root);
  const right_inorder = inorder.slice(i_root + 1, inorder.length);
  // 前序左右子树
  const left_preorder = preorder.slice(1, i_root + 1);
  const right_preorder = preorder.slice(i_root + 1, preorder.length);
  root.left = buildTree(left_preorder, left_inorder);
  root.right = buildTree(right_preorder, right_inorder);
  return root;
};
// 103. 二叉树的锯齿形层序遍历
var zigzagLevelOrder = function (root) {
  if (!root) {
    return [[null]];
  }
  if (!root.left && !root.right) {
    return [[root.val]];
  }
  const ret = [];
  let cdds = [root];
  let order = 'left';
  while (cdds.length) {
    const next_cdds = [];
    const part_ret = [];
    for (let node of cdds) {
      const method = order === 'left' ? 'push' : 'unshift';
      part_ret[method](node.val);
      node.left && next_cdds.push(node.left);
      node.right && next_cdds.push(node.right);
    }
    cdds = next_cdds;
    ret.push(part_ret);
    order = order === 'left' ? 'right' : 'left';
  }
  return ret;
};
// 199. 二叉树的右视图
var rightSideView = function (root) {
  if (!root) {
    return [];
  }
  let cdds = [root];
  const ret = [];
  while (cdds.length) {
    ret.push(cdds[cdds.length - 1].val);
    const next_cdds = [];
    for (let node of cdds) {
      node.left && next_cdds.push(node.left);
      node.right && next_cdds.push(node.right);
    }
    cdds = next_cdds;
  }
  return ret;
};
// 222. 完全二叉树的节点个数
var countNodes = function (root) {
  if (!root) {
    return 0;
  }
  let height_l = 0;
  let height_r = 0;
  let { left, right } = root;
  while (left) {
    height_l++;
    left = left.left;
  }
  while (right) {
    height_r++;
    right = right.right;
  }
  if (height_r === height_l) {
    return Math.pow(2, height_l + 1) - 1;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
};
// 230. 二叉搜索树中第K小的元素
var kthSmallest = function (root, k) {
  if (!root) {
    return null;
  }
  while (root) {
    if (root.left) {
      let rightest = root.left;
      while (rightest.right && rightest.right !== root) {
        rightest = rightest.right;
      }
      if (rightest.right === null) {
        rightest.right = root;
        root = root.left;
      } else {
        if (k === 1) {
          return root.val;
        }
        rightest.right = null;
        root = root.right;
        k--;
      }
    } else {
      if (k === 1) {
        return root.val;
      }
      root = root.right;
      k--;
    }
  }
};
three.left = one;
one.right = two;
three.right = four;
console.info(kthSmallest(three));
