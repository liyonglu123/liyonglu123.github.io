/*
 定义一个user的Schema
*/
var mongoose = require('../db');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String }, // 用户名
    password: { type: String }, // 密码
    age: { type: Number }, // 年龄
});

/* model 是由schema生成的模型，具有对数据库操作的能力 */

module.exports = mongoose.model('User', UserSchema);