//换页动画的切换效果
$(function(){
	$('#dowebok').fullpage({
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#69AFE9','#999'],
		'navigation': true,
		navigationTooltips:['个人简介','关于我','专业技能','工作经历','我的作品','联系我'],
		 navigationColor:'#F6124E',

		'afterLoad': function(anchorLink, index){
					pageall();
					if (index==1){
						page2();
					}
					if (index==2) {
						$('#slidedown1').slideDown(200,function(){
							$('#slidedown2').slideDown(200,function(){
								$('#slidedown3').slideDown(200,function(){
									$('#slidedown4').slideDown(200);
								});
							});
						});
					}
					if(index==3){
					$("#photo1").velocity({'translateX': '400px','opacity': 1},{duration: 500,delay: 1000});
					$("#photo2").velocity({'translateX': '400px','opacity': 1},{duration: 500,delay: 750});
					$("#photo3").velocity({'translateX': '400px','opacity': 1},{duration: 500,delay: 500});
					$("#photo4").velocity({'translateX': '400px','opacity': 1},{duration: 500,delay: 250});
					}
					if(index==5){

						$(".demo1").velocity({'translateX': '0px','opacity': 1},{duration: 500,delay: 00});
						$(".demo2").velocity({'translateY': '0px','opacity': 1},{duration: 500,delay: 500});
						$(".demo3").velocity({'translateX': '0px','opacity': 1},{duration: 500,delay: 1000});
						$(".demo4").velocity({'translateY': '0px','opacity': 1},{duration: 500,delay: 1500});
					}
					if(index==6){
						$(".pic6").velocity({'translateX': '0px'},{duration: 800,easing: "swing"});
						$(".pic7").velocity({'translateX': '0px'},{duration: 800,easing: "swing",delay: 500});
					}
	     },
		'onLeave':function(index,nextIndex,direction){
					$(".border1").velocity({'width':'0px'},10);
					$("h1").velocity({'translateY': '0px','opacity': 0},{duration: 00,delay: 0});
					$("h2").velocity({'translateY': '0px','opacity': 0},{duration: 00,delay: 0});
					$("h3").velocity({'translateY': '0px','opacity': 0},{duration: 00,delay: 0});
					if (index==1){
						$(".picture").velocity({'translateY': '200px','opacity': 0},200);
					}
					if (index==2) {
						$('.slideup').slideUp(100);
					}
					if(index==3){
						page3();
					}
					if(index==5){
						page5();
					}
					if(index==6){
						page6();
					}
		}
	});
	var pageall = function(){
				$("h1").velocity({'translateY': '-20px','opacity': 1},{duration: 1000,delay: 0});
				$("h2").velocity({'translateY': '-20px','opacity': 1},{duration: 1000,delay: 1000});
				$("h3").velocity({'translateY': '-20px','opacity': 1},{duration: 1000,delay: 1500});
				$(".border1").velocity({'width':'100px'},{duration: 1000,delay: 1000});
				};

    var page2 = function(){
    				$(".picture").velocity({'translateY': '-30px','opacity': 1},{duration: 1000});
    			};
    var page3 = function(){
   					$(".pho").children().velocity({'translateX': '-400px','opacity': 0},{duration: 200});
    			};
    var page5 = function(){
					$(".demo1").velocity({'translateX': '-200px','opacity': 0},1000);
					$(".demo2").velocity({'translateY': '-200px','opacity': 0},1000);
					$(".demo3").velocity({'translateX': '200px','opacity': 0},1000);
					$(".demo4").velocity({'translateY': '200px','opacity': 0},1000);
				}
	var page6 = function(){
					$(".contact").children().velocity({'translateX': '1000px'},{duration: 500,easing: "swing"});
				};
	pageall();
	page2();
	page3();
    page5();
	page6();
});
// 头像切换
	$("#pic1").hover(function(){
		$(this).fadeTo(800,0);
		},function(){
			$(this).stop(true,false).fadeTo(800,1);
	});
//专业技能点击切换
$(function(){
	$(".side-front").click(function(){
		$(this).hide(300);
	})
	$(".side-back").click(function(){
		$(this).siblings().show(300);
	})
})
//轮播图
$(function(){
	$('.but2').click(function(){
		var wid = parseInt($(".experience1").css('width').match(/\d+/g));
		var num = parseInt($(".experience").css('left').match(/\d+/g));
		 if((num+10)>wid){
		 	$(".experience_visible").stop().animate({left:-10+'%'},300,function(){
		 		$(".experience_visible").stop().animate({left:-0+'%'},300);
		 	});
		 }else{
			$(".experience").stop().animate({left:-100+'%'});
		 }
	})
	$('.but1').click(function(){
		var wid = parseInt($(".experience1").css('width').match(/\d+/g))
		var num = parseInt($(".experience").css('left').match(/\d+/g))
		if((num+10)<wid){
			$(".experience_visible").stop().animate({left:10+'%'},300,function(){
		 		$(".experience_visible").stop().animate({left:0+'%'},300);
		 	});
		}else{
			$(".experience").stop().animate({left:0});
		}
	})
})


//弹出层
function openNew(f){
	//获取页面的高度和宽度
	var sWidth=document.body.scrollWidth;
	var sHeight=document.body.scrollHeight;

	//获取页面的可视区域高度和宽度
	var wHeight=document.documentElement.clientHeight;

	var oMask=document.createElement("div");
		oMask.id="mask";
		oMask.style.height=sHeight+"px";
		oMask.style.width=sWidth+"px";
		document.body.appendChild(oMask);
	var oLogin=document.createElement("div");
		oLogin.id="login";
		oLogin.innerHTML="<div class='loginCon'><div id='wenzi'></div><div id='close'>点击关闭</div></div>";
		document.body.appendChild(oLogin);

	//获取登陆框的宽和高
	var dHeight=oLogin.offsetHeight;
	var dWidth=oLogin.offsetWidth;
		//设置登陆框的left和top
		oLogin.style.left=sWidth/2-dWidth/2+"px";
		oLogin.style.top=wHeight/2-dHeight/2+"px";
	//点击关闭按钮
	var oClose=document.getElementById("close");

		//点击登陆框以外的区域也可以关闭登陆框
		oClose.onclick=oMask.onclick=function(){
					document.body.removeChild(oLogin);
					document.body.removeChild(oMask);
					};
	var shuzu = ["精通CSS。","JavaScript DOM编程艺术。","JavaScript高级程序设计。",
					"JavaScript语言精粹。","锋利的jQuery（第2版）"]
	var tupian = ["url(img/25.jpg)","url(img/26.jpg)",
					"url(img/27.jpg)","url(img/28.jpg)","url(img/29.jpg)"]

	var b=document.getElementById("wenzi")
	b.innerHTML=shuzu[(f-3)/2];
	var c =document.getElementsByClassName("loginCon")[0]
	c.style.backgroundImage= tupian[(f-3)/2];
};

	window.onload=function(){

			var oBtn=document.getElementsByClassName("study")[0].childNodes;
				//闭包实现点击各个书单按钮

				for(var i=3;i<oBtn.length-2;i+=2){
					(function(a) {
						oBtn[a].onclick=function(){
							 openNew(a);
							}
					})(i);
				}
		}
