/** @format */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
// 二叉树的中序遍历
var inorderTraversal = function (root) {
  if (!root) {
    return [];
  }
  let ret = [];
  if (root.left) {
    ret = [...inorderTraversal(root.left)];
  }
  ret.push(root.val);
  if (root.right) {
    ret = [...ret, ...inorderTraversal(root.right)];
  }
  return ret;
};
// 前序遍历
var leftTravel = function (root) {
  if (!root) {
    return [];
  }
  let ret = [root.val];
  if (root.left) {
    ret = [...ret, ...leftTravel(root.left)];
  }
  if (root.right) {
    ret = [...ret, ...leftTravel(root.right)];
  }
  return ret;
};
// 后序遍历
var rightTravel = function (root) {
  if (!root) {
    return [];
  }
  let ret = [root.val];
  if (root.right) {
    ret = [...ret, ...rightTravel(root.right)];
  }
  if (root.left) {
    ret = [...ret, ...rightTravel(root.left)];
  }
  return ret;
};
// 相同的树
var isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true;
  }
  if (p === null || q === null) {
    return false;
  }
  if (p.val !== q.val) {
    return false;
  }
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
// 对称二叉树
var isSymmetric = function (root) {
  return leftTravel(root).join(', ') === rightTravel(root).join(', ');
};
// 二叉树的最大深度
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
// 平衡二叉树
var isBalanced = function (root) {
  if (!root) {
    return true;
  }
  const cdds = [root];
  while (cdds.length) {
    const root = cdds.pop();
    const left = root.left;
    const right = root.right;
    if (Math.abs(maxDepth(left) - maxDepth(right)) > 1) {
      return false;
    }
    if (left) {
      cdds.push(left);
    }
    if (right) {
      cdds.push(right);
    }
  }
  return true;
};
// 二叉树的最小深度
var minDepth = function (root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  if (root.left && !root.right) {
    return minDepth(root.left) + 1;
  }
  if (root.right && !root.left) {
    return minDepth(root.right) + 1;
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
// 路径总和
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  if (!root.left && root.right) {
    return hasPathSum(root.right, targetSum - root.val);
  }
  if (root.left && !root.right) {
    return hasPathSum(root.left, targetSum - root.val);
  }
  return (
    hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
  );
};
// 二叉树的前序遍历
var preorderTraversal = function (root) {
  if (!root) {
    return [];
  }
  const ret = [];
  const cdds = [root];
  while (cdds.length) {
    const node = cdds.pop();
    ret.push(node.val);
    if (node.right) {
      cdds.push(node.right);
    }
    if (node.left) {
      cdds.push(node.left);
    }
  }
  return ret;
};
// 二叉树的后序遍历
var postorderTraversal = function (root) {
  if (!root) {
    return [];
  }
  const ret = [];
  const cdds = [root];
  while (cdds.length) {
    const node = cdds.pop();
    ret.unshift(node.val);
    if (node.left) {
      cdds.push(node.left);
    }
    if (node.right) {
      cdds.push(node.right);
    }
  }
  return ret;
};
//  翻转二叉树
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  if (!root.left && !root.right) {
    return root;
  }
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.right);
  invertTree(root.left);

  return root;
};
// 查找节点
function findNode(root, p) {
  if (!root) {
    return false;
  }
  if (p === root) {
    return [p];
  }
  const temp = findNode(root.left, p) || findNode(root.right, p);
  return temp ? [root, ...temp] : false;
}
// 二叉搜索树的最近公共祖先
var lowestCommonAncestor = function (root, p, q) {
  // 保证p>=q
  [p, q] = p.val >= q.val ? [p, q] : [q, p];
  while (root) {
    if (root.val > p.val) {
      root = root.left;
      continue;
    }
    if (root.val < q.val) {
      root = root.right;
      continue;
    }
    return root;
  }
};
// 二叉树的所有路径
var binaryTreePaths = function (root) {
  const stack = [];
  const cdds = [root];
  const ret = [];
  while (cdds.length) {
    const node = cdds.pop();
    if (stack.length !== 0) {
      while (stack[stack.length - 1].left !== node && stack[stack.length - 1].right !== node) {
        stack.length = stack.length - 1;
      }
    }
    stack.push(node);
    if (node.right || node.left) {
      if (node.right) {
        cdds.push(node.right);
      }
      if (node.left) {
        cdds.push(node.left);
      }
    } else {
      ret.push(stack.map(s => s.val).join('->'));
      stack.length = stack.length - 1;
    }
  }
  return ret;
};
// 左叶子之和
var sumOfLeftLeaves = function (root) {
  if (!root) {
    return 0;
  }
  let ret = 0;
  if (root.left) {
    ret += root.left.val;
    ret += sumOfLeftLeaves(root.left);
  }
  if (root.right) {
    ret += sumOfLeftLeaves(root.left);
  }
  return ret;
};
//  二叉搜索树中的众数
var findMode = function (root) {
  let max = 0;
  let curCount = 0; // 当前数字数量
  let curNum = null;
  const ret = [];
  function runNode(node) {
    if(node.val !== curNum){
      curNum = node.val;
      curCount = 1;
      if(curCount>=max){
        ret.push(curNum);
      }
    }else{
      curCount++;
      if(curCount>max){
        ret.length = 0;
        ret.push(curNum);
        max = curCount;
      }else if(curCount===max){
        ret.push(curNum);
      }
    }   
  }
 
  while (root) {
    if (root.left) {
      let cur = root.left;
      while (cur.right) {
        cur = cur.right;
      }
      cur.right = root;
      let temp = root;
      root = root.left;
      temp.left = null;
      continue;
    }
    if(!root.left) {
      runNode(root)
      root = root.right;
    }
  }
  return ret;
};
// 将有序数组转换为二叉搜索树
var sortedArrayToBST = function (nums) {
  if(nums.length===0){
    return null;
  }
  if(nums.length === 1){
    return new TreeNode(nums[0]);
  }
  const len = nums.length;
  const i = len%2 === 1 ? (len-1)/2 : len/2;
  const ret = new TreeNode(nums[i]);
  ret.left = sortedArrayToBST(nums.slice(0, i))
  ret. right = i===nums.length-1 ? null : sortedArrayToBST(nums.slice(i+1, nums.length))
  return ret;
};
// 二叉搜索树的最小绝对差
var getMinimumDifference = function(root) {
  if(!root){
    return Infinity;
  }
  if(!root.left && !root.right){
    return Infinity;
  }
  let ret = Infinity;
  if(root.left){
    ret = Math.min(ret, root.val-root.left.val)
    let temp = root.left;
    while(temp.right){
      temp = temp.right;
    }
    ret = Math.min(ret, root.val - temp.val)
  }
  let temp = root;
  if(root.right){
    ret = Math.min(ret, root.right.val-root.val)
    temp = root.right;
    while(temp.left){
      temp = temp.left;
    }
    ret = Math.min(ret, temp.val-root.val)
  }
  return Math.min(ret, getMinimumDifference(root.left), getMinimumDifference(root.right));
};
// 获取节点之和
// 二叉树的坡度
var findTilt = function(root) {
  if(!root){
    return 0;
  }
  if(!root.left && !root.right){
    return 0
  } 
  if(root.left && !root.right){
    return findTilt(root.left);
  }
  if(!root.left && root.right){
    return findTilt(root.right);
  }
  let ret = 0;
  const cdd = [root];
  const stack = [];
  while (cdds.length){
    const node = cdds.pop();
    if(node.right){
      node.right._right = node.right;
      cdds.push(node.right)
    }
    if(node.left){
      node.left._left = node.left;
      cdds.push(node.left)
    }
    stack.push(node); 
  }

};

// 给定一个二叉树，计算 整个树 的坡度 。

// 一个树的 节点的坡度 定义即为，该节点左子树的节点之和和右子树节点之和的 差的绝对值 。如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0 。

// 整个树 的坡度就是其所有节点的坡度之和。
