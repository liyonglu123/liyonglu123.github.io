// 获取本地存储的数据字典
import { Sys } from "@/common/utils/sys"
let commStatusFilter = (value, key, keyword) => {
        let valArr = Sys.dict(key);
        let val;
        if (valArr) {
            valArr.forEach(item => {
                if (keyword) {
                    if (item[keyword] == value) {
                        val = item.title;
                        return
                    }
                } else {
                    if (item.value == value) {
                        val = item.title;
                        return
                    }
                }
            });
        }
        return val
    }
    // 贷款数量
let loanAmountFilter = value => {
        return (value / 10000);
    }
    // 贷款类型
let loanCategoryFilter = (value, key) => {
        let valArr = Sys.dict(key);
        let val;
        valArr.forEach(item => {
            if (item.id == value) {
                val = item.title;
                return
            }
        });
        return val
    }
    // 部门缩写
let deptNameFilter = value => {
        if (!value) {
            return ""
        }
        let arr = value.split('/')
        let returnString = ""
        if (arr.length <= 3) {
            returnString = arr.join('/')
        } else {
            returnString = arr.slice(-3).join('/')
        }
        return returnString
    }
    // 实现千分位逗号的分割
let numFormatThousandFilter = num => {
    var c;
    if (num) {
        c = (num.toString().indexOf('.') !== -1) ? Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : num.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
    } else {
        c = num;
    }
    return c;
}
export { commStatusFilter, loanAmountFilter, loanCategoryFilter, deptNameFilter, numFormatThousandFilter }