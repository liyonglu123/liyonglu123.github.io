// axios的请求拦截器
import axios from "axios"
// 创建axios的实例
var service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000,
    // headers: {'X-Custom-Header': 'foobar'} // 这里可以自定义header
})

// requeset Interceptors 拦截器  
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 可以在这里进行相关的配置哦
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default service