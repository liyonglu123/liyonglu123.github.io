/**
 * Created by zhang on 2019/4/3.
 */
var Prize = (function () {
    //构造函数
    var Prize = function (dom,option) {
        this.dom = dom;
        this.option = $.extend(true,this.option,option);
        init(dom,this.option);
    }
    //构造原型
    Prize.prototype = {
        option:{
            isAuto:true,//是否随机概率
            repeat:{
                isOpen:false,//是否开启可重复中奖
                style:{
                    background:"#5d99ff"
                }
            },
            emptyBlock:{
                title:"空",
                img:"",
            },
            //鼠标悬浮效果
            tooltip:null,
            activeStyle:{
                background:"#5d99ff"
            },
            series:{
                data:[],//{title:"",img:"",ratio:0.1} ratio为概率  img是贴图
                style:{
                    background:"#ff9aa1",
                    "fontSize":"12px",
                    "margin": "1px 1px",
                    "text-align": "center",
                    "float":"left",
                    "border":"1px solid #ffffff"
                }

            },
            prizedList:{}//记录以获奖的id
        },
        beginExe:function (fn) {
            //判断是否执行指定概率的数据
            if(!this.option.isAuto){
                //获取中奖编号
                var arr = initPrizeArray(this.option.series.data);
                var prizeNum = arr[getRandIndex(arr.length)];
            }
            var maxId = option.series.data.length;
            setIntevalFun(50,maxId*Math.random()*6,fn,this.option,this.dom,prizeNum);

        }
    }

    //初始化dom
    function init(dom,option) {
        //合并参数option
        var maxId = option.series.data.length;//设置最大id
        if(maxId==0){
            console.error("the data is empty!!!");
        }
        //获取容器的宽度和高度
        var maxWidth = dom.width();
        var maxHeight = dom.height();
        if(maxHeight==0){
            console.error("can't get dom's width or height!!!");
        }
        //获取填充容器最大块数  根据周长求边长
        var oneLineNum = maxId%4==0?maxId/4+1:Math.floor(maxId/4)+2;
        var maxBlockNum = Math.pow(oneLineNum,2);
        var restBlock = maxBlockNum-Math.pow(oneLineNum-2,2)-maxId;
        for (let i=0;i<restBlock;i++){
            option.series.data.push({title:option.emptyBlock.title,ratio:0,img:option.emptyBlock.img});
        }
        var maxId = option.series.data.length;
        //计算每个块的宽高
        var width = Math.floor(maxWidth/oneLineNum)-2;
        var height = Math.floor(maxHeight/oneLineNum)-2;
        //判断用户是否自定义宽高并且比较两者大小
        option.series.style.width = option.series.style.width||width+"px";
        option.series.style.height = option.series.style.height||height+"px";
        option.series.style["line-height"] = option.series.style["line-height"] || option.series.style.height ;
        dom.empty();
        for (let i=0;i<maxBlockNum;i++){
            var $div = $('<div></div>');
            $div.css(option.series.style);
            var prizeId = i+1;
            var bs = Math.ceil(prizeId/oneLineNum);
            var ys = prizeId%oneLineNum;
            var m = {};
            var tmpId = "";
            if(bs==1||bs==oneLineNum||ys==0){
                if (bs==1){
                    m= option.series.data[prizeId-1];
                    tmpId = prizeId;
                }else if(bs==oneLineNum){
                    m= option.series.data[maxId-bs+2-prizeId+oneLineNum*(bs-1)];
                    tmpId = maxId-bs+2-prizeId+oneLineNum*(bs-1)+1;
                }else{
                    if(ys==0){
                        m = option.series.data[oneLineNum+bs-2];
                        tmpId = oneLineNum+bs-1;
                    }
                }
                $div.attr("id","prize-"+tmpId);
                $div.data("m",m);
                $div.css("background",function () {
                    if(typeof (option.series.style.background)=="function"){
                        return option.series.style.background.call(this,$(this).data("m"));
                    }else{
                        return option.series.style.background;
                    }
                });
                $div.addClass("block");
                $div.html(m.title);
                //鼠标悬浮事件
                if(option.tooltip != null && typeof (option.tooltip)=="function"){
                    $div.hover(function () {
                        option.tooltip.call(this,$(this).data("m"));
                    });
                }
                $div.data("css",$div.attr("style"));
                dom.append($div);
            }else{
                m = option.series.data[maxId-bs+1];
                tmpId = maxId-bs+2;
                $div.attr("id","prize-"+tmpId);
                $div.data("m",m);
                $div.css("background",function () {
                    if(typeof (option.series.style.background)=="function"){
                        return option.series.style.background.call(this,$(this).data("m"));
                    }else{
                        return option.series.style.background;
                    }
                });
                $div.addClass("block");
                $div.html(m.title);
                if(option.tooltip != null && typeof (option.tooltip)=="function"){
                    $div.hover(function () {
                        option.tooltip.call(this,$(this).data("m"));
                    });
                }
                $div.data("css",$div.attr("style"));
                dom.append($div);
                //遍历 oneLineNum-2
                for (let j=0;j<oneLineNum-2;j++){
                    var $div2 = $('<div></div>');
                    $div2.css({width:option.series.style.width,height:option.series.style.height,margin:"1px 1px",float:"left",border:"1px solid #ffffff"});
                    $div2.addClass("block2");
                    dom.append($div2);
                }
                i+=oneLineNum-2;
            }
            
        }
        //初始位置
        dom.find("#prize-"+maxId).addClass("active").css(option.activeStyle).css("background",function () {
            if(typeof (option.activeStyle.background)=="function"){
                return option.activeStyle.background.call(this,$(this).data("m"));
            }else{
                return option.activeStyle.background;
            }
        });
    }

    //执行动画
    function setIntevalFun(time,maxI,fn,option,dom,prizeNum) {
        var beginNum = $(".block.active").attr("id").split("-")[1];
        var maxId = option.series.data.length;
        var i = 0;
        var begin = setInterval(function () {
            beginNum++;
            if(beginNum>maxId){
                beginNum = 1;
            }
            $(dom).find("#prize-"+beginNum).addClass("active").css(option.activeStyle).css("background",function () {
                if(typeof (option.activeStyle.background)=="function"){
                    return option.activeStyle.background.call(this,$(this).data("m"));
                }else{
                    return option.activeStyle.background;
                }
            }).siblings(".block").removeClass("active").each(function () {
                $(this).attr("style",$(this).data("css"));
            });
            i++;
            if (i>=maxI){
                clearInterval(begin);
                if(time==300){
                    setIntevalFun(600,maxId*Math.random(),fn,option,dom,prizeNum)
                }else if(time==50){
                    setIntevalFun(300,maxId*Math.random(),fn,option,dom,prizeNum)
                } else{
                    var id = $(dom).find(".block.active").attr("id");
                    //判断是否是自动随机概率
                    if(option.isAuto){
                        if($(dom).find("#"+id).html()==option.emptyBlock.title){
                            setIntevalFun(1000,1,fn,option,dom,prizeNum);
                        }else{
                            if(typeof(fn)=='function'){
                                //判断是否开启可重复获奖
                                if(!option.repeat.isOpen){
                                    if(option.prizedList[id]==1){
                                        setIntevalFun(1000,1,fn,option,dom,prizeNum);
                                    }else{
                                        option.prizedList[id]=1;
                                        $(dom).find("#"+id).css(option.repeat.style);
                                        var $tmpDom = $('<div></div>');
                                        $tmpDom.attr("style",$(dom).find("#"+id).attr("style"));
                                        $.each(option.activeStyle,function (k,v) {
                                            if(k!='background'){
                                                $tmpDom.css(k,option.repeat.style[k]||option.series.style[k]||"");
                                            }
                                        });
                                        $(dom).find("#"+id).data("css",$tmpDom.attr("style"));
                                        fn.call(this,$(dom).find("#"+id),$(dom).find("#"+id).data("m"));
                                    }
                                }else{
                                    fn.call(this,$(dom).find("#"+id),$(dom).find("#"+id).data("m"));
                                }
                            }
                        }
                    }else{
                        if($(dom).find("#"+id).html()!=prizeNum){
                            setIntevalFun(1000,1,fn,option,dom,prizeNum);
                        }else{
                            if(typeof(fn)=='function'){
                                //判断是否开启可重复获奖
                                if(!option.repeat.isOpen){
                                    if(option.prizedList[id]==1){
                                        setIntevalFun(1000,1,fn,option,dom,prizeNum);
                                    }else{
                                        option.prizedList[id]=1;
                                        $(dom).find("#"+id).css(option.repeat.style);
                                        //使用临时dom存储去除active的样式
                                        var $tmpDom = $('<div></div>');
                                        $tmpDom.attr("style",$(dom).find("#"+id).attr("style"));
                                        $.each(option.activeStyle,function (k,v) {
                                            if(k!='background'){
                                                $tmpDom.css(k,option.repeat.style[k]||option.series.style[k]||"");
                                            }
                                        });
                                        $(dom).find("#"+id).data("css",$tmpDom.attr("style"));
                                        fn.call(this,$(dom).find("#"+id),$(dom).find("#"+id).data("m"));
                                    }
                                }else{
                                    fn.call(this,$(dom).find("#"+id),$(dom).find("#"+id).data("m"));
                                }
                            }
                        }
                    }
                }
            }
        },time);
    }

    function initPrizeArray(list) {
        //设置每个数的中奖概率，不得超过1
        var map = {};
        $.each(list,function (i,v) {
            map[v.title]=v.ratio;
        });
        //生成随机的数组
        var arr = [];
        $.each(map,function (k,v) {
            var i=v*100;
            while (i>0){
                arr.push(k);
                i--;
            }
        });
        return arr;
    }

    function getRandIndex(length) {
        var j = Math.floor(Math.random()*length);
        if(j==length){
            j = length-1;
        }
        return j;
    }

    return function (dom,option) {
        return new Prize(dom,option);
    }
})();

