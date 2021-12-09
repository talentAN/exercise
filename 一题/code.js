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
  regExp: 'RegExp',
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
      break;
  }
}
// 第14题，实现一个new
function _new(func, param) {
  const ret = {};
  func.call(ret, param);
  ret.__proto__ = func.prototype;
  return ret;
}
const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
// 实现一个LazyMan
class LazyMan {
  constructor(name) {
    this.name = '';
    this.queue = [];
    this.init(name);
  }
  init(name) {
    this.name = name;
    console.info('this is ', name);
    const that = this;
    setTimeout(() => {
      that.next();
    }, 0);
    return this;
  }
  next() {
    if (this.queue.length) {
      const fn = this.queue.shift();
      fn();
    }
  }
  eat(food) {
    this.queue.push(() => {
      console.info(this.name, ' eat ', food);
      this.next();
    });
    return this;
  }
  sleep(time) {
    const that = this;
    this.queue.push(() => {
      setTimeout(() => that.next.call(that), time * 1000);
    });
    return this;
  }
}
new LazyMan('Tony').eat('lunch').sleep(2).eat('dinner');

// 第 81 题：打印出 1 - 10000 之间的所有对称数
const symmetry = num => {
  const cdds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (num === 1) {
    return cdds;
  }
  if (num % 2 === 0) {
  } else {
    for (let i = 0; i <= 9; i++) {
      const len = (num - 1) / 2;
      const max = '9'.repeat(len) * 1;
      for (let j = 1; j <= max; j++) {
        const str = j + '';
        ret.push(str + i + str.reverse());
      }
    }
  }
  if (num === 2) {
    return [11, 22, 33, 44, 55, 66, 77, 88, 99];
  }
  const ret = [];
};
// 实现一个curry化add
function add() {
  const args = [...arguments];
  if (args.length) {
    return function(){
      const _args = [...arguments];
      if(_args.length === 0){
        
      }
      if()
      return add(...args, ...arguments);
    }
  } else {
    return args.reduce((acc, cur)=>acc+cur, 0);
  }
}
module.exports = {
  deepClone,
};
