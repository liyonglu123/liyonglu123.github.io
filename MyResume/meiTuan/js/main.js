//广告切换
$(function(){
	$('.picbut>li').on('mouseover',function(){
		$index = $(this).index();
		$('.picbut>li').eq($index).css('background','#23E883').siblings().css('background','#fff')
		$('.pic_content>img').eq($index).fadeIn().siblings().fadeOut()
	})
	$('.close').on('click',function(){
		$('.advertisement').css('display','none');
	})

//轮播1
	var i = 1;
	function turn(name,show){
		i++		
		$(name).animate({'left':-100*i+'%'},function(){
			if(i==4){
				i=1;				
				$(name).css({'left':-100*i+'%'});
			}
			$(show).html(i+"/3");
		})	
	}
	
	$('#but2').on('click',function(){	
		if ($('.all_pic').is(':animated')) {
                    return;
                }		
		turn('.all_pic','.show_num');		
	})
	$('#but1').on('click',function(){	
		if ($('.all_pic').is(':animated')) {
                    return;
                }		
		i--	
		$('.all_pic').animate({'left':-100*i+'%'},function(){
			if(i==0){
				i=3;
				$('.all_pic').css({'left':-100*i+'%'})
			}
			$('.show_num').html(i+"/3");
		})		
	})
	
	function dingshiqi(name,show){
		var t = setInterval(function(){ 
		turn(name,show); 
		
		}, 3000); 

		$(".visible").hover(function(){
					clearInterval(t)
				},function(){
					 t = setInterval(function(){ 
					turn(name,show); 
					}, 3000); 				
					})
	}
	dingshiqi('.all_pic','.show_num')
//轮播2
	var j =1;
	$('#but4').on('click',function(){	
		if ($('.all_Panic_pic').is(':animated')) {
                    return;
                }		
		j++		
		$('.all_Panic_pic').animate({'left':-100*j+'%'},function(){
			if(j==4){
				j=1;				
				$('.all_Panic_pic').css({'left':-100*j+'%'});
			}
			$('.show_num_1').html(j+"/3");
		})			
	})
	$('#but3').on('click',function(){	
		if ($('.all_Panic_pic').is(':animated')) {
                    return;
                }		
		j--	
		$('.all_Panic_pic').animate({'left':-100*j+'%'},function(){
			if(j==0){
				j=3;
				$('.all_Panic_pic').css({'left':-100*j+'%'})
			}
			$('.show_num_1').html(j+"/3");
		})		
	})
	


//倒计时
	function gettime(){
		var time = new Date;
		
		hour = time.getHours();
		min = time.getMinutes();
		sec = time.getSeconds();
		
		if(hour<10){hour = '0'+hour}
		if(min<10){min = '0'+min}
		if(sec<10){sec = '0'+sec}
		
		var hour1 = hour.toString().split('')[0]
		var hour2 = hour.toString().split('')[1]
		var min1 = min.toString().split('')[0]
		var min2 = min.toString().split('')[1]
		var sec1 = sec.toString().split('')[0]
		var sec2 = sec.toString().split('')[1]
		
		$('.second_name>i').eq(1).html(hour1)
		$('.second_name>i').eq(2).html(hour2)
		$('.second_name>i').eq(3).html(min1)
		$('.second_name>i').eq(4).html(min2)
		$('.second_name>i').eq(5).html(sec1)
		$('.second_name>i').eq(6).html(sec2)
	}
	setInterval(gettime,1000);
//右侧固定栏
//回到顶部
	$(".toolbar_1").on('click',function(){
		$('body,html').animate({scrollTop: 0}, 500);			
	});
})
//滚动到指定距离回到顶部才出现
	$(function(){ 
		$(window).scroll(function(){
			 if($(document).scrollTop()>500){
			 	$('.toolbar_1').css({'display':'block'})
			 	$('.toolbar').css({'height':'200px'})
			 }else{
			 	$('.toolbar_1').css({'display':'none'})
			 	$('.toolbar').css({'height':'150px'})
			 }	

		})
	}) 
//滚动到指定距离不再固定
$(function(){ 	
	var_offsetTop = $(".foot").offset().top; 
	
	$(window).scroll( function(){
		
	 
	  if($(document).scrollTop()>var_offsetTop-$(window).height()+250){
            $(".toolbar").css({
                'position':'absolute',
                'top':var_offsetTop})
        }else{
        	 $(".toolbar").css({
                'position':'fixed',
                'top':400})
        	 
        }
    });  
 	window.onload = function(){
    	$(window).trigger('scroll');
    };
     $(window).resize(function(){
    	$(window).trigger('scroll');
    });
}) 

// 滚动到指定距离左侧固定
$(function(){ 
	var offsetTop ='';
	for (var i=0;i<4;i++) {
			offsetTop += $(".dingwei").eq(i).offset().top-50+","; 
		}
		var strs = offsetTop.split(",")
	offsetTop_1 = parseInt(strs[0]) ;	
	offsetTop_2 = parseInt(strs[1]) ;
	offsetTop_3 = parseInt(strs[2]) ;
	offsetTop_4 = parseInt(strs[3]) ;
	
	$(window).scroll( function(){	   
	    if($(document).scrollTop()>offsetTop_1){
            $(".toolbar_left").css({              
                'top':0})
        }else{
        	var settop = 1178-$(document).scrollTop();
        	 $(".toolbar_left").css({
               'top':settop});
        	
        }
	    function color(){
	    	if($(document).scrollTop()<offsetTop_2){
	    	  	$(".toolbar_left_1").css({'background':'#31F3D2'}).siblings().css({'background':'#fff'})
	    	  }
		    if($(document).scrollTop()>=offsetTop_2 && $(document).scrollTop()<offsetTop_3){
		    	$(".toolbar_left_2").css({'background':'#31F3D2'}).siblings().css({'background':'#fff'})
		    }
		    if($(document).scrollTop()>=offsetTop_3 && $(document).scrollTop()<offsetTop_4){
		    	$(".toolbar_left_3").css({'background':'#31F3D2'}).siblings().css({'background':'#fff'})
			}
		    if($(document).scrollTop()>=offsetTop_4){
		    	$(".toolbar_left_4").css({'background':'#31F3D2'}).siblings().css({'background':'#fff'})
			}		
		}
		color()
	//移入变色
		$('.toolbar_left>div').hover(
			function(){
				$(this).css({"background":"#31F3D2"});
			},
			function(){
				color();
			}
		)
	}); 
	//点击滚动
	function setscroll(name,top){
		$(name).on("click",function(){
			$('body,html').animate({scrollTop: top}, 500);		
		})
	}
	setscroll(".toolbar_left_1",offsetTop_1)
	setscroll(".toolbar_left_2",offsetTop_2)
	setscroll(".toolbar_left_3",offsetTop_3)
	setscroll(".toolbar_left_4",offsetTop_4)
	

}) 







