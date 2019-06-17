import * as axios from 'axios';
import store from '@/store';
// 这里可根据具体使用的UI组件库进行替换
// import { Toast } from 'vant';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
 /* baseURL 按实际项目来定义 */
 const baseURL = process.env.VUE_APP_URL;
  /* 创建axios实例 */
const service = axios.default.create({
    baseURL,
    timeout: 0, // 请求超时时间
    maxContentLength: 4000,
});
service.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
}, (error: any) => {
    Promise.reject(error);
});

service.interceptors.response.use((response: AxiosResponse) => {
    if (response.status !== 200) {
            // Toast.fail('请求错误！');
    } else {
            return response.data;
    }
},(error: any) => {
    return Promise.reject(error);
});
export default service;
