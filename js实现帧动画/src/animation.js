'use strict';
var loadImage = require("./imageloader");
// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 结束状态
var STATE_STOP = 2;
// 同步任务
var TASK_SYNC = 0;
// 异步任务
var TASK_ASYNC = 1;
/**
 * 帧动画库类
 */
function Animation() {
    this.taskQuene = [];
    this.index = 0;
    this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务,去预加载图片
 * imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
    var taskFn = function (next) {
        loadImage(imglist.slice(), next); 
    };
    var type = TASK_SYNC;
    return this._add(taskFn, type);

}

/** 
 * 添加一个异步任务去定时改变图片背景位置,实现帧动画
 * ele dom对象
 * positions 背景位置数组
 * imageUrl 图片地址
*/
Animation.prototype.changePosition = function (ele, positions, imageUrl) {

}
/** 
 * 添加一个异步任务 通过改变image的src 实现帧动画
 * ele dom对象
 * imglist 图片数组
*/
Animation.prototype.changeSrc =function(ele, imglist) {

}
/** 
 * 高级用法  添加一个异步定时执行任务
 * 该任务自定义动画每帧执行的任务函数
 * taskFn 任务
*/
Animation.prototype.enterFrame = function(taskFn) {

}
/**
 * 上一个任务完成之后执行回调函数
 * callback 回调函数
 */
Animation.prototype.then = function(callback) {

}
/** 
 * 开始执行任务 异步定义任务执行的间隔
 * interval 时间间隔
*/
Animation.prototype.start = function(interval) {
    if(this.state === STATE_START) {
        return this;
    }
    // 没有任务则返回
    if (!this.taskQuene.length) {
        return this;
    }
    this.state = STATE_START;
    this.interval = interval;
    this._runTask();
    return this;
}
/** 
 * 添加一个同步任务  回退到上一个任务中
 * 实现重复上一个任务的效果 可以定义重复的次数
 * times 重复的次数
*/
Animation.prototype.repeat = function(times) {

}

/**
 * 添加一个同步任务, 相当于repeate()更友好的接口,无限循环上一个任务
 */
Animation.prototype.repeatForever = function(times) {

}
/** 
 * 设置当前任务执行完毕到下一个任务开始执行的等待时间
 * time 等待时间
*/
Animation.prototype.wait = function(time) {

}

/** 
 * 暂停当前异步执行任务
*/
Animation.prototype.pause = function() {

}

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function() {
    
}
/**
 * 释放资源
 */
Animation.prototype.dispose = function() {
    
}

/**
 * 添加一个任务到队列
 * taskFn 任务方法
 * type 任务类型
 */
Animation.prototype._add = function(taskFn, type) {
    this.taskQuene.push({
        taskFn: taskFn,
        type: taskFn
    });
    return this;
}
/**
 * 执行任务
 */
Animation.prototype._runTask = function() {
   if (!this.taskQuene || this.state !== STATE_START) {
        return;
   }
   // 任务执行完毕
   if(this.index === this.taskQuene.length) {
    this.dispose();
    return
   }
   // 执行任务链上的当前任务
   var task = this.taskQuene[this.index];
   if (task.type === TASK_SYNC) {
       this._syncTask(task);
   }else {
        this._asyncTask(task);
   }
}
/**
 * 同步任务
 */
Animation.prototype._syncTask = function(task) {
   var me = this;
   var next = function () {
       // 切换到下一个任务
    me._next();
   }
   var taskFn = task.taskFn();
   taskFn(next);
 }
/** 
 * 异步任务
 * task 执行任务的对象
*/
 Animation.prototype._asyncTask = function(task) {
   
}

 /**
  * 切换到下一个任务
  */
Animation.prototype._next = function() {
    this.index++;
    this._runTask();
}
 





