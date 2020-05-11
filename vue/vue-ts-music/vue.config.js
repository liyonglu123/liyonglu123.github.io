// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  publicPath: BASE_URL, // 公共文件路径
  lintOnSave: true, // 在保存文件的时候对代码进行格式校验
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')) // 配置便捷路径，凡是src这一级路径都可以用@代替
  }
}
