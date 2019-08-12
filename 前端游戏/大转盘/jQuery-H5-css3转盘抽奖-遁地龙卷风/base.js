$(function() 
{
	var $arrow = $("#arrow"),
		$active = $("#active"),
		$dial = $("#dial"),
		rounds = 5*360;	//基础圈数
	$arrow.centerPos();//使元素水平垂直居中、centerPos是自定义函数
	$active.centerPos();
	window.onresize = function()
	{
		$arrow.centerPos();
		$active.centerPos();
	}
	$arrow.click(function()
	{
		if($arrow.data("ding")) return;//如果#arrow正在转动，不向下执行
		$arrow.data("ding", true);//true表示转动，false表示已停止
		var deg = $.random(0,360);//产生一个>=0&&<=360的数
		$arrow.data("deg",deg);
		$dial.css({
			transform:"rotate("+(rounds+deg)+"deg)",
			transition:"3s",
		});
		
	})
	$arrow.hover(function()
	{
		$arrow.click();
	})
	$dial.on("webkitTransitionEnd",function()
	{
		//旋转结束执行
		$arrow.data("ding",false);
		$dial.css({
			transition:"none",//不指定none的话等同于transition:"3s"
			transform:"rotate("+$arrow.data("deg")+"deg)",
			/*
				这么做会从deg(上次)转到5*360+deg(本次)
				如果不这么左第一次转动之后,再次转动会5*360+deg(上次)转到5*360+deg(本次)
				
			*/
		});
		var award = getAward();
		alert(award);
	})
	function getAward()
	{
		
		var deg = $arrow.data("deg")
		/*
			有指针的哪个图片初始方向相对于圆盘往右偏了2度...
		*/
		if ((deg >= 332 && deg <= 360) || (deg > 0 && deg < 32)) 
		{ 
			return "三网通流量 10M";
		}
		else if ((deg >= 32 && deg < 92)) 
		{
			return "话费20元";
		}
		else if (deg >= 92 && deg < 152) 
		{			
			return "ipad mini4";
		}
		else if (deg >= 152 && deg < 212) 
		{
			return "话费5元";
		}
		else if (deg >= 210 && deg < 272) 
		{
			return "三网通流量 30M";
		} 
		else if (deg >= 272 && deg < 332) 
		{
			return "iPhone7";
		}
	}
});
$.random = function(min,max,filter)
{
	
	var i,
		n = Math.floor(Math.random()*(max-min+1)+min);
	if(filter != undefined && filter.constructor == Array)
	{
		for(i=filter.length-1;i>-1;i--)
		{
			if(n == filter[i])
			{
				n = Math.floor(Math.random()*(max-min+1)+min)
				i = filter.length;
			}
		}
	}
	return n;
}
//top、left根据父元素的宽和高计算
$.fn.centerPos = function()
{
	var parent;
	this.each(function(index)
	{
		parent = this.parentNode;
		if(parent == document.body)
		{
			parent = window;
		}
		var position = $(this).css("position");
		if(position == "fixed" || position=="absolute")
		{
			$(this).css("left",parent != window ?(parent.offsetWidth-this.offsetWidth)/2:(parent.innerWidth-this.offsetWidth)/2);
			$(this).css("top",parent != window ?(parent.offsetHeight-this.offsetHeight)/2:(parent.innerHeight-this.offsetHeight)/2);
		}
		else
		{
			window.console.error("没有设置有效的position值");
		}
	})
	return this;
}	
function next(current)
{
	var parent = current.parentNode,
		children = parent.children,
		//childNodes、nextSibling maybe contain ObjectText
		length = children.length;
	for(var i=0;i<length;i++)
	{
		if(current == children[i])
			break;
	}
	//if not lastChild
	if(i<length-1) 
	{
		return children[i+1];
	}
	else
	{
		//recursion search until parent == document.body
		if(parent != document.body)
		{
			return next(parent);
		}
		else
		{
			window.console.warn("Can not get next sibling");
		}
	}
	
}
function getRandomInteger(min,max)
{
	return Math.floor(Math.random()*(max-min+1))+min
}
function imitateMouseEvent(element,type)
{
	var event = document.createEvent("Events");
	event.initEvent(type,true,true);
	element.dispatchEvent(event);
}
showMessage.i = 0;
function showMessage(object)
{
	var body = $("body")[0];
	var $p =$("#debugp");
	
	if($p.length==0)
	{
		$p = $("<p/>").attr("id","debugp");
		$(body).prepend($p);
	}
	$p[0].innerHTML += "<br/>"+(showAttribute.i++)+"   |   "+object;
}
showAttribute.i=0;
function showAttribute(object,filter)
{
	var body = $("body")[0];
	var $p =$("#debugp");
	
	if($p.length==0)
	{
		$p = $("<p/>").attr("id","debugp");
		$(body).prepend($p);
	}
	if(getType(filter).indexOf(DataType.string)!=-1)
	{
		for(var a in object)
		{
			if(a.indexOf(filter)!=-1)
			{
				$p[0].innerHTML += a+"   "+object[a]+"<br/>";
			}
		}
	}
	else if(getType(filter) == DataType.RegExp)
	{
		for(var a in object)
		{
			if(filter.test(a))
			{
				$p[0].innerHTML += a+"   "+object[a]+"<br/>";
			}
		}
	}
	else if(getType(filter) == DataType.UNDEFINED)
	{
		for(var a in object)
		{
			$p[0].innerHTML += a+"   "+object[a]+"<br/>";
		}	
	}
	else
	{
		window.console.error(arguments.callee.toString().match(/^function +(.+)\(/)[1]+"第二个参数应传递字符串或正则表达式");
	}
	$p[0].innerHTML +=showAttribute.i+++"--------------------------------------<br/>"
}
function showCollection(collection)
{
	var body = $("body")[0];
	var $p =$("#debugp");
	
	if($p.length==0)
	{
		$p = $("<p/>").attr("id","debugp");
		$(body).prepend($p);
	}
	for(var i=0;i<collection.length;i++)
	$p[0].innerHTML = collection[i]+"    |"+"<br/>" + $p[0].innerHTML;
}
function showLength(collection)
{
	var body = $("body")[0];
	var $p =$("#debugp");
	
	if($p.length==0)
	{
		$p = $("<p/>").attr("id","debugp");
		$(body).prepend($p);
	}
	$p[0].innerHTML = collection.length+"     |"+"<br/>" + 	$p[0].innerHTML;
}
function DataType()
{
	
}
DataType.RegExp = "RegExp";
DataType.ObjectString = "Objectstring";
DataType.string = "string";
DataType.NULL = "null";
DataType.UNDEFINED = "undefined";
DataType.ObjectNumber = "Objectnumber";
DataType.number = "number";
DataType.ObjectBoolean = "Objectboolean";
DataType.boolean = "boolean";
DataType.function = "function";
DataType.array = "array";
function getType(type)
{
	if(typeof type == DataType.UNDEFINED)
　　{
　　　　return DataType.UNDEFINED;
　　}
　　else if(typeof type == "object")
　　{
　　　　if(type == null)
　　　　{
　　　　　　return DataType.NULL ;
　　　　}
　　　　else
　　　　{
			
　　　　　　if(typeof type.valueOf() == DataType.string)
　　　　　　{
　　　　　　　　return DataType.ObjectString
　　　　　　}
　　　　　　else if(typeof type.valueOf() == DataType.number)
　　　　　　{
　　　　　　　　return DataType.ObjectNumber;
　　　　　　}
　　　　　　else if(typeof type.valueOf() == DataType.boolean)
　　　　　　{
　　　　　　　　return DataType.ObjectBoolean;
　　　　　　}
　　　　　　else if(type instanceof Array)
　　　　　　{
　　　　　　　　return DataType.array;
　　　　　　}
			else if(type instanceof RegExp)
			{
				return DataType.RegExp;
			}
			else if(typeof type.constructor == DataType.function)
			{
				return type.constructor.toString().match(/^function +(.+)\(/)[1];
			}
			
　　　　}
　　}
　　else if(typeof type == DataType.function)
　　{
　　　　return DataType.function

　　}
　　else
　　{
　　　　return typeof type;
　　}
}