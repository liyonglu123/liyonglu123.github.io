const { src, dest, watch, series } = require('gulp');
const plugins = require('gulp-load-plugins')();
const uglify = require("gulp-uglify");
const less = require("gulp-less");
let browserSync = require('browser-sync').create(); // 浏览器自动刷新
const del  = require('del');
// js
function js(cb) {
    src("src/js/*.js")
        .pipe(plugins.uglify())
        .pipe(dest("dist"))
    cb();
    browserSync.reload();
}

// css 
function style(cb) {
    src("src/css/*.less")
        .pipe(less())
        .pipe(dest("dist"))
    cb();
    browserSync.reload();
    
}


// html
function html(cb) {
    src("src/*.html")
        .pipe(dest("dist"))
    cb();
    browserSync.reload();

}

// 图片
function images(cb) {
    cb();
}

// 清楚文件
function cleanDir(cb) {
    del("./dist");
    cb();
}

// 监听文件变化
function watchDir(cb) {
    watch("src/js/*.js", js);
    watch("src/css/*.less", style);
    watch("src/*.html", html);
    cb();
}
// 浏览器自动刷新
function serve(cb) {
    browserSync.init({
        baseDir: "src"
    });
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
    watchDir,
    serve,
    defaultTask
);