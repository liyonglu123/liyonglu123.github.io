// axios 自带声明文件
import axios from 'axios';
import config from '@/config';
const { api: { devApiBaseUrl, prodApiBaseUrl } } = config;
const apiBaseUrl = process.env.NODE_ENV === 'production' ? prodApiBaseUrl : devApiBaseUrl;
class HttpRequest {
    constructor(baseUrl = apiBaseUrl) {
        this.baseUrl = baseUrl;
        this.baseUrl = baseUrl;
    }
    request(options) {
        const instance = axios.create();
        options = this.mergeConfig(options); // 合并配置项
        this.interceptors(instance, options.url);
        return instance(options);
    }
    // 拦截器
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use((config) => {
            return config;
        }, error => {
            return Promise.reject(error);
        });
        // 响应拦截
        instance.interceptors.response.use((res) => {
            const { data } = res;
            const { code, msg } = data;
            // 判断服务器返回的状态码
            if (code !== 0) {
                console.error(msg);
            }
            return res;
        }, error => {
            return Promise.reject(error);
        });
    }
    mergeConfig(options) {
        return Object.assign({ baseURL: this.baseUrl }, options);
    }
}
export default HttpRequest;
//# sourceMappingURL=axios.js.map