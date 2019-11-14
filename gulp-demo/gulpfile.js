const { src, dest, watch, series } = require('gulp');
const plugins = require('gulp-load-plugins')();
const uglify = require("gulp-uglify");
const less = require("gulp-less");
let browserSync = require('browser-sync').create(); // 浏览器自动刷新
// js
function js(cb) {
    return src("src/js/*.js")
        .pipe(plugins.uglify())
        .pipe(dest("dist"));
    cb();
}

// css 
function style(cb) {
    return src("src/css/*.less")
        .pipe(less())
        .pipe(dest("dist"));
    cb();
}


// html
function html(cb) {
    return src("src/*.html")
        .pipe(dest("dist"))
    cb();
}

// 图片
function images(cb) {
    cb();
}

// 清楚文件
function cleanDir(cb) {
    return src("./dist")
        .pipe(plugins.clean())
    cb();
}


// 默认任务
function defaultTask(cb) {
    cb();
}
exports.script = js;
exports.style = style;
exports.default = series(
    cleanDir,
    js,
    style,
    html,
    defaultTask
);