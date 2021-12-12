// 401. 二进制手表 这狗日的题跟答案一比，老子真是tm深刻的意识到正着来太麻烦就他妈要倒着来！！！
var readBinaryWatch = function (turnedOn) {
 
};

var permute = function(nums) {
  const ret = [];
  const path = [];

  // nums是数字，k代表结束条件，used是已经用过的数字
  const backTrace = (nums, k, used)=>{
    if(path.length === k){
      ret.push([...path]);
      return;
    }
    for(let i = 0; i<nums.length;i++){
      if(used[i]){
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      backTrace(nums, k, used);
      path.pop();
      used[i] = false;
    }
  }
  backTrace(nums, nums.length, []);
  return ret;
};

// 17. 电话号码的字母组合
const map = {
  2:'abc',
  3:'def',
  4:'ghi',
  5:'jkl',
  6:'mno',
  7:'pqrs',
  8:'tuv',
  9:'wxyz'
}
var letterCombinations = function(digits) {
  if(!digits || digits ==='1'){
      return []
  }
  if(digits.length === 1){
      return map[digits].split('')
  }
  const ret = [];
  let path = '';
  const len = digits.length;

  // pos：第几个数字
  const backTrace = (pos)=>{
    const cods = map[digits[pos]];
    // 如果已经到了最后一位，就可以结束了
    if(pos === len-1){
      for(let i = 0; i < cods.length; i++){
        path+=cods[i];
        ret.push(path);
        path = path.substring(0, path.length-1)
      }
      return;
    }
    for(let i=0; i<cods.length; i++){
      path+=cods[i];
      backTrace(pos+1);
      path = path.substring(0, path.length-1)
    }
  }
  backTrace(0)
  return ret;
};

// 22. 括号生成
var generateParenthesis = function(n) {
  const ret = [];
  const l = '(';
  const r = ')'
  // str: 当前str， n：左右括号剩下的数量
  const backTrace = (str, n_left, n_right) => {
    if(n_left === 0){
      ret.push(str+r.repeat(n_right));
      return;
    }
    // 如果剩余数量相等，只能放左括号，否则可以左右都试试
    if(n_left === n_right){
      backTrace(str+l, n_left-1, n_right)
    }else{
      backTrace(str+l, n_left-1, n_right)
      backTrace(str+r, n_left, n_right-1)
    }
  }
  backTrace('',n,n);
  return ret;
};

// 47. 全排列 II
var permuteUnique = function(nums) {
  nums.sort();
  const len = nums.length
  const set = new Set();
  const path = [];

  const backTrace = (nums, used)=>{
    if(path.length === len){
      set.add(path.join(','))
      return;
    }
    for(let i = 0; i<nums.length; i++){
      if(used[i]){
          continue;
      }
      path.push(nums[i]);
      used[i] = true;
      backTrace(nums, used);
      path.pop();
      used[i] = false;
    }
  }
  backTrace(nums, [])
  return Array.from(set).map(s=>s.split(',').map(num=>num*1))
};

// 77. 组合
var combine = function(n, k) {
  if(k>n){
    return [[]]
  }
  const nums = new Array(n).fill(0).map((item,i)=>i+1)
  if(k === n){
    return [nums]
  }
  const ret = [];
  const path = [];

  const back = (nums, k, used, i_start)=>{
    if(path.length === k){
      ret.push([...path]);
      return;
    }
    for(let i = i_start; i<nums.length; i++){
      if(used[i]){
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      back(nums, k, used, i+1);
      used[i] = false;
      path.pop();
    }
  }
  back(nums, k, [],0)
  return ret;
};
// console.info(combine(4,2))

// 78. 子集
var subsets = function(nums) {
  if(nums.length === 0){
    return [[]]
  }
  if(nums.length === 1){
    return [[],nums]
  }
  const len = nums.length
  const ret = [];
  const path = [];
// k：应有的长度；
  const back = (nums, used, i_start, k)=>{
    if(path.length === k){
      ret.push([...path]);
      return; 
    }
    for(let i = i_start; i<nums.length; i++){
      if(used[i]){
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      back(nums, used, i+1, k);
      used[i] = false;
      path.pop();
    }
  }
  // i：子集里的元素个数
  for(let i = 0; i<len; i++){
    // 清空path
    path.length = 0;
    back(nums, [], 0, i)
  }
  return [...ret,nums];
};

// 79. 单词搜索
var exist = function(board, word) {
  const len_i = board.length;
  const len_j = board[0].length;
  const len = word.length;
  // pos: 坐标, level：第几个字母
  const back = (pos, level, used)=>{
    const cur = board[pos[0]][pos[1]];
    // 如果不符合，返回false
    if(cur !== word[level]){
      return false;
    }
    // 如果到了最后一层，返回true
    if(level === len-1){
      return true;
    }
    used[pos[0]][pos[1]] = true;
    // 上下左右走一圈
    let ret = false;
    const left = board[pos[0]][pos[1]-1];
    if(left && !used[pos[0]][pos[1]-1]){
      ret = back([pos[0], pos[1]-1], level+1, used);
      if(ret){
        return ret;
      }
    }
    const right = board[pos[0]][pos[1]+1];
    if(right && !used[pos[0]][pos[1]+1]){
     ret=  back([pos[0], pos[1]+1], level+1, used);
      if(ret){
        return ret;
      }
    }
    const top = board[pos[0]-1] && board[pos[0]-1][pos[1]];
    if(top  && !used[pos[0]-1][pos[1]] ){
     ret= back([pos[0]-1, pos[1]], level+1, used);
     if(ret){
      return ret;
    }
    }
    const bottom = board[pos[0]+1] && board[pos[0]+1][pos[1]];
    if(bottom  && !used[pos[0]+1][pos[1]]){
      ret = back([pos[0]+1, pos[1]], level+1, used);
      if(ret){
        return ret;
      }
    }
    used[pos[0]][pos[1]] = false;
    return false;
  }

  for(let i = 0; i < len_i; i++){
    for(let j = 0; j < len_j; j++){
      const ret = back([i,j],0, new Array(len_i).fill(0).map(item=> []))
      if(ret){
        return ret;
      }
    }
  }
  return false;
};
// console.info(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCB"))

// 90. 子集 II
var subsetsWithDup = function(nums) {
  nums.sort();
  const ret = [];
  const path = [];
// k: 子集的长度，used：用过的元素
  const back = (nums,i_start, k, used)=>{
    if(path.length === k){
      ret.push([...path]);
      return;
    }
    for(let i = i_start; i<nums.length; i++){
      if(used[i] || (nums[i] === nums[i-1] && !used[i-1])){
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      back(nums, i+1, k, used);
      path.pop();
      used[i] = false;
    }
  }
  // i 子集的长度
  for(let i = 0; i<=nums.length;i++){
    back(nums,0,i,[]);
  }
  return ret;
};

// 93. 复原 IP 地址
var restoreIpAddresses = function(s) {
  if(s.length<4 || s.length>12){
    return [];
  }
  function _isStrValid (str){
    if(!str || str.length>3){
      return false;
    }
    if(str.length === 1){
      return true;
    }
    if(str.length === 2){
      return str[0]!=='0';
    }
    if(str.length === 3){
      return str[0]!=='0' && str*1 <= 255;
    }
  }
  const ret = [];
  const path = [];
  // str：剩余的字符串，nums：要切割出几个数字
  const back = (str, nums)=>{
    // 最后一位
    if(nums === 1){
      if(_isStrValid(str)){
        path.push(str);
        ret.push(path.join('.'))
        path.pop()
      }
      return;
    }
    // i：第一个数字的长度
    for(let i = 1; i<=3;i++){
      const cur = str.substring(0,i);
      if(_isStrValid(cur)){
        path.push(cur);
        back(str.substring(i,str.length),nums-1);
        path.pop();
      }
    }
  }
  back(s,4);
  return ret;
};
// console.info(restoreIpAddresses("25525511135"))

// 131. 分割回文串
var partition = function(s) {
  if(!s){
    return [[]]
  }
  const ret = [];
  const path = [];
  const back = (str)=>{
    if(str.length === 0){
      ret.push([...path]);
      return;
    }
    if(str.length === 1){
      path.push(str);
      ret.push([...path]);
      path.pop();
      return;
    }
    let len = 1;
    let cur = str.substring(0,len);
    do{
      if(cur.split('').reverse().join('') === cur){
        path.push(cur);
        back(str.substring(len,str.length));
        path.pop();
      }
      len++;
      cur = str.substring(0,len);
    }while(len<=str.length)
  }
  back(s);
  return ret;
};
// console.info(partition('efe'))

// 216. 组合总和 III
var combinationSum3 = function(k, n) {
  const ret = [];
  const path = [];
  // k: 个数，n：sum，start：起始值
  const back = (k, n, start)=>{
    const sum = path.reduce((pre, cur)=>pre+cur,0);
    if(k === 1){
      while(sum+start<n && start<9){
        start++;
      }
      if(start+sum === n){
        path.push(start);
        ret.push([...path])
        path.pop()
      }
      return;
    }
    // 碰上了
    if(sum < n-start){
      for(let i = start; i<9; i++){
        path.push(i);
        back(k-1, n, i+1);
        path.pop();
      }
    }
  }
  back(k, n, 1);
  return ret;
};
// console.info(combinationSum3(3,7))

//306. 累加数
var isAdditiveNumber = function(num) {
  if(num.length<3){
    return false
  }
  if(num*1 === 0){
    return true;
  }
  let i_not_0 = 0;
  while(num[i_not_0]==='0'){
      i_not_0++;
  }
  // 切掉多余的0
  if(i_not_0>0){
      num = num.substring(i_not_0-1, num.length);
  }
  let ret = false;
  function _getNextNum(num1, num2, str){
    // 如果0开头就错了，返回
    if(str[0] === '0'){
      return;
    }
    if(num1+num2 === str*1){
      ret = true;
      return ;
    }
    let len = Math.max(num1,num2).toString().length;
    while(len<str.length){
      const num = str.substring(0,len)*1;
      if(num === num1+num2){
        return len;
      }else{
        len++;
      }
    }
  } 
  // 第一个数字的长度，第二个数字的长度
  const back = (len_1, len_2, str) => {
    if(ret){
      return ret;
    }
    // 如果第二位以0开头，却不是0，直接返回
    if(str[len_1] === '0' && len_2 !==1){
      return;
    }
    const [num1, num2] = [str.substring(0,len_1)*1, str.substring(len_1, len_1+len_2)*1]
    const len_3 = _getNextNum(num1, num2, str.substring(len_1+len_2, str.length));
    if(len_3){
      back(len_2, len_3, str.substring(len_1, str.length))
    }
    if(len_1 + len_2<str.length){
      back(len_1, len_2+1, str)
    }
  }
  // 如果第一位是0， 那第一个数字只能是0，否则可以随便耍
  if(num[0] === '0'){
    back(1,1,num);
  }else{
    const i_first_last = (num.length-1)/2;
    for(let i = 1; i<=i_first_last;i++){
      back(i,1,num);
    }
  }

  return ret;
};
// console.info(isAdditiveNumber("111122335588143"))

// 剑指 Offer 34. 二叉树中和为某一值的路径
var pathSum = function(root, target) {
  if(!root){
    return []
  }
  const ret = [];
  const path = [];
  const back = (node)=>{
    const {val, left, right} = node;
    path.push(val);
    const sum = path.reduce((pre,cur)=>pre+cur,0)
    if(sum===target && !left && !right){
      ret.push([...path]);
    }
    left && back(left);
    right && back(right);
    path.pop();
  }
  back(root)
  return ret;
};
// 剑指 Offer 38. 字符串的排列
var permutation = function(s) {
  if(!s){
    return [];
  }
  s = s.split('').sort().join('')
  const ret = [];
  let cur = ''
  const len = s.length;
  const back = (str, used) => {
    if(cur.length === str.length){
      ret.push(cur);
      return;
    }
    for(let i=0; i<len;i++){
      if(used[i] || (str[i] === str[i-1] && !used[i-1])){
        continue;
      }
      cur+=str[i];
      used[i] = true;
      back(str, used);
      cur = cur.substring(0, cur.length-1);
      used[i] = false;
    }
  }
  back(s, [])
  return ret;
};
// 面试题 17.22. 单词转换
var findLadders = function(beginWord, endWord, wordList) {
  const i_target = wordList.findIndex(w=>w===endWord);
  if(i_target===-1){
    return []
  }
  [wordList[0],wordList[i_target]] = [wordList[i_target],wordList[0]]
  function _isNext(str, next){
    let ret = 0;
    for(let i=0; i<str.length;i++){
      if(str[i]!==next[i]){
        ret++;
      }
    }
    return ret===1
  }
  let ret = [];
  const path = [beginWord];
  const back = (list, used) => {
    if(ret.length){
      return;
    }
    if(path[path.length-1] === endWord){
      ret = [...path];
      return;
    }
    for(let i=0;i<list.length;i++){
      if(used[i] || !_isNext(path[path.length-1], list[i])){
        continue;
      }
      path.push(list[i]);
      used[i] = true;
      back(list, used);
      path.pop();
    }
  }
  back(wordList, [])
  return ret;
};