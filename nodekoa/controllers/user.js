import { findAllUsers, addUser } from '../dbHelper/index'
exports.users = async(ctx, next) => {
    var obj = await findAllUsers();
    ctx.body = {
        code: 200,
        data: obj
    }
    // console.log("obj===", obj);
    // await ctx.render('user', {
    //     obj
    // })
};