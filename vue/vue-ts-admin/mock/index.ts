import Mock from 'mockjs'

type MsgType = string | number

const success = (msg: MsgType = '', data?: any) => {
  // 这里定义一个成功返回的统一方法，返回我们在axios封装时指定的三个字段
  return {
    code: 0,
    msg,
    data
  }
}

const error = (code: number, msg: MsgType = '', data?: any) => {
  // 再定义一个返回错误状态的方法，一个必传参数是code，即错误码
  return {
    code,
    msg,
    data
  }
}
interface PostResInterface {
  body: string
  type: 'POST'
  url: string
}
Mock.mock(/\/api\/user\/login/, loginRes)
function loginRes(req: PostResInterface) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { user_name, password } = JSON.parse(req.body)
  // eslint-disable-next-line @typescript-eslint/camelcase
  if (user_name === 'zhangsan' && String(password) === '123') {
    return success('登录成功', { user_id: 100 })
  } else {
    return error(1001, '用户名或密码错误')
  }
}
// 返回用户信息
Mock.mock(/\/api\/user\/get_info/, getInfoRes)
function getInfoRes(req: PostResInterface) {
  return success('获取用户信息成功', {
    user_name: 'Lison',
    avatar: '',
    email: 'xxx@xx.com'
  })
}
