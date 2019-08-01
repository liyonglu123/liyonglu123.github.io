//var basepath = "https://www.*****.cn/cjq/gua";
//转盘抽奖  /cjqh5/act/bigTurntable/doPrize.action   loginName
//中奖用户 /cjqh5/act/bigTurntable/getPrizeWall.action
//兑奖记录/cjqh5/act/bigTurntable/getPrizeRecord.action   loginName
// 倒计时
var interval = 1000;
//IMTools.addFloatDiv(1);
/*仿网络请求*/
var returnJSON = "";
var returnListJSON = "";
/*post抽奖需要的参数*/
var URL = "http://hd.adsmar.com:6868/";
var postURL = URL+"prize";
/*post请求奖品列表*/
// var postGiftURL = "http://192.168.31.152:8080/getPrizeList";
var postGiftURL = URL+"getPrizeList";
/*浮窗跳转链接*/
var floatURL= "http://hd.adsmar.com/gameCenter";//URL + "changeGame";
var posttid = "1";
//指纹id需要从网站获取
var fingerid;
//超级返现规则
$("#gz-b").on('click', function() {
	$(".zz").show();
	$(".cjfx").show();
});
$(".cjgz-c").on('click', function() {
	// $("li").remove();
	$(".zz").hide();
	$(".cjfx").hide();
});
//大转盘规则
$("#look-gz").on('click', function() {
	$(".zz").show();
	$(".zpgz").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zpgz").hide();
});
//中奖纪录
$("#zjjl").on('click', function() {
    // alert(fingerID());
    /*POST网络请求*/
    $.post(postGiftURL, {
    	"tid":posttid,
    	"fid":fingerid,
    	/*2018-05-25 added by roy chang*/
    	"opid":HD_WXTool.opid
    },function (data,status) {
        // alert("Data:"+data.code);
        returnListJSON = data;
        console.log(returnListJSON);
        if(parseInt(returnListJSON.code)==200){
            var x;
            var listArray = returnListJSON.body;
            for(x in listArray){
            	var url = listArray[x].clk_url;
            	// console.log(url);
                title = "<li class='li-text'><span class='float-left'>"+timestampToTime(listArray[x].time)+"</span><a href="+url+"><span class='float-left'>"+listArray[x].title+"</span>"+"</li>";
                $("ul").append(title)
            }
		}else {
        	alert('服务器开小差了，请稍后再试');
		}

    });

	$(".zz").show();
	$(".zj").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zj").hide();
	$(".li-text").remove();
});
//无次数弹框
$(".cjgz-c").on('click', function() {
	$(".wcs").hide();
	$(".zz").hide();
});

//获取参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return 0;
}

var login = getQueryString("login");
var loginName = getQueryString("loginName");
var isapp = getQueryString("isapp");
var memberId = getQueryString("memberId");


//是否在APP&是否登录 
if (isapp == 1) {
	if (login == 1) {
		$("#tzbtn").attr("href", "cjq:terminal");
	} else {
		$("#tzbtn").attr('href', 'cjq:login');
	}
} else {
	$("#share").hide();
	//$("#tzbtn").attr("href", "https://*****.html");
}

function Marquee1() {
	//当滚动至colee1与colee2交界时
	if (colee2.offsetTop - colee.scrollTop <= 0) {
		colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
	} else {
		colee.scrollTop++
	}
}
// var MyMar1 = setInterval(Marquee1, speedi) //设置定时器
	// 右边
var coleer2 = document.getElementById("coleer2");
var coleer1 = document.getElementById("coleer1");
var coleer = document.getElementById("coleer");
// coleer2.innerHTML = coleer1.innerHTML; //克隆colee1为colee2
function Marqueer1() {
	//当滚动至colee1与colee2交界时
	if (coleer2.offsetTop - coleer.scrollTop <= 0) {
		coleer.scrollTop -= coleer1.offsetHeight; //colee跳到最顶端
	} else {
		coleer.scrollTop++
	}
}
//时间戳转换成时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = ('0'+date.getDate()).slice(-2) + ' ';
    h = ('0'+date.getHours()).slice(-2) + ':';
    m = ('0'+date.getMinutes()).slice(-2)+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
    // s = date.getSeconds();
    return M+D+h+m;
}

//获取指纹Fid
function getFingerID() {
    var fingerprint = new Fingerprint2({excludeJsFonts:true});
    fingerprint.get(function (result,components) {
        fingerid = result;
        console.log("fingerid:"+fingerid);
    })
}

//抽奖代码
$(function() {
    var mid = getQueryString("mid");
    var cid = getQueryString("cid");
	var $btn = $('.g-lottery-img'); // 旋转的div
	getFingerID();//获取指纹id
	//初始次数，由后台传入
	var cishu = sessionStorage.getItem('cishu')?sessionStorage.getItem('cishu'):$('#cishu').html();
	$('#cishu').html(cishu); //显示还剩下多少次抽奖机会
	var isture = 0; //是否正在抽奖
	var clickfunc = function() {
		/*此处准备写一个post请求用于请求广告返回的数据*/
		// var data = [1, 2, 3, 4, 5, 6, 7, 8, ]; //抽奖
		//data为随机出来的结果，根据概率后的结果
		// data = data[Math.floor(Math.random() * data.length)]; //1~8的随机数
		//parseInt(returnJSON.body.title)
		var i = parseInt(returnJSON.body.isPrize)?2:0;
		console.log(i);
		switch (i) {
            case 0:
                rotateFunc(0, 250, '谢谢参与');
                break;
			case 1:
				rotateFunc(1, 25, '蹦心手环');
				break;
			case 2:
				rotateFunc(2, 70, '众橙奖券');
				break;
			case 3:
				rotateFunc(3, 115, '1元现金红包');
				break;
			case 4:
				rotateFunc(4, 160, '财金币20枚');
				break;
			case 5:
				rotateFunc(5, 203, '20元现金红包');
				break;
			case 6:
				rotateFunc(6, 340, '双季丰0.5%加息红包');
				break;
			case 7:
				rotateFunc(7, 290, '双季丰满减红包50元');
				break;

		}
	}
    /*点击浮窗*/
    $(".change_game_flash_panel").on('click', function() {
        var  fuchuangURL =  floatURL + "?tid=" + posttid + "&mid=" + mid + "&cid=" + cid + "&fid=" + fingerid;
        console.log(fuchuangURL);
        window.location.href = fuchuangURL;
    });
	/*点击抽奖按钮跳转*/
	$(".zhizhen").click(function() {
        $(".zz").hide();
        if (isture) return; // 如果在执行就退出
        isture = true; // 标志为 在执行
        if (cishu <= 0) { //当抽奖次数为0的时候执行
            $(".zz").show();
            $(".wcs").show();
            $(".ok-img").on('click', function () {
                $(".wcs").hide();
                $(".zz").hide();
            });
            // alert("没有次数了");
            $('#cishu').html(0); //次数显示为0
            isture = false;
        } else { //还有次数就执行
            $.post(postURL, {
                "tid": posttid,
                "fid": fingerid,
				"mid": mid,
				"cid": cid,
				/*2018-05-25 roy chang*/
				"opid":HD_WXTool.opid
            }, function (data) {
                returnJSON = data;
                // console.log(JSON.stringify(data));
                if (parseInt(returnJSON.code) == 200) {
                    cishu = cishu - 1; //执行转盘了则次数减1
                    if (cishu <= 0) {
                        cishu = 0;
                    }
                    console.log(sessionStorage.getItem('cishu'));
                    sessionStorage.setItem("cishu", cishu);
                    $('#cishu').html(cishu);
                    clickfunc();
                } else {
                    alert("服务器开小差去了");
                }

            });
        }
    });


	var rotateFunc = function(awards, angle, text) {
		isture = true;
		//获取转盘转动效果
		$btn.stopRotate();
		$btn.rotate({
			angle: 0, //旋转的角度数
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
			callback: function() {
                console.log("awards:"+awards);
				if(awards == 0){
					return;
				}
				isture = false; // 标志为 执行完毕
				// alert(text);
				$(".texts").html(returnJSON.body.ctTitle);
					// console.log(text)
				$(".zz").show();
				var lipin = "<a href='" + returnJSON.body.ctTargetUrl + "'><img src="+returnJSON.body.ctImgUrl+" class='lipin-img'></a>";
				$(".img_class").html(lipin);
				$(".jl-tk").show();;
				$(".cjgz-c").on('click', function() {
					$(".lipin-img").remove();
					$(".zz").hide();
					$(".jl-tk").hide();
				});
				$(".ok-img").on('click', function() {
					//点击OK的时候跳转
					$(".zz").hide();
					$(".jl-tk").hide();
					console.log(returnJSON.body.ctTargetUrl);
                    window.location.href = returnJSON.body.ctTargetUrl;
				});

			}
		});
	};
});