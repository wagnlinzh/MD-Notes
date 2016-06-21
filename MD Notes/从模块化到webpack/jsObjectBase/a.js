var person={
 name:"wanglinzhizhi",
 age:29,
 job:"Front to end",

 sayName:function(){
   console.log(this.name);
 }
}



var person2={};
Object.defineProperty(person2,"name",{
  writable: false,
  value: "linzhizhi.wang"
});

console.log(person2.name);
person.name="wanglinzhizhi";
console.log(person2.name);


function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName = function(){
    console.log(this.name);
  }
}
var person1=new Person("wanglinzhizhi",'24','F2E');

// v2.0
function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName =sayName;
}

function sayName(){
  console.log(this.name);
}


//wanglinzhizhi moudles
//version 0.0.0.1

var zhuantiM=(function($){

	//私有变量
	var _count=1;

	//私有函数
	_stopTouchend();
	function _stopTouchend(){
		var locked = false;
		window.addEventListener('touchmove', function(ev){
			locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
		}, true);

		function stopTouchendPropagation(ev){
			ev.stopPropagation();
			window.removeEventListener('touchend', stopTouchendPropagation, true);
			locked = false;
		}
	}

  //介个函数是私有的.
  function aaa(){
    console.log("wanglinzhizhi 很帅 :)");
  }

	//public

	//弹出内容框
	var mask = $('.mask-layer');

	var popupHidden=function(){
		mask.removeClass('active');
		$('.popup-in').css({display:'none'}).removeClass('popup-in');

		$('.popup-btn').on('touchend',function(){
			mask.addClass('active');
			var thisPop = $('.'+$(this).data('popup'));
			thisPop.css({display:'block'});
			var timer;
			timer = setTimeout(function(){
				thisPop.addClass('popup-in');
			},100);
		});

		mask.on('touchend mousedown',function (e) {
			e.preventDefault();
			popupHidden();
		});

		$('.jsClose').on('touchend mousedown',function (e) {
			e.preventDefault();
			popupHidden();
		});
	}







	//弹出提示框
	var tipsBtnPanel=function(){
		$(".tips-btn").on('touchend mousedown',function() {
			$(".tips-panel").css({display:'block'}).animate({opacity:1});
			var timer = setTimeout(function(){
				$(".tips-panel").animate({opacity:0},function(){$(this).css("display","none")});
			},2000);
		});
	}


	//水波反馈效果
	var rippleBtn =function(){
		$('.btn').on('click', function (e) {
			$(".ripple").remove();
			var offset = $(this).offset();
			var x = e.pageX;
			var y = e.pageY;
			var owidth = $(this).width();
			var oheight = $(this).height();
			$(this).append("<span class='ripple'></span>");
			// Let's make a circle!
			if (owidth >= oheight) {
				oheight = owidth;
			} else {
				owidth = oheight;
			}

			$(".ripple").css({
				width:owidth,
				height:oheight,
				left: x - offset.left - owidth / 2,
				top: y - offset.top - oheight / 2
			}).addClass('show');
		});
	};



  // 可以把公用方法也写在这个里面 :)
	return {

		popupHidden:popupHidden,
		tipsBtnPanel:tipsBtnPanel,
		rippleBtn:rippleBtn
	};
})(jQuery);

$(function(){
	zhuantiM.popupHidden();
	zhuantiM.tipsBtnPanel();
	zhuantiM.rippleBtn();
});



////参考资料:http://www.ruanyifeng.com/blog/2012/10/javascript_module.html
