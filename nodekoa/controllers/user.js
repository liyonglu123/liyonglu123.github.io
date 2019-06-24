import { findAllUsers, addUser } from '../dbHelper/index'
exports.users = async(ctx, next) => {
    var obj = await findAllUsers();
    console.log("obj===", obj);
    await ctx.render('user', {
        obj
    })
};