import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'
// 登录
interface LoginArgs {
  user_name: string
  password: string | number
}
export const loginReq = (data: LoginArgs): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'POST'
  })
}

// 获取用户信息
interface GetUserInfo {
  user_id: string
}
export const getInfoReq = (data: GetUserInfo): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/get_info',
    data,
    method: 'POST'
  })
}
