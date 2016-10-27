/**
 * Created by JYL on 2014/6/25.
 */
//获取键盘事件
$(document).keydown(function(event){
    //keydown事件的形参,通过event.keyCode获取对应的键盘值
    switch (event.keyCode){
        case 74://J
            if(board[3][0] == 1 && score==0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][0] == 1 && score>0 && score<50){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                //说明敲击是错误的
                isgameover();
            }
            break;
        case 75://K
            if(board[3][1] == 1 && score==0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][1] == 1 && score>0 && score<50){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                //说明敲击是错误的
                isgameover();
            }
            break;
        case 76://L
            if(board[3][2] == 1 && score==0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][2] == 1 && score>0 && score<50){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                //说明敲击是错误的
                isgameover();
            }
            break;
    }
});

function timeRun(){
    timerun += 0.001;
    $("span").text(timerun.toString().substr(0,5));
    //setTimeout(指定调用的函数,毫秒数)和clearTimeout()
    t = setTimeout("timeRun()",1);
}

function clearText(){
    $("#block-3-0").text("");
    $("#block-3-1").text("");
    $("#block-3-2").text("");
}

function moveDown(){
    //遍历12个黑块,倒序遍历
    for(var i=3;i>=0;i--){
        for(var j=2;j>=0;j--){
            if(board[i][j] == 1){
                if(i==3){
                    //将当前的黑块的颜色改变成白色
                    $("#block-"+i+"-"+j).css("background-color","#fff");
                    board[i][j] = 0;
                }else{
                    //将当前的黑块的颜色改变成白色
                    $("#block-"+i+"-"+j).css("background-color","#fff");
                    board[i][j] = 0;
                    //将当前的黑块下一行同一列的黑块颜色改变成黑色
                    $("#block-"+(i+1)+"-"+j).css("background-color","#000");
                    board[i+1][j] = 1;
                }
            }
        }
    }
    //第一行重新随机一个黑块的位置
    var randy = parseInt(Math.floor(Math.random() * 3));
    var block = $("#block-0-"+randy);
    block.css("background-color","#000");
    board[0][randy] = 1;

    score += 1;
}

//用于游戏结束部分
function isgameover(){
    //停止游戏的计时器
    clearTimeout(t);
    //游戏结束的提示
    $("#box_container").append("<div id='gameover' class='gameover'><p>本次用时</p><span>" + timerun.toString().substr(0,5) + "秒</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "300px");
    gameover.css("height", "400px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}

//重新开始新的游戏
function restartgame(){
    //去掉游戏结束提示的内容
    $("#gameover").remove();
    //将游戏的计时器重新归0
    $("#time_box").html("<span>0.000</span>"+"秒");
    //将上一次游戏的黑块部分清除
    $(".block").remove();
    //将统计游戏键盘敲击次数归0
    score = 0;
    //重新初始化游戏
    init();
}