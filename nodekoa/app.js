const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const views = require('koa-views');
const render = require('koa-art-template');
const path = require('path');
// const router = require("koa-router")();

app.use(bodyParser()); //解析request的body
// const Router = require("koa-router");
// const router = new Router({
//     prefix: '/api' // 加上前缀
// });
//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
});
import router from './routes'
//配置模板引擎中间件  --第三方中间件
// ejs模版引擎
//app.use(views('views', { map: {html: 'ejs' }}));   //这样配置也可以  注意如果这样配置的话 模板的后缀名是.html
// app.use(views('views', {
//     extension: 'ejs' /*应用ejs模板引擎*/
// }));
app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());
// app.use(async ctx => {
//     ctx.body = "hello world!!!";
// });
app.listen(3000);
console.log('app started at port 3000...');