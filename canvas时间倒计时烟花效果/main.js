/**
 * 屏幕自适应
 *
 * 1.WIDDOW_WIDTH，WIDTH_HEIGHT：获取屏幕的高度和宽度，这点要把body的height设置为100%才可以
 * 2.MARGIN_LEFT：希望数字部分占整个屏幕的4/5,那么其余部分就占屏幕的1/5，数字左侧的一边就占屏幕的1/10
 * 3.RADIUS
 */



/**
 * 主逻辑的处理
 */
var WIDDOW_WIDTH = 1024;
var WIDTH_HEIGHT = 910;
var RADIUS = 8;
var MARGIN_TOP = 60; //每一个数字距离画布的上边距的距离
var MARGIN_LEFT = 30; //第一个数字距离画布的左边距的距离
//声明结束时间
//这里定义的小时只有两位数，所以最多显示4天的时间，如果更长的话可以扩充为3位数或者4位数
// var endTime = new Date(2016,10,4,23,59,59);
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000); //表示结束时间时当前时间加上一个小时
//声明当前时间距离结束时间的秒数
var curShowEndtimeSeconds = 0;

//声明一个存放小球的数组
var balls = [];
//小球颜色数组
var colors = ['#e83355', '#e95cd0', '#e133ec', '#a033ec', '#7d33ec', '#3c33ec', '#336cec', '#33ecdd', '#33ec70', '#ec6733'];

window.onload = function() {

        WIDDOW_WIDTH = document.body.clientWidth;
        WIDTH_HEIGHT = document.body.clientHeight;

        MARGIN_LEFT = Math.round(WIDDOW_WIDTH / 10);
        /**
         * WIDDOW_WIDTH * 4 / 5：表示整个时钟区域占屏幕的4/5
         * WIDDOW_WIDTH * 4 / 5 / 108：之前计算出来的最后一个数字的开始绘制距离为MARGIN_LEFT + 93 * (RADIUS+1)，
         *                              而一个数字占用的是15 * (RADIUS + 1),则到最后一列的小球距离就是MARGIN_LEFT + 108 * (RADIUS+1)
         *                              这里就需要除以108，而之前是给每一个小球加了个1，这里需要减去1
         */
        RADIUS = Math.round(WIDDOW_WIDTH * 4 / 5 / 108) - 1;
        MARGIN_TOP = WIDTH_HEIGHT / 7;

        var canvas = document.getElementById('canvas');
        canvas.width = WIDDOW_WIDTH;
        canvas.height = WIDTH_HEIGHT;
        var context = canvas.getContext('2d');
        curShowEndtimeSeconds = getCurShowEndTimeSeconds();
        setInterval(function() {
            render(context);
            update();
        }, 50);
    }
    /**
     * 获取当前时间到结束时间的秒数
     */
function getCurShowEndTimeSeconds() {
    var curTime = new Date();
    //getTime()获取当前时间到1970年的毫秒数
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000); //求整
    return ret >= 0 ? ret : 0;
}
/**
 * 更新时间
 * 
 * 1.在下一次显示的时间和当前显示的时间做比较，如果不相等时，就需要改变
 *
 * 2.在每一次更新时间时，需要判断小时，分钟，秒每一位上面的数字是否改变，如果改变，就要进行叠加彩色小球的操作
 */
function update() {
    var nextShowTimeSeconds = getCurShowEndTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600),
        nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60),
        nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowEndtimeSeconds / 3600),
        curMinutes = parseInt((curShowEndtimeSeconds - curHours * 3600) / 60),
        curSeconds = curShowEndtimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(nextHours / 10) != parseInt(curHours / 10)) { //小时的十位数变化
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10));
        }
        if (nextHours % 10 != curHours % 10) { //小时的个位数变化
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, nextHours % 10);
        }


        if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
        if (nextMinutes % 10 != curMinutes % 10) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, nextMinutes % 10);
        }


        if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        if (nextSeconds % 10 != curSeconds % 10) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, nextSeconds % 10);
        }

        curShowEndtimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
    console.log(balls.length);
}
/**
 * 小球运动
 */
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        //添加碰撞检测
        if (balls[i].y　 >= WIDTH_HEIGHT - balls[i].r) {
            balls[i].y = WIDTH_HEIGHT - balls[i].r;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    /**
     * 这里进行小球数量的删除
     */
    var count = 0; //保存当前存在在画布上的小球数量
    for (var i = 0; i < balls.length; i++) {
        /**
         * @param  {[type]} balls[i].x +  RADIUS > 0  [小球的右边缘大于0]
         * @param {[type]} balls[i].x - RADIUS < WIDDOW_WIDTH  [小球的左边缘小于画布的宽度]
         */
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WIDDOW_WIDTH) {
            balls[count++] = balls[i]; //执行完这步操作之后，前count个元素都是存在在画布上面的小球，count后面的数据就是应该删除的小球
        }
    }
    //删除不在画布上的小球
    /**
     * 为保证一定的运算速率，避免计算机因性能低而计算失误，那么最多只保留300个小球，
     * 因为count的值有可能比300大很多，所以取最小值
     * Math.min(300,count)
     */
    while (balls.length > Math.min(300, count)) {
        balls.pop();
    }
}
/**
 * [addBalls 添加彩色小球]
 * 类似于小球的绘制
 * @param {[type]} x   [当前数字的起始位置x]
 * @param {[type]} y   [当前数字的起始位置y]
 * @param {[type]} num [当前数字在数组中的索引]
 */
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                //定义小球的参数
                var ball = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    r: RADIUS,
                    g: 1.5 + Math.random(),
                    /**
                     * Math.random() * 1000：0-1000的随机数
                     * Math.ceil(Math.random() * 1000)：取整
                     * Math.pow( -1 , Math.ceil(Math.random() * 1000)):-1的多少次方，即是1还是-1
                     */
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.ceil(Math.random() * colors.length)]
                }
                balls.push(ball);

            }
        }
    }
}
/**
 * [render 分别绘制数字]
 * @param  {[type]} cxt [description]
 */
function render(cxt) {
    /**
     * 在进行更新时间之前，如果不清空当前的画布内容
     * 那么后绘制的数字就会叠加在之前的数字上面，所以，这里需要刷新整个画布，也就是清空
     */
    cxt.clearRect(0, 0, WIDDOW_WIDTH, WIDTH_HEIGHT);

    var hours = parseInt(curShowEndtimeSeconds / 3600),
        minutes = parseInt((curShowEndtimeSeconds - hours * 3600) / 60),
        seconds = curShowEndtimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, hours % 10, cxt);
    //冒号
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, minutes % 10, cxt);

    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, seconds % 10, cxt);

    //绘制新生成的彩色小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
        cxt.closePath();

        cxt.fill();
    }
}
/**
 * [renderDigit 具体的绘制函数]
 * @param  {[type]} x   [当前数字绘制的起始坐标x]
 * @param  {[type]} y   [当前数字绘制的起始坐标y]
 * @param  {[type]} num [在digit.js中的数组中的索引值，注意冒号是10]
 * @param  {[type]} cxt [description]
 */
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = '#058';

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }

        }
    }
}