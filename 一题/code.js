/**
 * Deep Clone
 * - 基础数据类型 √
 * - 特殊数据类型
 *  - 正则
 *  - Symbol为key √
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
  weakMap: 'WeakMap',
  weakSet: 'WeakSet',
  weakRef: 'WeakRef',
  function: 'Function',
  object: 'Object',
};
const _getType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
// 第六题 deepCopy
function deepClone(obj) {
  const type = _getType(obj);
  let ret = undefined;
  let keys = undefined;
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
      keys = obj.keys();
      for (let key of keys) {
        ret[key] = deepClone(obj[key]);
      }
      return ret;
    case typeMap.function:
      const fnStr = obj.toString();
      return obj.prototype ? eval(`${fnStr}`) : eval(fnStr);
    case typeMap.object:
      keys = obj.keys();
      const symbolKeys = obj.getOwnPropertySymbols();
      for (let key of [...keys, ...symbolKeys]) {
        ret[key] = deepClone(obj[key]);
      }
      return ret;
    case typeMap.weakMap:
    case typeMap.weakSet:
    // 不能枚举，复制个屁呀...
    default:
      return undefined;
  }
}
// 第14题，实现一个new
function _new(func, param) {
  const ret = {};
  func.call(ret, param);
  ret.__proto__ = func.prototype;
  return ret;
}
