/**
 * Created by JYL on 2014/6/25.
 */
//board表示12个黑块:值为0的话表示不是黑块,值为1的话表示是黑块
var board = new Array();
var timerun = 0.000;
var score = 0;
var t;
$(function(){
    //完成游戏的初始化工作
    init();
});

function init(){
    for(var i=0;i<4;i++){
        board[i] = new Array();
        for(var j=0;j<3;j++){
            //完成12个白块的布局工作
            var grid = $("#grid-"+i+"-"+j);
            grid.css("top",getPosTop(i,j));
            grid.css("left",getPosLeft(i,j));
            //完成12个黑块的布局工作
            $("#box_container").append($("<div class='block' id='block-"+i+"-"+j+"'></div>"));
            var block = $("#block-"+i+"-"+j);
            block.css("top",getPosTop(i,j));
            block.css("left",getPosLeft(i,j));
            //将12个黑块的值默认为0
            board[i][j] = 0;
        }
    }
    //每一行随机生成一个黑块
    for(var i=0;i<4;i++){
        //生成随机的列
        var randy = parseInt(Math.floor(Math.random() * 3));
        //当前黑块同一列的上一行黑块值为1的话,也是黑块
        if(i>0&&board[i-1][randy] == 1){
            randy = parseInt(Math.floor(Math.random() * 3));
        }
        //获取到随机生成的黑块的位置
        var block = $("#block-"+i+"-"+randy);
        block.css("background-color","#000");
        board[i][randy] = 1;
    }
    //初始化游戏开始的提示内容
    $("#block-3-0").text("按J开始");
    $("#block-3-1").text("按K开始");
    $("#block-3-2").text("按L开始");
}

function getPosTop(i,j){
    return i*100;
}

function getPosLeft(i,j){
    return j*100;
}
