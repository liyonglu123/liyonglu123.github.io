import request from "@/utils/request";
// 下面式方法
export function getUserName(params) {
    return request({
        url: '/userName',
        params
    })
} 