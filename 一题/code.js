/**
 * Deep Clone
 * - 基础数据类型 √
 * - 特殊数据类型
 *  - 正则
 *  - Symbol为key
 * - 循环引用
 * */
// 工具函数
const typeMap = {
  // 基础
  undefined: 'undefined',
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  symbol: 'Symbol',
  // 对象
  null: 'Null',
  array: 'Array',
  set: 'Set',
  map: 'Map',
  function: 'Function',
  weakMap: 'WeakMap',
  weakSet: 'WeakSet',
  weakRef: 'WeakRef',
  regExp: 'RegExp',
  object: 'Object',
};
const _getType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

function deepClone(obj) {
  const type = _getType(obj);
  let ret = undefined;
  switch (type) {
    case typeMap.undefined:
    case typeMap.string:
    case typeMap.number:
    case typeMap.boolean:
    case typeMap.symbol:
    case typeMap.null:
      return obj;
    case typeMap.array:
      ret = new Array(obj.length);
      obj.forEach((item, i) => {
        ret[i] = deepClone(item);
      });
      return ret;
    case typeMap.set:
      ret = new Set();
      for (let item of obj) {
        ret.add(deepClone(item));
      }
      return ret;
    case typeMap.map:
      break;

    case typeMap.function:
      break;

    case typeMap.weakMap:
      break;

    case typeMap.weakSet:
      break;

    case typeMap.object:
    default:
      break;
  }
}

module.exports = {
  deepClone,
};
