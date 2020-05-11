import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'
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
