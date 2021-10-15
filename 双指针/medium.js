// 辅助方法和数据
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
let arr = new Array(5);
for(let i=3; i>=0; i--){
  const node = new ListNode(i+1);
  arr[i] = node;
  if(arr[i+1]){
    node.next = arr[i+1]
  }
}
const  [one, two, three, four] = arr;

function sort(a,b){
  return a>b?1:-1
}
const mod = (10**9)+7; // 求余数

// --------------------------------------------------------

//剑指 Offer II 077. 链表排序
var sortList = function(head) {
  const arr = [];
  while(head){
    arr.push(head);
    head= head.next;
  }
  arr.sort((a, b)=> a.val<b.val?-1:1);
  arr.push(null);
  for(let i = 0;i<arr.length-1; i++) {
    arr[i].next = arr[i+1]
  }
  return arr[0]
};
// 剑指 Offer II 026. 重排链表
var reorderList = function(head) {
  if(!head.next){
    return head;
  }
  // 找中间节点
  let slow = head;
  let fast = head;
  while(fast && fast.next){
    slow = slow.next; 
    fast = fast.next.next;
  }
  // 翻转后一段
  const end = slow;
  let pre = null;
  while(slow && slow.next){
    let _pre = pre;
    let _slow = slow;
    slow = slow.next;
    pre = _slow;
    pre.next = _pre;
  }
  slow.next = pre;
  // 次序插入
  let ret = head;
  let next1 = null
  let next2 = null;
  while(head){
    next1 = head.next === end ? null : head.next;
    head.next = slow;
    next2 = slow.next;
    if(next1){
      slow.next = next1;
    }
    slow = next2;
    head = next1;
  }
  return ret;
};
// 剑指 Offer II 022. 链表中环的入口节点
var detectCycle = function(head) {
  const map = new Map();
  while(head){
    if(map.get(head)){
      return head;
    }else{
      map.set(head, true);
      head = head.next;
    }
  }
  return null;    
};
// 剑指 Offer II 014. 字符串中的变位词
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var checkInclusion = function(s1, s2) {
  if(s1.length>s2.length){
    return false;
  }
  let ret = false;
  s1 = s1.split('').sort().join('')
  let i = 0; j = s1.length;
  while(!ret && j<=s2.length){
    let str = s2.substring(i,j).split('').sort().join('')
    if(str === s1){
      return true;
    }else{
      i++; 
      j++;
    }
  }
  return false
};
// 剑指 Offer II 007. 数组中和为 0 的三个数
 var threeSum = function(nums) {
  if(nums.length<3){
    return [];
  }
  const map = {};
  const ret = [];
  nums.forEach(n=>{
    map[n] = (map[n] || 0)+1;
  });
  const _nums = [];;
  Object.keys(map).map(key=> key*1).sort((a,b)=>a>b?1:-1).forEach(key=>{
    if(map[key]<2){
      _nums.push(key)
    } else{
      _nums.push(key);
      _nums.push(key);
    } 
  })
  if(map[0]>=3){
    ret.push('0, 0, 0')
  }
  let i = 0;
  while(i<_nums.length-2){
    let j = i+1; 
    let k = _nums.length-1;
    while(j<k){
      const sum = _nums[j]+_nums[i]+_nums[k]
      if(sum>0){
        k--;
      }else if(sum===0){
        let str = [_nums[i], _nums[j], _nums[k]].join(', ');
        if(ret.indexOf(str)===-1){
            ret.push(str);
        } 
        j++;
        k--;
      }else{
        j++;
      }
    }
    i++;
  }
  return ret.map(s=> s.split(', ').map(num=>num*1));
}
//  数对和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var pairSums = function(nums, target) {
  if(nums.length<2){
      return []
  }
  nums.sort((a,b)=>a>b?1:-1);
  let i = 0; let j = nums.length-1;
  let ret = [];
  while(i<j){
    let sum = nums[i]+nums[j];
    if(sum === target) {
      ret.push([nums[i],nums[j]])
      i++; j--;
    }else if(sum>target) {
      j--
    }else{
      i++;
    }
  }
  return ret;
};
// 面试题 02.04. 分割链表
var partition = function(head, x) {
// TODO:
};
// 一次编辑
var oneEditAway = function(first, second) {
  const len1 =first.length; const len2 = second.length;
  if(Math.abs(len1-len2)>1){
    return false;
  }
  let i = 0; let j =0 ; let hasOperated = false;
  if(len1 === len2){
    while(i<len1 && j<len2){
      if(first[i]!== second[j]){
        if(!hasOperated){
          hasOperated = true;
          i++;
          j++;
        }else{
          return false;
        }
      }else{
        i++;
        j++;
      }
    }
    return true;
  }
  // 保证first是长的
  [first, second] = len1>len2?[first,second]:[second, first];
  while(i<len1 && j<len2){
    if(first[i]!== second[j]){
      if(!hasOperated){
        hasOperated = true;
        i++;
      }else{
        return false;
      }
    }else{
      i++;
      j++;
    }
  }
  return true;
};
//  部分排序
var subSort = function(arr) {
  const len = arr.length;
  if(len<2){
    return [-1, -1];
  }
  let [left, right] = [-1, -1];
  let [min ,max] = [Infinity, -Infinity]
  arr[0]<arr[1] ? [arr[0], arr[1]]:[arr[1], arr[0]];
  for(let i = 0; i<len ; i++){
    if(arr[i]>=max){
      max = arr[i]
    }else{
      right = i;
    }
  }
  for(let i = len-1; i>=0 ; i--){
    if(arr[i]<=min){
      min = arr[i]
    }else{
      left = i;
    }
  }
  return [left, right];
};
// 最小差
var smallestDifference = function(a, b) {
  a.sort(sort);
  b.sort(sort);
  let ret = Infinity;
  let start = 0; 
  for(let i = 0; i<a.length;i++){
    let j = start;
    while(j<b.length){
      let abs = Math.abs(b[j]-a[i]);
      if(abs<ret){
        ret = abs;
        start = j;
      }
      j++;
    }
  }
  return ret; 
};
//  使字符串平衡的最小交换次数
var minSwaps = function(s) {
  let ret = 0;
  let left = 0;
  for(let i = 0; i<s.length; i++){
    if(s[i]==='['){
        left++;
    }else{
      if(left>0){
        left--;
      }else{
        ret++;
      }
    }
  }
  return ret%1===1  ? Math.floor(ret/2)+1 :ret/2
};
// threeSumMulti
var threeSumMulti = function(arr, target) {
  // 获取次数和数组
  const map = {};
  const nums = [];
  for(let i of arr){
    if(!map[i]){
      map[i] = 1;
      nums.push(i);
    }else{
      map[i]++;
    }
  }
  nums.sort(sort)
  // i, j, k, 可以相等
  let ret = 0;
  for(let i = 0; i<nums.length; i++){
    let j = i;
    let k = nums.length-1;
    while(j<=k){
      let sum  = nums[i] + nums[j] + nums[k];
      if(sum<target){
        j++;
      }else if(sum > target){
        k--;
      }else {
        // 几种情况：三个一样，两个一样，都不一样
        if(i === j && j===k ){
          if(map[nums[i]]===3){
            ret+=1;
          }
          if(map[nums[i]]>3){
            ret+=(map[nums[i]]*(map[nums[i]]-1)*(map[nums[i]]-2)/6);
          }
        }else if( i === j && j!==k){
            ret+=(map[nums[i]]*(map[nums[i]]-1)/2*map[nums[k]])
        }else if( i !== j && j===k){
            ret+=(map[nums[i]]*(map[nums[k]]-1)*map[nums[k]]/2);
        }else{
          ret+=(map[nums[i]]*map[nums[j]]*map[nums[k]]);
        }
        j++;
        k--;
      }
    }
  }
  // 计算可能数值
  const mod = (10**9)+7
  return ret%mod;
};
// 救生艇
var numRescueBoats = function(people, limit) {
  people.sort(sort);
  let i = 0; 
  let j = people.length-1;
  let ret = 0;
  while(i<j){
    if(people[j]+people[i]>limit){
      ret++;
      j--;
    }else{
      ret++;
      i++;
      j--;
    }
  }
  if(i===j){
    ret++;
  }
  return ret;
};
// 数组中的最长山脉
var longestMountain = function(arr) {
  const mountain = [];
  for(let i=1; i<arr.length;i++){
    mountain.push(arr[i]-arr[i-1]);
  }
  let i = 0; 
  let ret = 0;
  while(i<mountain.length){
    if(mountain[i]<=0){
      i++;
      continue;
    }
    let cur = 0;
    let j = i+1;
    while(mountain[j]>0){
      cur++;
      j++;
    }
    let hasDown = false;
    while(mountain[j]<0){
      hasDown = true;
      cur++;
      j++;
    }
    if(cur>0 && hasDown){
      ret = Math.max(ret, cur+2);
    }
    i = j;
  }
  return ret;
};
// 区间列表的交集
var intervalIntersection = function(firstList, secondList) {
  let i = 0; let j = 0;
  const ret = []
  while(i<firstList.length && j < secondList.length){
    const first = firstList[i];
    const second = secondList[j];
    const left = Math.max(first[0], second[0]);
    const right = Math.min(first[1], second[1]);
    if(left <= right){
      ret.push([left, right]);
    }
    if(first[1]>second[1]){
      j++
    }else if(first[1]<second[1]){
      i++;
    }else{
      i++;
      j++;
    }
  }
  return ret;
};
//  煎饼排序
function reverse(arr, i, j){
  while(i<j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
}
var pancakeSort = function(arr) {
  const sortedArr = JSON.parse(JSON.stringify(arr));
  sortedArr.sort(sort)
  const ret = [];
  let last = arr.length-1;
  while(last){
    if(arr[last] !== sortedArr[last]){
      let i = arr.indexOf(sortedArr[last]);
      if(i===0){
        ret.push(last+1);
        reverse(arr, 0, last);
      }else{
        ret.push(i+1);
        reverse(arr,0,i);
        ret.push(last+1);
        reverse(arr, 0, last);
      }
    }
    last--;
  }
  return ret;
};
// 令牌放置 
var bagOfTokensScore = function(tokens, power) {
  tokens.sort(sort);
  let i = 0; let j = tokens.length-1;
  let point = 0;
  while(i<j){
    if(power>=tokens[i]){
      power-=tokens[i];
      point++;
      i++;
      continue;
    }
    if(i<j && point>0){
      point--;
      power+=tokens[j]
      j--;
      continue;
    }
    i++;
    j--;
  }
  if(i===j && power>=tokens[i]){
    point++
  }
  return point;
};
// 推多米诺
var pushDominoes = function(dominoes) {
  let i = 0; 
  const ret = [];
  let cdds = []; // [...], [left, ..., right];
  while(i<dominoes.length){
    if(dominoes[i]==='.'){
      cdds.push('.');
      i++;
      continue;
    }
    if(dominoes[i]==='R'){
      if(cdds[0]==='R'){
          ret.push(cdds.fill('R').join(''));
      }else{
          ret.push(cdds.join(''))
      }
      cdds.length = 0;
      cdds.push('R');
      i++;
      continue;
    }
    if(dominoes[i] === 'L'){
      if(!cdds.length){
        ret.push('L');
      }else{
        cdds.push('L');
        if(cdds[0]==='R'){
          let j = 1; let k = cdds.length-2;
          while(j<k){
            cdds[j] = 'R';
            cdds[k] = 'L';
            j++;
            k--;
          }
        }else{
          cdds.fill('L')
        }
        ret.push(cdds.join(''));
        cdds.length = 0;
      }
      i++;
    }
  }
  if(cdds.length){
    ret.push(cdds[0]==='R' ? cdds.fill('R').join('') : cdds.join(''))
  }
  return ret.join('');
};
// 安排工作以达到最大收益
var maxProfitAssignment = function(difficulty, profit, worker) {
  // 排序
  const profitMap = {};
  for(let i = 0 ; i<profit.length;i++){
    const val = profit[i];
    // 记录下角标
    if(!profitMap[val]){
      profitMap[val] = i;
    }else{
      profitMap[val] = difficulty[i]>difficulty[profitMap[val]] ? profitMap[val] : i;
    }
  }
  profit.sort((a,b)=>a>b?-1:1)
  console.info(profitMap)
  // 按顺序来
  let ret = 0;
  worker.forEach(w=>{
    let i = 0;
    while(i<profit.length){
      const key = profitMap[profit[i]];
      const cost = difficulty[key];
      if(cost<=w){
        ret+=profit[i];
        break;
      }else{
        i++;
      }
    }
  })
  return ret;
};
// 划分字母区间
var partitionLabels = function(s) {
  if(!s){
    return [0]
  }
  const len = s.length;
  if(s[0] === s[len-1]){
    return [len];
  }
  let ret = [];
  let start = 0;
  while(start<len){
    let end = s.lastIndexOf(s[start]);
    if(start===end){
      ret.push(1);
      start++;
      continue;
    }
    for(let i = start; i<=end; i++){
      let lastIndex = s.lastIndexOf(s[i]);
      end = Math.max(end, lastIndex);
    }
    ret.push(end-start+1);
    start = end+1;
  }
  return ret;
};
// 在LR字符串中交换相邻字符
var canTransform = function(start, end) {
  if(start.length!==end.length) {
    return false;
  }
  const startArr = start.split('');
  const endArr = end.split('');
  let i = 0; let j = 0;
  while(i< startArr.length){
    if(startArr[i] === endArr[j]){
      i++;
      j++;
    }else{
      if(startArr[i]=== 'R' && endArr[j]==='X'){
        let k = i+1;
        while(k<start.length){
          if(startArr[k] === 'L'){
            return false;
          }else if(startArr[k] === 'R'){
            k++;
          }else{
            [startArr[k],startArr[i]]=[startArr[i],startArr[k]]
            break;
          }
        }
        if(startArr[i] === endArr[j]){
          i++;
          j++
        }
        else{
          return false
        }
        continue;
      }
      if(startArr[i]==='X' && endArr[j] === 'L' ){
        let k = i+1;
        while(k<start.length){
          if(startArr[k] === 'X'){
            k++;
          }else if(startArr[k] === 'R'){
            return false;
          }else{
            [startArr[k],startArr[i]]=[startArr[i],startArr[k]]
            break;
          }
        }
        if(startArr[i] === endArr[j]){
          i++;
          j++
        }else{
          return false
        }
        continue;
      }
      return false
    }
  }
  return true;
};
// 区间子数组个数
function isTheOne(num, left, right){
  return num>=left && num<=right;
}
function sum(num_l, num_r){
  return 1 + num_l + num_r + num_l * num_r;
}
var numSubarrayBoundedMax = function(nums, left, right) {
  let ret = 0;
  let i = 0; 
  let num_l = 0; // 左边满足的点；
  let num_r = 0; // 右边满足的点；
  let point = null; // 满足的点
  while(i<nums.length){
    if(nums[i]<left){
      if(point!==null){
        num_r+=1;
      }else{
        num_l+=1;
      }
    }else if(isTheOne(nums[i], left, right)){
      if(point===null){
        point = i;
      }else{
        ret+=sum(num_l, num_r);
        point = i;
        num_l = num_l + num_r + 1;
        num_r = 0;
      }
    }else{
      if(point!==null){
        ret+=sum(num_l, num_r);
      }
      num_l = 0;
      num_r = 0; 
      point = null;
    }
    i++;
  }
  if(point!==null){
    ret+=sum(num_l, num_r);
  }
  return ret;
};
// 情感丰富的文字
function parse(s){
  let i = 0; 
  let ret = [];
  while(i<s.length){
    ret.push(s[i]);
    let count = 1;
    while(s[i+1] === s[i]){
      count++;
      i++;
    }
    ret.push(count)
    i++
  }
  return ret;
}
var expressiveWords = function(s, words) {
  let ret = 0;
  let arrS = parse(s);
  words.forEach(w=>{
    const arrW = parse(w);
    let i = 0;
    while(i<arrS.length){
      if(arrS[i] === arrW[i] && (arrS[i+1]===arrW[i+1] || (arrS[i+1]>arrW[i+1] && arrS[i+1]>=3))){
        i+=2
      }else{
        break;
      }
    }
    if(i === arrW.length){
      ret+=1;
    }
  })
  return ret;
};
// 分割两个字符串得到回文串
var checkPalindromeFormation = function(a, b) {
  const valid = s => {
    let i = 0; let j= s.length-1;
    while(i<j){
     if(s[i] !== s[j]){
       return false
     }else{
       i++; 
       j--;
     }
    }
    return true;
  }
  if(valid(a) || valid(b)){
    return true;
  }
  const len = a.length;
  let i = 0;
  let j = len-1;
  while(i<j){
    if(a[i] === b[j]){
      i++;
      j--;
    }else{
      ret = valid(a.substring(i, j+1)) || valid(b.substring(i, j+1));
      break;
    }
  }
  if(i>=j){
    return true;
  }
  if(ret){
    return ret;
  }
  i = 0;
  j = len-1;
  while(i<j){
    if(b[i] === a[j]){
      i++;
      j--;
    }else{
      ret = valid(a.substring(i, j+1)) || valid(b.substring(i, j+1));
      break;
    }
  }
  if(i>=j){
    return true;
  }
  return ret;
};
// 盛最多水的容器
var maxArea = function(height) {
  let i = 0; let j = height.length-1;
  let ret = 0;
  while(i<j){
    ret = Math.max(ret, Math.min(height[i], height[j])*(j-i));
    if(height[i]>height[j]){
      j--;
    }else if(height[i]<height[j]){
      i++
    }else{
      i++;
      j--;
    }
  }
  return ret;
};
// 16. 最接近的三数之和
var threeSumClosest = function(nums, target) {
  nums.sort(sort);
  let i = 0;
  let ret = Infinity;
  while(i<nums.length-2){
    let j = i+1;
    let k = nums.length-1;
    while(j<k){
      let sum = nums[i] + nums[j]+nums[k];
      if(sum === target){
        return target;
      }else if(sum<target){
       ret = Math.abs(sum-target) > Math.abs(ret-target) ? ret : sum; 
       j++;
      }else{
        ret = Math.abs(sum-target) > Math.abs(ret-target) ? ret : sum; 
        k--;
      }
    }
    i++
  }
  return ret;
};
//  四数之和TODO:
var fourSum = function(nums, target) {
  if(nums.length<4){
    return [];
  }
  let arr = [];
  let map = {};
  for(let num of nums){
    if(arr.indexOf(num===-1)){
      arr.push(num);
    }
    map[num] = (map[num]||0)+1;
  }
  arr.sort(sort);


};
// 删除链表的倒数第 N 个结点
var removeNthFromEnd = function(head, n) {
  const arr = [];
  let cur = head;
  while(cur){
    arr.push(cur);
    cur = cur.next;
  }
  const len = arr.length;
  if(n>len){
    return head;
  }
  if(n === len){
    return arr[1] || null;
  }
  if(n===1){
    arr[len-2].next = null;
    return head;
  }
  arr[len-n-1].next = arr[len-n+1]||null
  return head;
};
// 比较版本号
var compareVersion = function(version1, version2) {
  const arr1 = version1.split('.').map(num=>num*1);
  const arr2 = version2.split('.').map(num=>num*1);
  let i = 0; let j = 0;
  while(i<arr1.length || j<arr2.length){
    let a = arr1[i] || 0;
    let b = arr2[j] || 0;
    if(a>b){
      return 1;
    }else if(a<b){
      return -1
    }else{
      i++;
      j++;
    }
  }
  return 0;
};
console.info(checkPalindromeFormation("abdef","fecab"))

