import { getDictList, getDirectorData, getProvincesList, getCitysList, getDistrictsList } from "./service";
import store from '@/common/store'

const DICT_DATA = "DICT_DATA";
const DEPT_DATA = "DEPT_DATA";
const PROVINCES_DATA = "PROVINCES_DATA";
const CITYS_DATA = "CITYS_DATA";
const DISTRICTS_DATA = "DISTRICTS_DATA";

/**
 * 判断是否存在权限
 * @param {*} String 权限alias
 */
export function hasPermission(alias) {
    if (!alias || alias == "") {
        return false
    }
    if (store.getters.permission.includes(alias)) {
        return true
    }
    return false
}
// 保存系统字典数据
export function getData(key) {
    return window.localStorage.getItem(key);
}
export function setData(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
}
export function removeData(key) {
    return window.localStorage.removeItem(key);
}
// 获取部门数据
getDirectorData().then((res) => {
    let data = res.data.data;
    // 存储部门数据到本地
    setData(DEPT_DATA, data);
}).catch((err) => {

});
// 省份
getProvincesList().then((res) => {
    let data = res.data.data;
    setData(PROVINCES_DATA, data);
}).catch((err) => {

});

// 城市
getCitysList().then((res) => {
    let data = res.data.data;
    setData(CITYS_DATA, data);
}).catch((err) => {

});
// 区域
getDistrictsList().then((res) => {
    let data = res.data.data;
    setData(DISTRICTS_DATA, data);
}).catch((err) => {

});
(function getDictData() {
    let dictObj = {};
    getDictList().then((res) => {
        let data = res.data.data;
        data.forEach(item => {
            let k = item["alias"];
            let g = item.items;
            if (!g) {
                g = [];
            }
            dictObj[k] = g;
        });
        // 存储到本地
        setData(DICT_DATA, dictObj);
        // console.log('dictObj', dictObj);
    }).catch((err) => {
        console.log(err)
    });
})()

export const Sys = {
    dict() {
        let d = JSON.parse(getData(DICT_DATA));
        if (arguments.length == 0) {
            return d;
        }
        let name = arguments[0];
        let items = d[name];
        if (arguments.length == 1) {
            return items;
        }
        if (arguments.length > 1) {
            let k = arguments[1];
            for (let i = 0, n = items.length; i < n; i++) {
                let item = items[i];
                if (item["value"] == k) {
                    return item;
                }
            }
        }
        return null;
    },
    // 获取部门数据
    deptData() {
        return (JSON.parse(getData(DEPT_DATA)));
    },
    provinceData() {
        return (JSON.parse(getData(PROVINCES_DATA)));
    },
    cityData() {
        return (JSON.parse(getData(CITYS_DATA)));
    },
    areaData() {
        return (JSON.parse(getData(DISTRICTS_DATA)));
    }
}