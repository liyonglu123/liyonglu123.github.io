exports.users = async(ctx, next) => {
    let obj = {
        name: 'muzidigbig',
        sex: '<h2>男</h2>',
        list: [1, 2, 3, 4, 5],
        flg: true
    }
    await ctx.render('user', {
        obj
    })
}