(function() {
    var isRatate = false; //是否正在抽奖
    // 奖品配置
    var awards = [
            {'index': 0, 'text': '耳机' , 'name': 'icono-headphone'},
            {'index': 1, 'text': 'iPhone' , 'name': 'icono-iphone'},
            {'index': 2, 'text': '相机' , 'name': 'icono-camera'},
            {'index': 3, 'text': '咖啡杯' , 'name': 'icono-cup'},
            {'index': 4, 'text': '日历', 'name': 'icono-calendar'},
            {'index': 5, 'text': '键盘', 'name': 'icono-keyboard'},
            {'index': 6, 'text': '66', 'name': 'icono-keyboard'},
            {'index': 7, 'text': '视频', 'name': 'icono-keyboard'}
        ],
        len = awards.length,
        turnNum = 360 / len;  // 文字旋转 turn 值
 
    var gbWheel = $('#gbWheel'),
        content = $('.gb-wheel-content'),
        lineList = $('ul.gb-wheel-line'),
        itemList = $('.gb-wheel-list'),
        btn = $('#gbLottery'),
        lineListHtml = [],
        itemListHtml = [];
 
    var transform = preTransform();
 
    awards.forEach(function(v, i, a) {
        // 分隔线
        lineListHtml.push('<li class="gb-wheel-litem" style="' + transform + ': rotate('+ (i * turnNum + turnNum / 2) +'deg)"></li>');
        
        // 奖项
        itemListHtml.push('<div class="gb-wheel-item" style="' + transform + ': rotate('+ (i * turnNum) +'deg)">');
        itemListHtml.push('<div class="gb-wheel-icontent"');
        itemListHtml.push('<p class="gb-wheel-iicon">');
        itemListHtml.push('<span class="'+v.name+'">666</span>');
        itemListHtml.push('</p>');
        itemListHtml.push('<p class="gb-wheel-itext">');
        itemListHtml.push(v.text);
        itemListHtml.push('</p>');
        itemListHtml.push('</div>');
        itemListHtml.push('</div>');
    });           
 
    lineList.html(lineListHtml.join(''));
    itemList.html(itemListHtml.join(''));
    var clickfunc = function() {
		/*此处准备写一个post请求用于请求广告返回的数据*/
		// var data = [1, 2, 3, 4, 5, 6, 7, 8, ]; //抽奖
		//data为随机出来的结果，根据概率后的结果
		// data = data[Math.floor(Math.random() * data.length)]; //1~8的随机数
		//parseInt(returnJSON.body.title)
		var i = 0;
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
    btn.click(function() {
        if (isRatate) return; // 如果在执行就退出
        isRatate = true;
        // 1. 次数用完毕弹出完毕弹框
        // 2. 还有次数发送请求 并且获取奖品
        clickfunc();

    });
    var rotateFunc = function(awards, angle, text) {
		isRatate = true;
		//获取转盘转动效果
		content.stopRotate();
		content.rotate({
			angle: 0, //旋转的角度数
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
			callback: function() {
                alert(text);
                isRatate = false;
			}
		});
	};
    // transform兼容
    function preTransform() {
        var cssPrefix,
        vendors = {
          '': '',
          Webkit: 'webkit',
          Moz: '',
          O: 'o',
          ms: 'ms'
        },
        testEle = document.createElement('p'),
        cssSupport = {};

        Object.keys(vendors).some(function(vendor) {
            if (testEle.style[vendor + (vendor ? 'T' : 't') + 'ransform'] !== undefined) {
              cssPrefix = vendor ? '-' + vendor.toLowerCase() + '-' : '';
              return true;
            }
        });
 
      function normalizeCss(name) {
        name = name.toLowerCase();
        return cssPrefix ? cssPrefix + name : name;
      }
 
      cssSupport = {
        transform: normalizeCss('Transform'),
      }
 
      return cssSupport.transform;
    }
}());