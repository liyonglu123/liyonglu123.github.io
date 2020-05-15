export interface ResponseData {
  code: number
  msg: string
  data?: unknown
}
// axios 自带声明文件
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from 'axios'
import config from '@/config'
const {
  api: { devApiBaseUrl, prodApiBaseUrl }
} = config
const apiBaseUrl =
  process.env.NODE_ENV === 'production' ? prodApiBaseUrl : devApiBaseUrl
class HttpRequest {
  constructor(public baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create()
    options = this.mergeConfig(options) // 合并配置项
    this.interceptors(instance, options.url)
    return instance(options)
  }
  // 拦截器
  private interceptors(instance: AxiosInstance, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res
        const { code, msg } = data
        // 判断服务器返回的状态码
        if (code !== 0) {
          console.error(msg)
        }
        return res
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({ baseURL: this.baseUrl }, options)
  }
}
export default HttpRequest
