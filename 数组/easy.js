// 1. 两数之和
function sort(a, b) {
  return a > b ? 1 : -1;
}
//1. 两数之和
var twoSum = function (nums, target) {
  const _nums = JSON.parse(JSON.stringify(nums));
  nums.sort(sort);
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    let sum = nums[i] + nums[j];
    if (sum === target) {
      return [_nums.indexOf(nums[i]), _nums.lastIndexOf(nums[j])];
    }
    if (sum < target) {
      i++;
    }
    if (sum > target) {
      j--;
    }
  }
};
// 35. 搜索插入位置
var searchInsert = function (nums, target) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0] >= target ? 0 : 1;
  }
  let start = 0;
  let end = nums.length - 1;
  while (start + 1 < end) {
    const i_sum = start + end;
    const i = i_sum % 2 === 0 ? i_sum / 2 : (i_sum - 1) / 2;
    if (nums[i] === target) {
      return i;
    }
    if (nums[i] < target) {
      start = i;
    } else {
      end = i;
    }
  }
  if (nums[start] >= target) {
    return start;
  }
  if (nums[end] < target) {
    return end + 1;
  }
  return start + 1;
};
// console.info(searchInsert([1, 3, 5, 6], 2));
// 53. 最大子序和
const sum = arr => arr.reduce((pre, cur) => pre + cur, 0);
var maxSubArray = function (nums) {
  let ans = nums[0];
  let sum = 0;
  for (const num of nums) {
    if (sum > 0) {
      sum += num;
    } else {
      sum = num;
    }
    ans = Math.max(ans, sum);
  }
  return ans;
};
// 加一
var plusOne = function (digits) {
  let i = digits.length - 1;
  let addNext = true;
  while (addNext && i >= 0) {
    digits[i] = digits[i] + 1;
    if (digits[i] === 10) {
      digits[i] = 0;
    } else {
      addNext = false;
    }
    i--;
  }
  if (addNext) {
    digits.unshift(1);
  }
  return digits;
};
// 118. 杨辉三角
const map = {
  1: [[1]],
};
var generate = function (numRows) {
  if (map[numRows]) {
    return map[numRows];
  }
  const father = generate(numRows - 1);
  const last = father[father.length - 1];
  const ret = [...father];
  const next = [];
  for (let i = 0; i < last.length; i++) {
    next.push((last[i - 1] || 0) + last[i]);
  }
  next.push(last[last.length - 1]);
  map[numRows] = [...ret, next];
  return map[numRows];
};
// 119. 杨辉三角 II
var getRow = function (rowIndex) {
  if (map[rowIndex]) {
    return map[rowIndex];
  }
  const father = getRow(rowIndex - 1);
  const ret = [];
  for (let i = 0; i < father.length; i++) {
    ret.push((father[i - 1] || 0) + father[i]);
  }
  ret.push(father[father.length - 1]);
  map[rowIndex] = ret;
  return ret;
};
//121. 买卖股票的最佳时机
var maxProfit = function (prices) {
  const arr = [];
  for (let i = 1; i < prices.length; i++) {
    arr.push(prices[i] - prices[i - 1]);
  }
  let max = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (sum > 0) {
      sum += arr[i];
    } else {
      sum = arr[i];
    }
    max = Math.max(sum, max);
  }
  return max;
};
var singleNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.lastIndexOf(nums[i]) === nums.indexOf(nums[i])) {
      return nums[i];
    }
  }
};
var majorityElement = function (nums) {
  const map = {};
  const len = nums.length;
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    map[val] = (map[val] || 0) + 1;
    if (map[val] > len / 2) {
      return val;
    }
  }
};
var containsDuplicate = function (nums) {
  return Array.from(new Set(nums)).length !== nums.length;
};
var containsNearbyDuplicate = function (nums, k) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    map[num] = map[num] || [];
    map[num].push(i);
    if (map[num].length > 1) {
      const arr = map[num];
      if (arr[arr.length - 1] - arr[arr.length - 2] <= k) {
        return true;
      }
    }
  }
  return false;
};
// console.info(containsNearbyDuplicate([1, 2, 3, 1], 3));
var summaryRanges = function (nums) {
  if (nums.length === 1) {
    return [nums[0] + ''];
  }
  const ret = [];
  for (let i = 0; i < nums.length; i++) {
    let [cur, next] = [nums[i], nums[i + 1]];
    let start = cur;
    while (next === cur + 1) {
      i++;
      [cur, next] = [nums[i], nums[i + 1]];
    }
    if (start === cur) {
      ret.push(start + '');
    } else {
      ret.push(`${start}->${cur}`);
    }
  }
  return ret;
};
var missingNumber = function (nums) {
  let ret = 0;
  for (let i = 0; i < nums.length; i++) {
    ret ^= nums[i];
    ret ^= i;
  }
  ret ^= nums.length;
  return ret;
};
var islandPerimeter = function (grid) {
  let ret = 0;
  grid.forEach((row, width) => {
    row.forEach((item, height) => {
      if (item === 1) {
        const [left, top, right, bottom] = [
          grid[width][height - 1],
          grid[width - 1] && grid[width - 1][height],
          grid[width][height + 1],
          grid[width + 1] && grid[width + 1][height],
        ];
        !left && ret++;
        !top && ret++;
        !right && ret++;
        !bottom && ret++;
      }
    });
  });
  return ret;
};
//  提莫攻击
var findPoisonedDuration = function (timeSeries, duration) {
  let res = 0;
  for (let i = 1; i < timeSeries.length; i++) {
    const gap = timeSeries[i] - timeSeries[i - 1];
    if (gap > duration) {
      res += duration;
    } else {
      res += gap;
    }
  }
  return res + duration;
};
//500. 键盘行
const lines = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
var findWords = function (words) {
  const ret = [];
  words.forEach(w => {
    const target = lines.find(l => l.indexOf(w[0].toLowerCase()) !== -1);
    let isTarget = true;
    let i = 0;
    while (isTarget && i < w.length) {
      if (target.indexOf(w[i].toLowerCase()) === -1) {
        isTarget = false;
      }
      i++;
    }
    isTarget && ret.push(w);
  });

  return ret;
};
var isValidSudoku = function (board) {
  let i;
  // 横向是否合理
  for (i = 0; i < 9; i++) {
    const arr = board[i];
    const map = {};
    for (let j = 0; j < 9; j++) {
      if (map[arr[j]]) {
        return false;
      }
      if (arr[j] !== '.') {
        map[arr[j]] = true;
      }
    }
  }
  // 纵向是否合理
  for (i = 0; i < 9; i++) {
    const map = {};
    for (let j = 0; j < 9; j++) {
      if (map[board[j][i]]) {
        return false;
      }
      if (board[j][i] !== '.') {
        map[board[j][i]] = true;
      }
    }
  }
  // 3*3是否合理
  for (i = 0; i < 9; i += 3) {
    const i_cdd = [i, i + 1, i + 2];
    for (let j = 0; j < 9; j += 3) {
      const j_cdd = [j, j + 1, j + 2];
      const map = {};
      for (let _i = i_cdd[0]; _i <= i_cdd[i_cdd.length - 1]; _i++) {
        for (let _j = j_cdd[0]; _j <= j_cdd[j_cdd.length - 1]; _j++) {
          if (map[board[_i][_j]]) {
            return false;
          }
          if (board[_i][_j] !== '.') {
            map[board[_i][_j]] = true;
          }
        }
      }
    }
  }
  return true;
};
