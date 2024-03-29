// 70. 爬楼梯
// const map = {
//   1:1,
//   2:2
// }
var climbStairs = function(n) {
if(map[n]){
  return map[n];
}
const ret = climbStairs(n-1)+climbStairs(n-2)
map[n] = ret;
return ret;
};

// 338. 比特位计数
// const map = {
//   0:0,
//   1:1,
//   2:1
// }
var countBits = function(n) {
  const ret = [];
  for(let i = 0;i<n;i++){
    if(map[i]!==undefined){
      ret.push(i);
    }else{
      let temp = 0;
      let cur = i;
      while(cur>0){
        const left = cur%2;
        temp+=left;
        cur = left ? (cur-1)/2 : cur/2
      }
      ret.push(temp);
      map[i] = temp
    }
  }
  return ret;
};
//509. 斐波那契数
var fib = function(n) {
  if(n<=1){
    return n;
  }
  let first = 0;
  let second = 1;
  let acc = 0;
  for(let i = 2; i<=n;i++){
    acc = first + second;
    [first, second] = [second, acc];
  }
  return acc;
};
//1137. 第 N 个泰波那契数
var tribonacci = function(n) {
  if(n<=1){
    return n;
  }
  if(n===2){
    return 1;
  }
  let first = 0;
  let second = 1;
  let third = 1;
  let acc = 0;
  for(let i = 3; i<=n;i++){
    acc = first + second + third;
    [first, second, third] = [second,third, acc];
  }
  return acc;
};
// LCP 07. 传递信息
var numWays = function(n, relation, k) {
  // 没有入口还玩个毛
  if(!relation.some(r=>r[1] === n-1)){
    return 0;
  }
  let ret = 0;
  // 目标
  const target = n-1;
  // 汇总跳跳
  const map = {}
   for(let i = 0; i<n;i++){
      map[i] = [];
  }
  relation.forEach(([key, val])=>{
    map[key].push(val);
  });

  function _run(key,k){
    const keys = map[key];
    if(k===1){
      if(keys.some(val=>val === target)){
        ret++;
      }
      return;
    }
    keys.forEach(key=>{
      _run(key,k--);
    })

  }
  _run(0,k)
  return ret;
};
// console.info(numWays(5,[[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]],3))
// 剑指 Offer 42. 连续子数组的最大和
var maxSubArray = function(nums) {
  if(nums.length ===1 ){
      return nums[0]
  }
  let ret = -Infinity;
  // 累计的值
  let acc = 0;
  for(let i = 0; i<nums.length;i++){
      const cur = nums[i];
      ret = Math.max(cur, ret);
      const _acc = acc+cur;
      if(_acc<=0){
          acc = 0;
      }else{
          acc = _acc
          ret = Math.max(acc, ret);
      }
  }
  return ret;
};
// 最长回文
var longestPalindrome = function(s) {
  if(!s){
    return ''
  }
  if(s.length===1){
      return s
  }
  let len = s.length;
  while(true){
      let start = 0;
      let end = len;
      while(end<=s.length){
          const str = s.substring(start,end);
          if(str.split('').reverse().join('') === str){
              return str;
          }else{
              start++;
              end++;
          }
      }
      len--;
  }
};
// console.info(longestPalindrome("cbbd"))

// 45. 跳跃游戏 II
var jump = function(nums) {
  if(nums.length<=1){
      return 0
  }
  let ret = 1;
  // 第一步至少走出去一步
  let left = 1;
  // 第一步最多
  let right = nums[0];
  while(right<nums.length-1){
    let next_r = right;
    for(let i = left;i<=right;i++){
      next_r = Math.max(i+nums[i], next_r);
    }
    left++;
    right = next_r;
    ret++;
  }
  return ret;
};
// console.info(jump([1,2,3]));

// 55. 跳跃游戏
var canJump = function(nums) {
  const len = nums.length;
  if(len<=1){
    return true;
  }
  if(nums[0] === 0){
    return false;
  }
  if(len-1<=nums[0]){
    return true;
  }
  let left = 0;
  let right = nums[0];
  while(right<len-1 && left<right){
    let _right = right;
    for(let i=right;i>=left;i--){
      _right = Math.max(i+nums[i],_right);
      if(_right>=len-1){
        return true;
      }
    }
    left++;
    right=_right
  }
  return false;
};
// console.info(canJump([1,2]));

// 62. 不同路径
// const map = {}
// const key = (m,n)=>`${m}-${n}`
var uniquePaths = function(m, n) {
  const _key = key(m,n)
  if(m<=1 || n<=1){
    return 1;
  }
  if(map[_key]){
    return map[key(m,n)]
  }
  const ret = uniquePaths(m-1,n)+uniquePaths(m,n-1);
  map[_key] = ret;
  return ret;
};

// 63. 不同路径 II
// 可行但是超时了... 还得用map
var uniquePathsWithObstacles = function(obstacleGrid) {
  const height = obstacleGrid.length;
  const width = obstacleGrid[0].length;
  // 如果起点或终点是个坑
  if(obstacleGrid[0][0] ===1 || obstacleGrid[height-1][width-1] === 1){
    return 0;
  }
  // 一条路
  if(width<=1 || height<=1){
    return obstacleGrid.flat().some(i=>i===1) ? 0 : 1;
  }
  const bottom = obstacleGrid[height-1];
  const rightest = obstacleGrid.map(arr=>arr[arr.length-1]);
  function run(h, w){
    const _key = key(h,w);
    if(map[_key]!==undefined){
      return map[_key];
    }
    // 到底了
    if(h === height-1 ){
      const ret = bottom.indexOf(1, w+1)===-1 ? 1: 0;
      map[_key] = ret;
      return ret;
    }
    if(w === width-1){
      const ret = rightest.indexOf(1, h+1)===-1 ? 1: 0;
      map[_key] = ret;
      return ret;
    }
    // 走右
    const isRightValid = obstacleGrid[h][w+1]!==1;
    const isBottomValid = obstacleGrid[h+1][w]!==1;
    const rightNum = isRightValid ? run(h, w+1) : 0;
    const bottomNum = isBottomValid ? run(h+1, w):0
    const ret = rightNum+bottomNum;
    map[_key] = ret;
    return ret;
  }
  return run(0,0)
};
// console.info(uniquePathsWithObstacles([[0,1],[0,0]]))

// 64. 最小路径和
var minPathSum = function(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const bottom = grid[height-1];
  const rightest = grid.map(arr=>arr[arr.length-1]);
  const map = {}

  function run(h, w){
    const _key = key(h,w);
    if(map[_key]){
      return map[_key]
    }
    // 到了终点
    if(h === height-1 && w === width-1){
      return grid[h][w];
    }
    // 到底
    if(h === height-1){
      let here = 0;
      for(let i = w; i<width;i++){
        here+=bottom[i];
      }
      map[_key] = here;
      return here;
    }
    // 到右
    if(w === width-1){
      let here = 0;
      for(let i = h; i<height;i++){
        here+=rightest[i];
      }
      map[_key] = here;
      return here;
    }
    // 一般情况
    const ret = Math.min(run(h+1, w),run(h, w+1));
    map[_key] = ret+grid[h][w];
    return map[_key]
  }
  return run(0,0);
};
// console.info(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))
// console.info(map)

// 91. 解码方法
var numDecodings = function(s) {
  if(s[0]==='0'){
      return 0;
  }
  const reg = /[1-2]0/;
  const arr = s.split(reg).filter(str=>!!str);
  if(arr.some(s=>s.indexOf('0') !== -1)){
    return 0
  }
  if(!arr.length){
      return 1
  }
  const map = {};
  function getNum(str){
    if(map[str]){
      return map[str]
    }
    if(str.length===1){
      map[str] = 1;
      return 1;
    }
    if(str.length===2){
      map[str] = str*1 > 26 ? 1 : 2;
      return map[str]
    }
    map[str] = getNum(str.substring(1,str.length)) + (str.substring(0,2)*1>26 ? 0 : getNum(str.substring(2, str.length)))
    return  map[str];
  }
  return arr.map(s=>{
    return getNum(s)
  }).reduce((pre,cur)=>pre*cur,1)
};
// console.info(numDecodings("111111111111111111111111111111111111111111111"))

// 97. 交错字符串
// const map={};
const cut = (str)=>str.substring(1,str.length)
// const key = (m,n,k)=>`${m}-${n}-${k}`
var isInterleave = function(s1, s2, s3) {
  if(s1.length+s2.length!==s3.length){
    return false;
  }
  if(!s1 && !s2 && !s3){
    return true;
  }
  const _key = key(s1,s2,s3);
  if(map[_key]!==undefined){
    return map[_key]
  }
  const isOne = s1[0] === s3[0];
  const isTwo = s2[0] === s3[0]
  if(isOne && isTwo){
    map[_key] = isInterleave(cut(s1), s2,cut(s3)) || isInterleave(s1, cut(s2),cut(s3));
    return map[_key]
  }
  if(isOne){
    map[_key] = isInterleave(cut(s1), s2,cut(s3))
    return map[_key]
  }
  if(isTwo){
    map[_key] = isInterleave(s1, cut(s2),cut(s3));
    return map[_key]
  }
  map[_key] = false;
  return map[_key]
};

// 120. 三角形最小路径和
var minimumTotal = function(triangle) {
  if(triangle.length===0){
    return 0;
  }
  if(triangle.length===1){
    return triangle[0][0];
  }
  const map = {};
  const len = triangle.length;
  const key = (m,n)=>`${m}-${n}`
  const run = (h,w)=>{
    const _key = key(h,w);
    if(map[_key]!==undefined){
      return map[_key]
    }
    if(h===len-1){
      map[_key]= triangle[h][w];
      return map[_key]
    }
    map[_key] = triangle[h][w]+Math.min(run(h+1,w),run(h+1,w+1));
    return map[_key]
  }

  return run(0,0);
};

// 122. 买卖股票的最佳时机 II
var maxProfit = function(prices) {
  if(prices.length<=1){
    return 0;
  }
  let ret = 0;
  for(let i=0;i<prices.length-1; i++){
    const [cur, next] = [prices[i], prices[i+1]];
    if(next>cur){
      ret+=(next-cur);
    }
  }
  return ret;
};

// 139. 单词拆分 用状态转移试试
var wordBreak = function(s, wordDict) {
  let dp = new Array(s.length).fill(false);
  let set = new Set(wordDict);
  for(let i=0; i<s.length;i++){
    if(set.has(s.substring(0,i+1))){
      dp[i]=true;
      continue;
    }
    for(let j=0;j<i;j++){
      if(dp[j]&&set.has(s.substring(j+1,i+1))){
        dp[i]=true;
        break;
      }
    }
  }
  return dp[s.length-1];
};
// 152. 乘积最大子数组
var maxProduct = function(nums) {
  // dp:[max, min]
  const dp = new Array(nums.length).fill([]);
  let ret = nums[0];
  dp[0]=[nums[0],nums[0]];
  for(let i=0;i<nums.length-1; i++){
    const [max,min]=dp[i];
    const next = nums[i+1];
    const cdds = [max*next, min*next, next]
    dp[i+1] = [Math.max(...cdds), Math.min(...cdds)]
    ret = Math.max(ret, dp[i+1][0]);
  }
  return ret;
};
// 198. 打家劫舍
var _rob = function(nums) {
  if(nums.length===0){
    return 0;
  }
  if(nums.length===1){
    return nums[0];
  }
  if(nums.length===2){
    return Math.max(...nums);
  }
  const dp = new Array(nums.length).fill(0);
  dp[0]=nums[0];dp[1]=Math.max(nums[0],nums[1]);
  for(let i=2;i<nums.length; i++){
    dp[i]=Math.max(dp[i-1],dp[i-2]+nums[i]);
  }
  return dp[nums.length-1]
};
// 213. 打家劫舍 II
var rob = function(nums) {
  let ret = -Infinity;
  for(let i=0;i<nums.length;i++){
    const newNums = i===0?nums.slice(i,nums.length-1)  :nums.slice(i,nums.length).concat(nums.slice(0,i-1));
    ret = Math.max(_rob(newNums),ret)
  }
  return ret;
};
// 241. 为运算表达式设计优先级
var diffWaysToCompute = function(expression) {
  const set = new Set();
  const expressions = [];
  // 解析字符串start
  let temp='';
  const reg=/[\+\-\*\/]/;
  const _isOperator=(s)=>reg.test(s)
  for(let i=0;i<expression.length;i++){
    const code=expression[i];
    if(_isOperator(code)){
      if(temp){
        expressions.push(temp*1);
        temp='';
      }
      expressions.push(code);
    }else{
      temp+=code;
    }
  }
  expressions.push(temp*1)
  // 解析字符串end
  // 按照各种可能执行
  const run = arr => {
    if(arr.length===1){
      set.add(arr[0]);
      return;
    }
    for(let i=1;i<arr.length;i+=2){
      const [left, code, right]=[arr[i-1],arr[i],arr[i+1]];
      let next;
      if(code==='+'){
        next = left+right;
      }else if(code==='-'){
        next = left-right;
      }else if(code==='*'){
        next = left*right;
      }else{
        next = left/right;
      }
      run([...arr.slice(0,i-1), next,...arr.slice(i+2,arr.length)])
    }
  }
  run(expressions)
  return Array.from(set);
};

// 264. 丑数 II
var nthUglyNumber = function(n) {
  if(n<=1){
    return 1;
  }
  const dp=[1, 2];
  if(dp[n]){
    return dp[n];
  }
  let lastLeft=0;
  for(let i=2;i<=n;i++){
    // 找到最左值
    let left;
    for(let j=lastLeft;j<i;j++){
      if(dp[j]*5>dp[i-1]){
        left = j;
        break;
      }
    }
    // 找到最右值
    for(let j=left;j<i;j++){
      if(dp[j]*2>dp[i-1]){
        right = j;
        break;
      }
    }
    dp[i]=Infinity;
    for(let j=left;j<=right;j++){
      const [two, three,five] = [dp[j]*2,dp[j]*3,dp[j]*5];
      if(two>dp[i-1]){
        dp[i]=Math.min(dp[i],two);
        break;
      }
      if(three>dp[i-1]){
        dp[i]=Math.min(dp[i],three);
      }
      if(five>dp[i-1]){
        dp[i]=Math.min(dp[i],five);
      }
    }
    lastLeft=left;
  }
  return dp[n-1];
};
// 221. 最大正方形
var maximalSquare = function(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  let ret=0;
  const run = (h,w)=>{
    // 0,滚粗
    if(matrix[h][w]==='0'){
      return;
    }
    let len = 1;
    while(h+len <height && w+len <width){
      let valid=true;
      for(let i=0;i<=len;i++){
        if(matrix[h+i][w+len] === '0' || matrix[h+len][w+i] === '0'){
          valid=false;
          break;
        }
      }
      if(!valid){
        break;
      }
      len++;
    }
    ret=Math.max(ret,len*len)
  }
  for(let i=0; i<height; i++){
    for(let j=0; j<width; j++){
      run(i,j);
    }
  }
  // 以这个方块为左顶点的最大正方形
 
  run(0,0);
  return ret;
};
// 279. 完全平方数
var numSquares = function(n) {
  const dp=[0,1,2,3];
  if(dp[n]){
    return dp[n];
  }
  for(let i=4;i<=n;i++){
    // 如果刚好是完全平方数
    const sqrt = Math.sqrt(i);
    if(Math.floor(sqrt)===sqrt){
      dp[i]=1;
      continue;
    }
    dp[i]=Infinity;
    let j=1,k=i-1;
    while(j<=k){
      dp[i]=Math.min(dp[k]+dp[j],dp[i]);
      if(dp[i]===2){
        break;
      }
      j++;
      k--;
    }
  }
  return dp[n]
};
// 300. 最长递增子序列
var lengthOfLIS = function(nums) {
  if(nums.length<2){
    return nums.length;
  }
  let ret = -Infinity;
  const dp = [1]
  for(let i=1;i<nums.length;i++){
    dp[i]=1;
    for(let j=0; j<i-1;j++){
      if(nums[i]>nums[j]){
        dp[i]=Math.max(dp[i],dp[j]+1);
        ret=Math.max(ret,dp[i]);
      }
    }
  }
  return ret;
};
// TODO: 309. 最佳买卖股票时机含冷冻期
var maxProfit = function(prices) {
  const len = prices.length;
  if(len<=1){
    return 0;
  }
  if(len===2){
    return prices[1]>prices[0]?prices[1]-prices[0]:0
  }

};
// 313. 超级丑数 //  超时了
var nthSuperUglyNumber = function(n, primes) {
  if(n===1){
    return 1;
  }
  // 特殊情况
  if(primes.length===1){
    return Math.pow(primes[0],n-1)
  }
  const dp=[1, primes[0]];
  // 最左侧指标
  let i_left = 0;
  let i_next_prime = 1;
  const first_prime = primes[0];
  const last_prime = primes[primes.length-1];
  for(let i=2;i<n;i++){
    let last = dp[i-1];
    dp[i]=primes[i_next_prime]|| Infinity;
    // 确定左侧的边界值
    while(dp[i_left]*last_prime<=last){
      i_left++;
    }
    for(let j=i_left;j<i;j++){
      if(first_prime*dp[j]>last){
        dp[i]=Math.min(first_prime*dp[j], dp[i]);
        break;
      }
      for(let k=1;k<primes.length;k++){
        const plus = dp[j]*primes[k];
        if(plus>last){
          dp[i]=Math.min(plus, dp[i]);
          break;
        }
      }
    }
    if(dp[i]===primes[i_next_prime]){
      i_next_prime++;
    }
  }
  return dp[n-1]
};
// 313. 超级丑数 堆
var nthSuperUglyNumber = function(n, primes) {
  if(n===1){
    return 1;
  }
  // 特殊情况
  if(primes.length===1){
    return Math.pow(primes[0],n-1)
  }
  const dp=[0,1]
  const i_cdds=new Array(primes.length).fill(1);
  for(let m=2;m<=n;m++){
    let min=dp[m-1];
    let next=Infinity;
    for(let i=0;i<primes.length; i++){
      const p = primes[i];
      for(let j=0;j<i_cdds.length;j++){
        const val=dp[i_cdds[j]]*p
        if(val>min){
          next=Math.min(next,val);
        }
      }
    }
    let hasFound = false;
    for(let k=0;k<i_cdds.length;k++){
      if(hasFound){
        break;
      }
      for(let i=0;i<primes.length; i++){
        const p = primes[i];
        if(next===p*dp[i_cdds[k]]){
          i_cdds[k]++;
          hasFound=true;
          break;
        }
      }
    }
    dp[m]=next;
  }
  return dp[n];
};
var nthSuperUglyNumber = function(n, primes) {
  const dp=[0];
  const len=primes.length;
  const nums = new Array(len).fill(1);
  const points = new Array(len).fill(0)
  for(let i=1;i<=n;i++){
    let min = Infinity;
    for(let j=0;j<len;j++){
      min = Math.min(min,nums[j]);
    }
    dp[i]=min;
    for(let k=0;k<len;k++){
      if(min===nums[k]){
        points[k]++;
        nums[k]=dp[points[k]]*primes[k];
      }
    }
  }
  console.info(dp)
  return dp[n];
};
// console.info(nthSuperUglyNumber(12,[2,7,13,19]))
// console.info(nthSuperUglyNumber(15,[3,5,7,11,19,23,29,41,43,47]))

// 343. 整数拆分
var integerBreak = function(n) {
  const dp=[0,1,2];
  for(let i=3;i<=n;i++){
    dp[i]=-Infinity;
    for(let j=1;j<i;j++){
      dp[i]=Math.max(Math.max(dp[j],j)*Math.max(i-j,dp[i-j]),dp[i])
    }
  }
  return dp[n];
};
// 322. 零钱兑换 超时了
var coinChange = function(coins, amount) {
  coins.sort((a,b)=>a>b?1:-1)
  coins=coins.filter(c=>c<=amount);
  // 各种极端情况
  if(amount===0) return 0;
  if(coins.length===0 || coins[0]>amount) return -1;
  if(coins.length===1) return amount%coins[0]===0?amount/coins[0]:-1;
  
  const coin0=coins[0];
  const dp=[];
  dp[coin0]=1;
  for(let i=coin0;i<=amount;i++){
    if(coins.some(c=>c===i)){
      dp[i]=1;
      continue;
    }
    dp[i]=-1;
    for(let j=coin0;j<i;j++){
      const [head, tailor]=[dp[j],dp[i-j]];
      if(head!==-1 && tailor!==-1){
        dp[i]= dp[i]===-1? head+tailor: Math.min(dp[i], head+tailor);
      }
    }
  }
  return dp[i]
};
var coinChange = function(coins, amount) {
  coins.sort((a,b)=>a>b?1:-1)
  coins=coins.filter(c=>c<=amount);
  // 各种极端情况
  if(amount===0) return 0;
  if(coins.length===0 || coins[0]>amount) return -1;
  if(coins.length===1) return amount%coins[0]===0?amount/coins[0]:-1;
  
  const coin0=coins[0];
  const dp=[];
  dp[coin0]=1;
  for(let i=coin0;i<=amount;i++){
    if(coins.some(c=>c===i)){
      dp[i]=1;
      continue;
    }
    dp[i]=-1;
    for(let j=coin0;j<i;j++){
      const [head, tailor]=[dp[j],dp[i-j]];
      if(head!==-1 && tailor!==-1){
        dp[i]= dp[i]===-1? head+tailor: Math.min(dp[i], head+tailor);
      }
    }
  }
  return dp[i]
};
// 357. 计算各个位数不同的数字个数
var countNumbersWithUniqueDigits = function(n) {
  if(n>10){
    return 0;
  }
  const dp=[0,10]
  let cur=11;
  let acc=9;
  for(let i=2;i<=n;i++){  
    const next_acc = acc*(cur-i);
    dp[i]= dp[i-1]+ next_acc;
    acc=next_acc;
  }
  return dp[n];
};
// 368. 最大整除子集
var largestDivisibleSubset = function(nums) {
  if(nums.length===0){
    return [];
  }
  if(nums.length===1){
    return nums;
  }
  nums.sort((a,b)=>a>b? 1 : -1);
  // dp=[len, i_last] 长度, 上一个元素的位置
  let maxLen=-Infinity;
  let i_max=-1;
  const dp=[[1,undefined]];
  for(let i=1;i<nums.length;i++){
    let len_max=-Infinity;
    for(let j=i-1; j>=0;j--){
      const num=nums[j];
      const [len]= dp[j];
      if(nums[i]%num===0 && len>len_max){
        len_max=len;
        dp[i]=[len_max+1,j];
      }
    }
    if(dp[i][0]>maxLen){
      maxLen=dp[i][0];
      i_max=i;
    }
  }
  const ret=[];
  while(i_max!==undefined){
    ret.push(nums[i_max]);
    i_max=dp[i_max]&&dp[i_max][1];
  }
  return ret;
};
// 375. 猜数字大小 II
var getMoneyAmount = function(n) {
  const dp = new Array(n+1).fill(0).map(item=>new Array(n+1).fill(0));
  for(let i=1;i<=n;i++){
    // 相同为0
    for(let j=i;j>0;j--){
      if(i===j){
        dp[j][i]=0;  
      }else{
        dp[j][i]=j+dp[j+1][i];
        for(let k=j+1;k<i;k++){
          dp[j][i]=Math.min(dp[j][i],k+ Math.max(dp[j][k-1],dp[k+1][i]))
        }
      }
    }
  }
  // console.info(dp)
  return dp[1][n]
};
// console.info(getMoneyAmount(10))