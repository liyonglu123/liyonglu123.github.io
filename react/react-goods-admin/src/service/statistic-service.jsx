import MUtils from "utils/mm.jsx"
const _mm = new MUtils()
class Statistic {
    // 获取首页数据
    getHomeCount() {
        return _mm.request({
            url: "/manage/statistic/base_count.do",
        });
    }
}
export default Statistic