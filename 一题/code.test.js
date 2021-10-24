const cases = require('jest-in-case');
const { deepClone } = require('./code');

const cdds = [{ a: '123' }].map(item => ({
  origin: item,
  result: JSON.stringify(item),
}));
cases(
  'deepClone',
  opts => {
    expect(deepClone(opts.origin)).toEqual(JSON.stringify(opts.result));
  },
  cdds
);
