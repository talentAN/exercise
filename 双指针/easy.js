/**
 *  双支
 */


// 辅助方法和数据
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
const two = new ListNode(2);
const one = new ListNode(1,two);

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function sort(a,b){
return a>b?1:-1
}

// 回文
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
// 回文(忽略特殊字符)
var isPalindrome = function(s) {
if(!s){
   return true;
}
s = s.toLocaleLowerCase();
let i = 0; let j= s.length-1;let reg = /^[a-zA-Z0-9]$/
while(i<j){
  if(!reg.test(s[i])){
      i++;
      continue;
  }
  if(!reg.test(s[j])){
      j--;
      continue;
  }
  if(s[i] !== s[j]){
    return false
  }else{
    i++; 
    j--;
  }
}
return true;
};
// 减1回文
var validPalindrome = function(s) {
if(s.length<3){
 return true;
}
let i = 0; let j= s.length-1;
while(i<j && s[i] === s[j]){
 i++; 
 j--;
}
if(i>=j){
 return true;
}else{
 return valid(s.slice(i,j)) || valid(s.slice(i+1,j+1))
}

};
// 链表最早公共节点
var getIntersectionNode = function(headA, headB) {
 const map = new Map();

 while(headA || headB){
   if(headA){
     if(map.get(headA)){
       return headA;
     }else{
       map.set(headA,true)
       headA = headA.next;
     }
   }
   if(headB){
     if(map.get(headB)){
       return headB;
     }else{
       map.set(headB,true)
       headB = headB.next;
     }
   }
 }
 return null
};
// 回文链表
var isPalindrome = function(head) {
// 找到中间节点；
let fast = head;
let slow = head;
let pre = null
while(fast && fast.next){
 let _pre = pre;
 let _slow = slow;
 fast = fast.next.next;
 slow = slow.next;
 pre = _slow;
 pre.next = _pre;
}
// 对比(偶数个node)
if(!fast){
 while(slow && pre){
   if(slow.val === pre.val){
     slow = slow.next;
     pre = pre.next;
   }else{
     return false
   }
 }
 return true
}
// 对比(奇数个node)
if(!fast.next){
 slow = slow.next;
 while(slow && pre){
   if(slow.val === pre.val){
     slow = slow.next;
     pre = pre.next;
   }else{
     return false
   }
 }
}
return true;
};
// 二叉搜索树中两个节点之和
var findTarget = function(root, k) {
const nodes = [root];
const map = {};
while(nodes.length){
 const node = nodes.shift();
 if(map[node.val]){
   return true;
 }else{
   map[k-node.val] = true;
   if(node.left){
     nodes.push(node.left)
   }
   if(node.right){
     nodes.push(node.right)
   }
 }
}
return false
};
// 删除有序数组中的重复项
var removeDuplicates = function(nums) {
if(nums.length<2){
   return nums;
}
let i = 0; let j=1; 
while(i<nums.length-1){
   if(nums[i] === nums[j]){
       nums.splice(j,1)
   }else{
       i++;
       j++;
   }
}
return j;
};
// 移除元素
var removeElement = function(nums, val) {
if(nums.length ===0 ){
   return 0;
}
let slow = 0; let fast = 0;
while(fast<nums.length){
 if(nums[fast] === val){
   fast++;
   }else{
     nums[slow] = nums[fast];
     slow++;
     fast++
   }
}
return slow
};
// 实现 strStr()
var strStr = function(haystack, needle) {
if(!needle){
 return 0;
}
let k = 0; let i = 0; let j = 0;
let hasFound = false;
while(!hasFound && k<=haystack.length-needle.length){
 if(haystack[i] === needle[j]){
   if(j === needle.length-1){
     hasFound = true;
   }else{
     i++;
     j++;  
   }
 }else{
   k++;
   i = k; 
   j = 0;
 }
}
return hasFound ? k: -1
};
// 合并有序数组
var merge = function(nums1, m, nums2, n) {
let i = 0;
let j = 0;
while(i<m+j-1 && j < n-1){
   if(nums1[i]>=nums2[j]){
     nums1.splice(i, 0, nums2[j]);
     i++
     j++
   }
   i++
}
// 检查剩余
if(j<n-1){
 for(let k = j; k<n; k++){
   nums1[m+k] = nums2[k];
 }
}
nums1.length = m+n;
return nums1;
};
// 环形链表
var hasCycle = function(head) {
if(!head || !head.next){
   return false
}
let fast = head.next;  
let slow = head;

while(fast && fast.next){
 if(fast === slow){
   return true;
 }else{
   fast = fast.next.next;
   slow = slow.next;
 }
}
return false
};
// 快乐数
var isHappy = function(n) {
const map = {};
while(n){
 if(n===1){
   return true;
 }else if(map[n]){
   return false;
 }else{
   map[n] = true;
   let s = n.toString();
   let ret = 0;
   for(let i=0; i<s.length;i++){
     let num = s[i] * 1;
     ret+= num*num;
   }
   n = ret;
 }
}
return true;
};
// 移动零
var moveZeroes = function(nums) {
if(nums.length<2){
 return nums;
}
let slow=0; 
let fast= 1; 
let len = nums.length;
while(fast<len){
 if(nums[slow]===0){
   while(nums[fast] === 0 && fast<len){
     fast++;
   }
   if(nums[fast]){
     [nums[fast],nums[slow]]=[nums[slow],nums[fast]];
   }
 }
 slow++;
 fast++;
}
return nums
};
// 反转字符串
var reverseString = function(s) {
let i = 0, j = s.length-1;
while(i<j){
 [s[i], s[j]] = [s[j], s[i]];
 i++;
 j--;
}
return s;
};
// 反转字符串中的元音字母
var reverseVowels = function(s) {
let cdds = ['a', 'e', 'i', 'o', 'u'];
let arr = s.split('')
let i = 0, j = arr.length-1;
while(i<j){
 if(cdds.indexOf(arr[i])===-1){
   i++;
   continue;
 }
 if(cdds.indexOf(arr[j])===-1){
   j--;
   continue;
 }
 [arr[i], arr[j]] = [arr[j], arr[i]];
 i++;
 j--;
}
return arr.join('');

};
// 两个数组的交集
var intersection = function(nums1, nums2) {
nums1.sort(sort);
nums2.sort(sort);
let i = 0;
let j = 0;
const map = {};
while(i<nums1.length && j<nums2.length){
 if(nums1[i]>nums2[j]){
   j++
 }else if(nums1[i]<nums2[j]){
   i++;
 }else if(nums1[i]===nums2[j]){
   map[nums1[i]] = true;
   i++;
   j++;
 }else{
   i++;
   j++;
 }
}
return Object.keys(map).map(m=>m*1);
};
// 两个数组的交集 II
var intersect = function(nums1, nums2) {
nums1.sort(sort);
nums2.sort(sort);

let i = 0;
let j = 0;
const arr = [];
while(i<nums1.length || j<nums2.length){
 if(nums1[i]>nums2[j]){
   j++
 }else if(nums1[i]<nums2[j]){
   i++;
 }else{
   arr.push(nums1[i])
   i++;
   j++;
 }
}
return arr;


};
// 判断子序列
var isSubsequence = function(s, t) {
if(s.length>t.length){
   return false
};
let i = 0; let j=0;
while(j<t.length && i<s.length){
   if(s[i] === t[j]){
       i++;
       j++;
   }else{
       j++;
   }
}
return i === s.length
};
//  和为s的连续正数序列
var findContinuousSequence = function(target) {
if(target < 3 ){
 return [];
}
const ret = [];
let i = 1; let j = 2; let end = Math.round(target/2);
while(j<=end){
 if(i===j){
   j++;
   continue;
 }
 let sum = (i+j)*(j-i+1)/2;
 if(sum>target){
   i++;
 }else if(sum < target){
   j++;
 }else{
   let temp = []
   for(let k = i; k<=j;k++){
     temp.push(k);
   }
   ret.push(temp);
   i+=2;
   j++;
 }
}
return ret;
};
// 剑指 Offer 57. 和为s的两个数字
var twoSum = function(nums, target) {
let i= 0; let j = nums.length-1;
while(i<j){
 if(nums[i]+nums[j]>target){
   j--;
 }else if(nums[i]+nums[j]<target){
   i++
 }else{
   return [nums[i], nums[j]]
 }
}
};
// 剑指 Offer 22. 链表中倒数第k个节点
var getKthFromEnd = function(head, k) {
let arr = [];
while(head){
 arr.push(head);
 head = head.next;
}
return arr[arr.length-k]
};
// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
var exchange = function(nums) {
let i = 0; let j = nums.length-1;
while(i<j){
 if(nums[i]%2!==0){
   i++;
   continue;
 }
 if(nums[j]%2===0){
   j--;
   continue;
 }
 [nums[i], nums[j]] =[nums[j], nums[i]];
 i++;
 j--
}
return nums
};
// 剑指 Offer 06. 从尾到头打印链表
var reversePrint = function(head) {
let ret = [];
while(head){
 ret.unshift(head.val);
 head = head.next;
}
return ret;
};
//  字符串压缩
var compressString = function(S) {
const len = S.length;
if(len<2){
 return S;
}
let i = 0; let j= 1; ret = ''
while(j<len+1){
 if(S[i]===S[j]){
   j++
 }else{
   ret= ret +S[i]+(j-i);
   i=j; 
   j++;
 }
}
// console.info('zzz', ret)
return ret.length>=len ? S:ret;
};
// 反转单词前缀
var reversePrefix = function(word, ch) {
let point = word.indexOf(ch);
if(point === -1){
 return word;
}
let ret = ''
for(let i = point; i>=0; i--){
 ret+=word[i];
}
return ret + word.slice(point+1, word.length)
};
// 交替合并字符串
var mergeAlternately = function(word1, word2) {
let ret = ''
let [i, j, len1, len2] = [0, 0, word1.length, word2.length];
while(i<len1 && j<len2){
 ret = ret + word1[i] + word2[j];
 i++; j++;
}
let max = Math.max(i,j)
return ret+ word1.slice(max, len1) + word2.slice(max, len2)
};
// 两个数组间的距离值
var findTheDistanceValue = function(arr1, arr2, d) {
let ret = 0;
for(let val of arr1){
 let valid = true;
 for(let _val of arr2){
   if(Math.abs(_val - val)<=d){
     valid = false;
     break;
   }
 }
 if(valid){
   ret++
 }
}
return ret;
};
// 检查整数及其两倍数是否存在
var checkIfExist = function(arr) {
let map = {};
for(let val of arr){
 if(map[val]){
   return true;
 }else{
   map[val*2] = true;
   map[val/2] = true;
 }
}
return false
};
// 删除回文子序列
var removePalindromeSub = function(s) {
let i = 0; let j = s.length-1;
while(i<j){
 if(s[i]!==s[j]){
   return 2;
 }else{
   i++;
   j--;
 }
}
return 1;
};
// 复写0
var duplicateZeros = function(arr) {
let len = arr.length;
for(let i = 0; i<arr.length; i++ ){
 if(arr[i] === 0){
   arr.splice(i, 0, 0);
   i++
   len++;
 }
}
arr.length = len;
return arr;
};
// 反转字符串 II
var reverseStr = function(s, k) {
let ret = ''
for(let i = 0; i<s.length; i+=2*k){
 let str = s.slice(i, i+2*k);
 if(!str){
   break;
 }
 const len = str.length;
 if(len>k){
   let temp = str.slice(0,k).split('').reverse().join('')+str.slice(k, len);
   ret+=temp
 }else{
   ret+=str.slice(0,k).split('').reverse().join('')
 }
}
return ret;
};
// 反转字符串中的单词 III
var reverseWords = function(s) {
return s.split(' ').map(str=> str.split('').reverse().join('')).join(' ')
};
// 计数二进制子串
var countBinarySubstrings = function(s) {
if(s.length<2){
 return 0;
}
const arr = [];
for(let i=0; i<s.length;){
 let j = i+1;
 let num = 1;
 while(s[j]===s[i]){
   j++;
   num++;
 }
 arr.push(num);
 i=j;
}
let ret = 0;
for(let i = 0; i<arr.length-1; i++){
 ret+=Math.min(arr[i], arr[i+1])
}
return ret;
};
// 字符的最短距离
var shortestToChar = function(s, c) {
let point = null; // 上一个节点
const cdds = []; // 没处理完的点
const ret = new Array(s.length-1);
for(let i = 0; i < s.length; i++){
 if(s[i] === c){
   ret[i] = 0;
   point = i;
   cdds.forEach(k=>{
     ret[k] = Math.min(ret[k], i-k)
   })
 }else{
   ret[i] = point === null ? s.length : i-point;
   cdds.push(i);
 }
}
return ret;
};
// 翻转图像
var flipAndInvertImage = function(image) {
return image.map(img=>{
 let i =0; j = img.length-1;
 while(i<j){
   [img[i], img[j]] = [img[j], img[i]];
   img[i] = img[i] === 0 ? 1: 0;
   img[j] = img[j] === 0 ? 1: 0;
   i++;
   j--;
 }
 if(i===j){
   img[i] = img[i] === 0 ? 1: 0;
 }
 return img;
})
};
//比较含退格的字符串
var deleteCode  = function(s){
const len = s.length-1;
let i = len;
let num = 0;
let ret = ''
while(i>=0){
 if(s[i] === '#'){
   num++;
 }else{
   if(num){
     num--
   }else{
     ret+=s[i]
   }
 }
 i--
}
return ret
}
var backspaceCompare = function(s, t) {
return deleteCode(s) === deleteCode(t);
};
//  链表的中间结点
var middleNode = function(head) {
let slow = head;
let fast = head;
while(fast && fast.next){
 slow = slow.next;
 fast = fast.next.next;
}
return slow
};
// 按奇偶排序数组
var sortArrayByParity = function(nums) {
let left = 0;
let right = nums.length-1;
while(left<right){
 if(nums[left]%2===0){
   left++;
   continue;
 }
 if(nums[right]%2!==0){
   right--;
   continue;
 }
 [nums[left], nums[right]] = [nums[right], nums[left]];
 left++;
 right--;
}
return nums
};
//仅仅反转字母
var reverseOnlyLetters = function(s) {
const arr = s.split('')
let reg = /^[A-Za-z]$/
let i = 0, j = arr.length-1;
while(i<j){
 if(!reg.test(s[i])){
   i++;
   continue;
 }
 if(!reg.test(s[j])){
   j--;
   continue;
 }
 [arr[i], arr[j]] = [arr[j], arr[i]];
 i++;
 j--;
}
return arr.join('');
};
//按奇偶排序数组 II
var sortArrayByParityII = function(nums) {
let i = 0;
while(i<nums.length){
 if(i%2===0 && nums[i]%2!==0){
   let j = i+1;
   while(nums[j]%2!==0){
     j++;
   }
   [nums[i], nums[j]] = [nums[j], nums[i]];
   i++;
   continue;
 }
 if(i%2!==0 && nums[i]%2===0){
   let j = i+1;
   while(nums[j]%2===0){
     j++;
   }
   [nums[i], nums[j]] = [nums[j], nums[i]];
   i++;
   continue;
 }
 i++
}
return nums;
};
//长按键入
var isLongPressedName = function(name, typed) {
if(typed.length<name.length){
 return false;
}
let i = 0; let j = 0;
while(i<name.length && j<typed.length){
 if(name[i] === typed[j]){
   i++;
   j++;
 }else if(typed[j] === typed[j-1]){
   j++;
 }else{
   return false;
 }
}
if(i!==name.length){
 return false;
}
while(j<typed.length){
 if(typed[j-1]!==typed[j]){
   return false
 }
 j++;
}
return true;
};
// 增减字符串匹配
var diStringMatch = function(s) {
const ret = [];
let max = s.length;
let min = 0;
for(let i=0; i<s.length; i++) {
 if(s[i]==='I'){
   ret.push(min);
   min++
 }else{
   ret.push(max);
   max--;
 }
}
ret.push(min)
return ret;
};
//有序数组的平方
var sortedSquares = function(nums) {
const arr = [];
let i = 0; let j = nums.length-1;
while(i<j){
 if(Math.abs(nums[i])>=Math.abs(nums[j])){
   arr.unshift(nums[i]*nums[i])
   i++;
 }else{
   arr.unshift(nums[j]*nums[j])
   j--;
 }
}
if(i === j){
 arr.unshift(nums[i]*nums[i])
}
return arr
};
console.log(diStringMatch('IDID'))
