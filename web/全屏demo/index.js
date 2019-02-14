class fullScreen {
    /**
     * @description: 全屏初始化
     * @param {Function} fn 用户浏览器不支持全屏的回调
     */
    constructor(fn) {
        this.prefixName = ""; // 浏览器前缀
        this.isFullscreenData = true; // 浏览器是否支持全屏
        this.isFullscreen(fn);
    };
    /**
     * @description: 将传进来的元素全屏
     * @param {String} domName 要全屏的dom名称
     */
    Fullscreen(domName) {
        const element = document.querySelector(domName);
        const methodName =
            this.prefixName === "" ?
            "requestFullscreen" :
            `${this.prefixName}RequestFullScreen`;
        console.log('fefe', methodName, element, element[methodName]);
        element[methodName](); // 这是什么写法呢？ 如何进行实现的问题；
    };
    // 退出全屏
    exitFullscreen() {
        const methodName =
            this.prefixName === "" ?
            "exitFullscreen" :
            `${this.prefixName}ExitFullscreen`;
        document[methodName]();
    };
    /**
     * @description: 监听进入/离开全屏
     * @param {Function} enter 进入全屏的回调
     *  @param {Function} quit 离开全屏的回调
     */
    screenChange(enter, quit) {
        if (!this.isFullscreenData) return;
        const methodName = `on${this.prefixName}fullscreenchange`;
        document[methodName] = e => {
            if (this.isElementFullScreen()) {
                enter && enter(e); // 进入全屏回调
            } else {
                quit && quit(e); // 离开全屏的回调
            }
        };
    };
    /**
     * @description: 浏览器无法进入全屏时触发,可能是技术原因，也可能是用户拒绝：比如全屏请求不是在事件处理函数中调用,会在这里拦截到错误
     * @param {Function} enterErrorFn 回调
     */
    screenError(enterErrorFn) {
        const methodName = `on${this.prefixName}fullscreenerror`;
        document[methodName] = e => {
            enterErrorFn && enterErrorFn(e);
        };
    };

    /**
     * @description: 是否支持全屏+判断浏览器前缀
     * @param {Function} fn 不支持全屏的回调函数 这里设了一个默认值
     */
    isFullscreen(fn) {
        let fullscreenEnabled;
        // 判断浏览器前缀
        if (document.fullscreenEnabled) {
            fullscreenEnabled = document.fullscreenEnabled;
        } else if (document.webkitFullscreenEnabled) {
            fullscreenEnabled = document.webkitFullscreenEnabled;
            this.prefixName = "webkit";
        } else if (document.mozFullScreenEnabled) {
            fullscreenEnabled = document.mozFullScreenEnabled;
            this.prefixName = "moz";
        } else if (document.msFullscreenEnabled) {
            fullscreenEnabled = document.msFullscreenEnabled;
            this.prefixName = "ms";
        }
        if (!fullscreenEnabled) {
            this.isFullscreenData = false;
            fn && fn(); // 执行不支持全屏的回调
        }
    };
    /**
     * @description: 检测有没有元素处于全屏状态
     * @return 布尔值
     */
    isElementFullScreen() {
        const fullscreenElement =
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        if (fullscreenElement === null) {
            return false; // 当前没有元素在全屏状态
        } else {
            return true; // 有元素在全屏状态
        }
    }
}
let full = new fullScreen(() => {
    console.log("不支持");
});
full.screenError(e => {
    console.log("进去全屏失败:", e);
});
// 全屏请求必须在事件处理函数中调用，否则将会被拒绝。
// full.Fullscreen(".left"); // 触发进去全屏失败回调
const obj = {
    enter: e => {
        // 如果退出全屏 退出的还是全屏状态，将会触发进入全屏的回调，这种情况比较少 注意一下
        console.log("进入全屏", e);
    },
    quit: e => {
        console.log("退出全屏", e);
        // 通常不会出现嵌套的情况
    }
};
full.screenChange(obj.enter, obj.quit);

function leftScreen() {
    full.Fullscreen(".left");
}

function rightScreen() {
    full.Fullscreen(".right");
}

function redScreen() {
    full.Fullscreen(".left-son");
}
// 退出全屏 退出到上次的状态
function exitScreen() {
    full.exitFullscreen();
}