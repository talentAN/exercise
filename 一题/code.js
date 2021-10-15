/**
 * Deep Clone
 * - 基础数据类型
 * - 特殊情况
 *  - 循环引用
 * */
// 工具函数
const typeMap = {
  // 基础
  undefined: 'undefined',
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  Symbol: 'Symbol',
  // 对象
  null: 'Null',
  arry: 'Array',
  set: 'Set',
  map: 'Map',
  function: 'Function',
  weakMap: 'WeakMap',
  weakSet: 'WeakSet',
  weakRef: 'WeakRef',
  object: 'Object',
};
const _getType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

function deepClone(obj) {
  const ret = new Object(null);
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    const type = _getType(val);
    switch (type) {
      case typeMap.undefined:
      case typeMap.string:
      case typeMap.number:
      case typeMap.boolean:
        ret[key] = val;
        break;
    }
    // 数组
    // Map
    // Set
    // WeakMap
    // WeakSet
  });
}
