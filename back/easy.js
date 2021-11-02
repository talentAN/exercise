// 401. 二进制手表
var readBinaryWatch = function (turnedOn) {
  if (!turnedOn) {
    return ['00:00'];
  }
  const hours = [1, 2, 4, 8];
  const miniutes = [1, 2, 4, 8, 16, 32];
  function _getHour(num) {
    if (num == 0) {
      return [0];
    }
    const ret = [];
    for(let i = 0; i<num; i++){
      const ret
    }
    for (let i = start; i < num; i++) {}
  }
  function _getMinute() {}
  const ret = [];
  // 获得所有可能
  const maxHour = Math.min(4, turnedOn);
  for (let i = 0; i < maxHour; i++) {
    const j = turnedOn - i;
    const [possibleHours, possibleMinutes] = [_getHour(i).map(h=>h>12? h%12 : h), _getMinute(j)];
    if (possibleHours.length && possibleMinutes.length) {
      for (let h of possibleHours) {
        for (let m of possibleMinutes) {
          ret.push(`${h}:${m}`);
        }
      }
    }
  }
  // 处理格式问题
  return ret;
};
