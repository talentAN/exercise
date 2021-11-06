// 401. 二进制手表 这狗日的题跟答案一比，老子真是tm深刻的意识到正着来太麻烦就他妈要倒着来！！！
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
    for(let i = 0; i<hours.length-num; i++){
      const ret
    }
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
