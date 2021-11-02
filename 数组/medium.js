function sort(a, b) {
  return a > b ? 1 : -1;
}
// 18. 四数之和
var fourSum = function (nums, target) {
  const map = {}; // {数字: 个数}
  nums.forEach(num => {
    map[num] = (map[num] || 0) + 1;
  });
  // 排序
  const arr = Object.keys(map)
    .map(val => val * 1)
    .sort(sort);
  const ret = [];
  for (let i = 0; i < arr.length; i++) {
    const cdds = threeSum(arr.slice(i, arr.length), target - arr[i]);
    if (cdds.length) {
      cdds.forEach(cdd => {
        const s = [arr[i], ...cdd].join(',');
        if (ret.indexOf(s) === -1) {
          ret.push(s);
        }
      });
    }
  }
  // 过滤掉数字不够的数组
  return ret
    .map(s => s.split(',').map(num => num * 1))
    .filter(arr => {
      let cur = arr[0];
      let count = 1;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === cur) {
          count++;
        } else {
          if (map[cur] < count) {
            return false;
          } else {
            cur = arr[i];
            count = 1;
          }
        }
      }
      return map[cur] >= count;
    });
};
var threeSum = function (nums, target) {
  const ret = [];
  for (let i = 0; i < nums.length; i++) {
    const cdds = twoSum(nums.slice(i, nums.length), target - nums[i]);
    if (cdds.length) {
      cdds.forEach(cdd => {
        ret.push([nums[i], ...cdd]);
      });
    }
  }
  return ret;
};
var twoSum = function (nums, target) {
  const ret = [];
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    const sum = nums[i] + nums[j];
    if (sum === target) {
      ret.push([nums[i], nums[j]]);
      i++;
      j--;
    } else if (sum < target) {
      i++;
    } else {
      j--;
    }
  }
  return ret;
};
// console.info(fourSum([1, 0, -1, 0, -2, 2], 0));
var nextPermutation = function (nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }
  if (len === 2) {
    nums.reverse();
    return nums;
  }
  let end = len - 1;
  let start = len - 2;
  let done = false;
  while (start >= 0 && !done) {
    let i = start;
    while (i < end) {
      if (nums[i] >= nums[i + 1]) {
        i++;
      } else {
        break;
      }
    }
    if (i === end) {
      start--;
    } else {
      done = true;
    }
  }
  if (start === -1) {
    nums.reverse();
  } else {
    let i = nums.length - 1;
    while (nums[i] <= nums[start]) {
      i--;
    }
    [nums[start], nums[i]] = [nums[i], nums[start]];
    let j = start + 1;
    let k = nums.length - 1;
    while (j < k) {
      [nums[j], nums[k]] = [nums[k], nums[j]];
      j++;
      k--;
    }
  }
  return nums;
};
// console.info(nextPermutation([2, 3, 1]));
var searchRange = function (nums, target) {
  if (nums[0] > target || nums[nums.length - 1] < target) {
    return [-1, -1];
  }
  let start = 0;
  let end = nums.length - 1;
};
// 40. 组合总和 II
var combinationSum2 = function (candidates, target) {
  candidates.sort(sort);
  while (candidates[candidates.length - 1] > target) {
    candidates.length = candidates.length - 1;
  }
  const ret = [];
  candidates.forEach((c, i) => {
    if (c === target) {
      ret.push([c]);
    } else {
      const cdds = combinationSum2(candidates.slice(i + 1, candidates.length), target - c);
      if (cdds.length) {
        for (let cdd of cdds) {
          ret.push([c, ...cdd]);
        }
      }
    }
    while (c === candidates[i + 1]) {
      i++;
    }
  });
  return Array.from(new Set(ret.map(r => r.join(','))))
    .map(s => s.split(','))
    .map(arr => arr.map(num => num * 1));
};
