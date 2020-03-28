export default (str) => {
    // 保存所有符合条件的IP地址
    let r = []
    // 分四步递归处理ip分段
    let search = (cur, sub) => {
      // 非法输入过滤，LeetCode测试用例(111111111111111111111111111111111111111111111111111111111111)
      if (sub.length > 12) {
        return
      }
      // 边界条件
      if (cur.length === 4 && cur.join('') === str) {
        r.push(cur.join('.'))
      } else {
        // 正常的处理过程
        for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
          tmp = sub.substr(0, i + 1)
          if (tmp - 256 < 0) {
            // 转换下数据类型，如 01为1（LeetCode测试用例）
            search(cur.concat([tmp * 1]), sub.substr(i + 1))
          }
        }
      }
    }
    search([], str)
    return r
  }
  