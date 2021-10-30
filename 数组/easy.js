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
var generate = function (numRows) {};
