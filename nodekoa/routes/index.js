const Router = require("koa-router");
const User = require('../controllers/user')
const router = new Router({
    // prefix: '/api' // 加上前缀
});
// router.get('/', async(ctx, next) => {

// });
router.get('/', User.users);
router.get('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})
export default router