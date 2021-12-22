// 376. 摆动序列
var wiggleMaxLength = function (nums) {
  if (nums.length < 2) {
    return nums.length;
  }
  // dp:[len, up/down/]
  const first = nums[0];
  const dp = [[1, 'both']];
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    let len_cur = first === nums[i] ? 1 : 2;
    let _direction = 'both';
    for (let j = 0; j < i; j++) {
      const [len, direction] = dp[j];
      const isValidUp = nums[j] < nums[i] && (direction === 'up' || direction === 'both');
      const isValidDown = nums[j] > nums[i] && (direction === 'down' || direction === 'both');
      if (isValidUp) {
        len_cur = Math.max(len_cur, len + 1);
        if (len_cur === len + 1) {
          _direction = 'down';
        }
      } else if (isValidDown) {
        len_cur = Math.max(len_cur, len + 1);
        if (len_cur === len + 1) {
          _direction = 'up';
        }
      }
    }
    dp[i] = [len_cur, _direction];
    max = Math.max(len_cur, max);
  }
  return max;
};
// console.info(wiggleMaxLength([1,2,3,4,5,6,7,8,9]))

// 剑指 Offer II 107. 矩阵中的距离
var updateMatrix = function (mat) {
  const height = mat.length;
  const width = mat[0].length;
  const nodes = [];
  // 把0都处理了，在把1都留下来
  const ret = mat.map((h, i_h) => {
    return h.map((w, i_w) => {
      const isZero = w === 0;
      if (isZero) {
        nodes.push([i_h, i_w]);
      }
      return isZero ? 0 : null;
    });
  });
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      if (ret[h][w] === null) {
        ret[h][w] = nodes.reduce((pre, cur) => {
          const [_h, _w] = cur;
          return Math.min(pre, Math.abs(h - _h) + Math.abs(w - _w));
        }, Infinity);
      }
    }
  }
  return ret;
};
// updateMatrix([[0,0,0],[0,1,0],[0,0,0]])
// 剑指 Offer II 104. 排列的数目
var map = {};
const key = (arr, target) => arr.join(',') + '-' + target;
var combinationSum4 = function (nums, target) {
  if (target <= 0 || nums[0] > target) {
    return 0;
  }
  if (nums[0] === target) {
    return 1;
  }
  const _key = key(nums, target);
  if (map[_key] !== undefined) {
    return map[_key];
  }
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    if (cur === target) {
      count++;
    } else if (cur < target) {
      count += combinationSum4(nums, target - nums[i]);
    }
  }
  map[_key] = count;
  return count;
};
// console.info(combinationSum4([1,2,3],4),map)
// 剑指 Offer II 103. 最少的硬币数目
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      dp[i] = Math.min(dp[i], (dp[i - coin] === undefined ? Infinity : dp[i - coin]) + 1);
    }
  }
  console.info(dp);
  return dp[amount];
};
// console.info(coinChange([1,2,5],11))
// 剑指 Offer II 092. 翻转字符
var minFlipsMonoIncr = function (s) {
  const [i_1_first, i_0_first, i_0_last] = [s.indexOf('1'), s.indexOf('0'), s.lastIndexOf('0')];
  // 特殊情况
  if (i_0_first === -1 || i_1_first === -1) return 0;
  if (i_0_last < i_1_first) return 0;
  // 掐头去尾 start
  s = s.substring(i_1_first, i_0_last + 1);
  // 掐头去尾 end
  // dp[num_0, num_1];
  let num_0_all = 0;
  let num_1_all = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      num_0_all++;
    } else {
      num_1_all++;
    }
  }
  // 这个位置前面有几个0，几个1
  const dp = new Array(s.length + 1).fill(0);
  dp[0] = [0, 0];
  // 全1或全0
  let ret = Math.min(num_0_all, num_1_all);
  for (let i = 1; i < s.length; i++) {
    const [num_0, num_1] = dp[i - 1];
    const isPreZero = s[i - 1] === '0';
    const isCurZero = s[i] === '0';
    dp[i] = isPreZero ? [num_0 + 1, num_1] : [num_0, num_1 + 1];
    const num_left_1 = dp[i][1];
    const num_right_0 = num_0_all - dp[i][0] - (isCurZero ? 1 : 0);
    ret = Math.min(num_left_1 + num_right_0, ret);
  }
  return ret;
};
// console.info(minFlipsMonoIncr('00110'));
// console.info(minFlipsMonoIncr("10011111110010111011"))
// 剑指 Offer II 093. 最长斐波那契数列  超时了
var lenLongestFibSubseq = function (arr) {
  const len = arr.length;
  if (len < 3) {
    return 0;
  }
  let ret = 0;
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      let count = 2;
      let pre = arr[j] - arr[i],
        head = arr[i],
        tail = arr[j],
        next = arr[i] + arr[j];
      if (pre < head && arr.indexOf(pre) !== -1) {
        continue;
      }
      while (head + tail === next && arr.indexOf(next) !== -1) {
        head = tail;
        tail = next;
        next = tail + next;
        count++;
      }
      count = count === 2 ? 0 : count;
      ret = Math.max(ret, count);
    }
  }
  return ret;
};
var lenLongestFibSubseq = function (arr) {
  const len = arr.length;
  if (len < 3) {
    return 0;
  }
  let ret = 0;
  const dp = new Array(len).fill(0).map(() => []);
  const map = {};
  for (let i = 0; i < len - 2; i++) {
    map[arr[i]] = i;
    dp[i] = [];
  }
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      const k = map[arr[i] - arr[j]];
      if (k < j) {
        dp[i][j] = dp[j][k] + 1;
        if (dp[i][j] > ret) ret = dp[i][j];
      } else {
        dp[i][j] = 2;
      }
    }
  }
  return ret;
};
// console.info(lenLongestFibSubseq([2, 4, 7, 8, 9, 10, 14, 15, 18, 23, 32, 50]));
// 面试题 08.14. 布尔运算
var map = {};
function calCulate(s) {
  switch (s) {
    case '1&1':
    case '1|1':
    case '1|0':
    case '0|1':
    case '1^0':
    case '0^1':
      return '1';
    default:
      return '0';
  }
}
var countEval = function (s, result) {
  // 如果已有缓存
  if (map[s] && map[s][result] !== undefined) {
    return map[s][result];
  }
  if (s.length === 3) {
    const val = calCulate(s);
    map[s] = map[s] || {};
    map[s][val] = 1;
    return val * 1 === result ? 1 : 0;
  }
  let ret = 0;
  for (let i = 1; i < s.length - 1; i += 2) {
    ret =
      ret +
      countEval(
        s.substring(0, i - 1) + calCulate(s.substring(i - 1, i + 2)) + s.substring(i + 2, s.length),
        result
      );
  }
  map[s] = map[s] || {};
  map[s][result] = ret;
  return ret;
};
// console.info(countEval('0&0&0&1^1|0', 1));
// console.info(JSON.stringify(map));

// LCP 34. 二叉树染色
var maxValue = function (root, k, isFatherPainted = false) {
  if (!root) {
    return 0;
  }
  const { val, left, right } = root;
  let ret = 0;
  // 不涂抹root

  // 涂抹
  return ret;
};
