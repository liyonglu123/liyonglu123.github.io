// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// 预渲染
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  publicPath: BASE_URL, // 公共文件路径
  lintOnSave: true, // 在保存文件的时候对代码进行格式校验
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')) // 配置便捷路径，凡是src这一级路径都可以用@代替
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSpaPlugin({
            staticDir: resolve('dist'),
            routes: ['/', '/chart', '/editor'], // 需要预渲染的路由
            renderer: new Renderer({
              inject: {
                _m: 'prerender'
              },
              // 渲染时显示浏览器窗口，方便调试
              headless: true,
              // 等待触发目标事件后，开始预渲染
              renderAfterDocumentEvent: 'render-event'
            })
          })
        ]
      }
    }
  }
}
