/**
 * Deep Clone
 * - 基础数据类型
 * - 特殊情况
 *  - 循环引用
 * */ 
// 工具函数
const _getType = obj => Object.prototype.toString.call(obj).slice(8, -1);
const typeMap = {
  undefined: 'undefined',
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  // Symbol: 'Symbol',
  null: 'Null',
  function: 'Function',
  arry: 'Array',
  object: 'Object'
}
function deepClone(obj){
  const ret = new Object(null);
  Object.keys(obj).forEach(key=>{
    const val = obj[key];

    if(typeof val === 'object'){
      // 数组
      // Map
      // Set
      // WeakMap
      // WeakSet 
    }else if(typeof val === 'function'){

    }else{
      ret[key] = val;
    }
  })
}