// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    baseUrl: '/',
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                // ws: true,
                // pathRewrite: {
                //   '^/api': ''
                // }
            }
        }
    }
}