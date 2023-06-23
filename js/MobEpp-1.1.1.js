var body = document.getElementsByTagName('body');
for (var i = 0; i < body.length; i++) {
  body[i].addEventListener("touchstart", function() {}, false);
}

// 音乐自动播放
function audioAutoPlay(id) {
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
        audio.play();
    }, false);
}

// 上传显示图片
function selectImage(file, id) {
	// var image = '';
	if (!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function (evt) {
		document.getElementById(id).src = evt.target.result;
		// image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}

// 阻止冒泡
function prevent(hide_obj) {
    $(hide_obj).click(function (event) {
        $(this).hide();
    })
    $(hide_obj).find('*').first().click(function (event) {
        event.stopPropagation();
    });
}

 // 判断是否到达底部
function ScrollBot(event_name) {
	$(document).bind('scroll',onScroll);
	function onScroll(){
		var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 50);
		if(closeToBottom) {
			event_name();			
		}
	}
};

// 调试输出
function log(text){
	console.log(text);
}

// 列表加延时
function delay(Oli,value){
	$(Oli).each(function(index){
		$(this).css("animation-delay",index*value+'s');
	})
}

// 计算高度
auto_Fixed();
function auto_Fixed(isVir){
	var domt=$(".fixed-top").outerHeight();
	$('<div style="height:'+domt+'px"></div>').insertAfter(".fixed-top");
	var domb=$(".fixed-bottom").outerHeight();
	$('<div style="height:'+domb+'px"></div>').insertBefore(".fixed-bottom");
};

function CountDownTime(element,divtype){	//目标活动倒计时
	ShowCountDown();
	var tid=0;
	tid=setInterval(ShowCountDown,1000);
 	function ShowCountDown()
	{
		var cc = $(element);
		var arr = cc.attr("end-timer").split(":");
		var now = new Date();

		var endDate = new Date(arr[0], arr[1]-1, arr[2], arr[3],arr[4],arr[5]);
		var leftTime=endDate.getTime()-now.getTime();

		if (leftTime>0){
			var leftsecond = parseInt(leftTime/1000);
			var day1=Math.floor(leftsecond/(60*60*24)).toString();
			var hour=Math.floor((leftsecond-day1*24*60*60)/3600).toString();
			var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60).toString();
			var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60).toString();
			var hour=Math.floor((leftsecond-day1*24*60*60)/3600+24*day1).toString();
			if(day1<10) day1="0"+day1;
			if(hour<10) hour="0"+hour;
			if(minute<10) minute="0"+minute;
			if(second<10) second="0"+second;

			$(divtype).find(".t span.sp1").text(day1.substring(0, 1));
			$(divtype).find(".t span.sp2").text(day1.substring(2, 1));

			$(divtype).find(".s span.sp1").text(hour.substring(0, 1));
			$(divtype).find(".s span.sp2").text(hour.substring(2, 1));

			$(divtype).find(".f span.sp1").text(minute.substring(0, 1));
			$(divtype).find(".f span.sp2").text(minute.substring(2, 1));

			$(divtype).find(".m span.sp1").text(second.substring(0, 1));
			$(divtype).find(".m span.sp2").text(second.substring(2, 1));
		}
		else{
				clearInterval(tid);
				$(divtype+" span").text('0');
			}

	}

}

// 计时自减
function self(obj){
	var val=$(obj).attr("val");
	setInterval(function(){
		val--;
		jian(""+val)
	},1000)

	function jian(valt){
		$(obj).find("i").remove()
		for (var i=0;i<valt.length;i++){
			var text=valt.substring(i,i+1)
			$(obj).append('<i>'+text+'</i>')
		}
	}
}

function myScroll() { //返回顶部
	var x=document.body.scrollTop||document.documentElement.scrollTop;
	var timer=setInterval(function(){
	x=x-15;
	if(x<100)
	{
	x=0;
	window.scrollTo(x,x);
	clearInterval(timer);
	}
	window.scrollTo(x,x);
	},"1");
}
function zan(obj){
	$(obj).click(function(event) {
		if($(this).attr('col')){
		$(this).removeAttr('col');
		$(this).removeClass('acti');
	}else{
		$(this).attr('col',1);
		$(this).addClass('acti');
	}
	});
}

function getScroll(){
	$(window).on("touchmove scroll",function(){
		console.log($(window).scrollTop())
	})
}

function get_address(obj) {
		var str=$(obj).attr("address");
		var start=0;
		var end=1;
		for(var i=1;i<str.length;i++){
			if(str.substring(i,i-1)=="市"){
				start=i;
			}
			if(str.substring(i,i-1)=="区"){
				end=i;
			}
		}
		$(obj).text(str.substring(start,end))
	}

function foucs_effect(obj_wrap){  //输入框效果
	$(obj_wrap).click(function(event) {
		$(this).removeClass('normarl');
		$(this).find('input').focus();
	});
	$(obj_wrap+" input").blur(function(event) {
		if($(this).val()==""){
			$(this).parent().addClass('normarl');
		}
	});
}

function loade(slide_obj,refresh_obj){
var windowTop=0;//初始话可视区域距离页面顶端的距离
var numee=false;
var scrolls=0,te=0;
var shuzhi=0;
$(window).scroll(function(even) {
	even.stopPropagation();
	te=$(document).height()-$(window).height();
	scrolls = $(this).scrollTop();
	if(scrolls>=windowTop){
		if(scrolls>=te){
			numee=true;
			shuzhi=scrolls;
		}
	}
});
slide_Effect();
function slide_Effect(){
	evene=0;
	window.addEventListener("touchstart",start,false);
	window.addEventListener("touchmove",move,false);
	window.addEventListener("touchend",end,false);
	var default_value=0;
	var down=0;
	var eee=0;
		function start(even){
			if(evene==1){
				default_value=even.clientY;
				down=1;
			}else{
				even.stopPropagation();
				default_value=even.changedTouches[0].clientY;
			}
		};
		function move(even){//手指移动
			if(evene==1){
				if(down==1){var difference=even.clientY-default_value;}
			}else{
			var difference=even.changedTouches[0].clientY-default_value;
			}
			even.stopPropagation();
			if($(window).scrollTop()==0 && difference>0){
				even.preventDefault();
				
				$(slide_obj).css({"-webkit-transform":"translate3d(0,"+difference/2.4+"px,0)","-webkit-transition-duration":"0ms"});
				
			}
			if($(window).scrollTop()==shuzhi && numee && difference<0){
				even.preventDefault();
				$(slide_obj).css({"-webkit-transform":"translate3d(0,"+difference/2.4+"px,0)","-webkit-transition-duration":"0ms"});
			}
		};
		function end(even){//手指弹起
			if(evene==1){
				down=0;
			}
			$(slide_obj).css({"-webkit-transform":"translate3d(0,0,0)","-webkit-transition-duration":"400ms"});

		};
	};
}
function close_text(obj_input,click_clear){ //清除文本框中的内容
	$(obj_input).keyup(function(event) {
		var txt=$(this).val().length;
		if(txt==0){
			$(this).parent().find('i').hide();
		}
		else{
			$(this).parent().find('i').show();
		}
	});
	$(click_clear).click(function(event) {
		$(this).hide();
		$(this).parents("li").find('input').val("").focus();
	});
}

function Countdown(obj,classname,num){//倒计时  1.点击的对象  2.类  3.数值
	$(obj).attr("value","1");
	var jte=num;
	var timer=null;
	function miuete(){
			jte--;
			if(jte<=0) {
			$(obj).removeClass(classname).text('获取验证码');
				jte=num;
				clearInterval(timer);
				$(obj).attr("value","1");
			}
			$(obj+'.'+classname).text(jte+'s');
		}
	$(obj).click(function(){
		if($(this).attr("value")=="1"){
			$(this).attr("value","0");
				$(this).addClass(classname);
				miuete();
				timer=setInterval(miuete,1000);
		}

	})
}
function show_box(click_show,click_hide,hide_obj,mohu){//弹窗show显示
	$(click_show).click(function (event) {
		event.preventDefault()
		$(hide_obj).show();
		$(mohu).addClass('vague');
	});
	$(click_hide).click(function(event) {
		$(hide_obj).hide();
		$(mohu).removeClass('vague');
	});
}
function load(obj_li,click_obj){	 //点击加载
		$(obj_li+":gt(1)").hide();
		$(click_obj).click(function(event) {
			$(this).fadeOut();
			$(obj_li).each(function(index, el) {
				$(this).slideDown();
			});
		});
}

//slide();//滑动效果
function slide(){
	function imgdragstart(){return false;}
	for(i in document.images)document.images[i].ondragstart=imgdragstart;
	var ture=ismobile(1);
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
	var flag = false;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = true;
			break;
		}
	}
	function ismobile(test){
		var u = navigator.userAgent, app = navigator.appVersion;
		if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		 	if(window.location.href.indexOf("?mobile")<0){
		  	try{
		   	if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
			return '0';
		   	}else{
			return '1';
		   	}
		  	}catch(e){}
		 	}
			}else if( u.indexOf('iPad') > -1){
				return '0';
		}else{
			return '1';
		}
	};
	if(ture!=0){//判断安卓还是苹果
		slide_Effect();
	};
var windowTop=0;//初始话可视区域距离页面顶端的距离
var numee=false;
var scrolls=0,te=0;
var shuzhi=0;
$(window).scroll(function(even) {
	even.stopPropagation();
	te=$(document).height()-$(window).height();
	scrolls = $(this).scrollTop();
	if(scrolls>=windowTop){
		if(scrolls>=te){
			numee=true;
			shuzhi=scrolls;
		}
	}
});

	function slide_Effect(){
		evene=0;
		if(flag){
			window.addEventListener("touchstart",start,false);
			window.addEventListener("touchmove",move,false);
			window.addEventListener("touchend",end,false);

		}else{
			evene=1;
			window.addEventListener("mousedown",start,false);
			window.addEventListener("mousemove",move,false);
			window.addEventListener("mouseup",end,false);
		}
		var default_value=0;
		var down=0;
		var eee=0;
		function start(even){
			if(evene==1){
				default_value=even.clientY;
				down=1;
			}else{
				even.stopPropagation();
				default_value=even.changedTouches[0].clientY;
			}
		};
		function move(even){//手指移动
			if(evene==1){
				if(down==1){var difference=even.clientY-default_value;}
			}else{
			var difference=even.changedTouches[0].clientY-default_value;
			}
			even.stopPropagation();
			if($(window).scrollTop()==0 && difference>0){
				even.preventDefault();
				$(".mobile_wrap").css({"-webkit-transform":"translate3d(0,"+difference/2.4+"px,0)","-webkit-transition-duration":"0ms"});
			}
			if($(window).scrollTop()==shuzhi && numee && difference<0){
				even.preventDefault();
				$(".mobile_wrap").css({"-webkit-transform":"translate3d(0,"+difference/2.4+"px,0)","-webkit-transition-duration":"0ms"});
			}
		};
		function end(even){//手指弹起
			if(evene==1){
				down=0;
			}
			$(".mobile_wrap").css({"-webkit-transform":"translate3d(0,0,0)","-webkit-transition-duration":"400ms"});

		};
	};
}
function submenu(click_obj,click_class,show_obj){ //导航下拉菜单
	var showt=true;
	$(show_obj).on("click",function(event){
		event.stopPropagation();
	})
	$(".mobile_wrap").click(function(event) {
		event.stopPropagation();
		showt=true;
		$(click_obj).removeClass(click_class);
		$(show_obj).removeClass("show")
		setTimeout(function(){
			$(show_obj).css("overflow","hidden");
			},400)
		$("body").unbind('touchmove').removeAttr('style');
	});
	$(click_obj).click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(showt){
		$(this).addClass(click_class);
		$(show_obj).addClass("show").removeAttr("style");
		$("body").css("overflow","hidden").on("touchmove",function(event){
			event.preventDefault();
		});
		showt=false;
		}else{
			showt=true;
			$(this).removeClass(click_class);
			$(show_obj).removeClass("show")
			setTimeout(function(){
				$(show_obj).css("overflow","hidden");
				},400)
			$("body").unbind('touchmove').removeAttr('style');
		}
	});
}

function newRoll(obj){//新闻滚动
		var olent=$(obj).length;
		var j=0;
		var timter;
		for(var i=0;i<olent;i++)
		$(obj).eq(i).css({"top":i*$(obj).height()+"px"});
		timter=setInterval(stol,3000);
		$(obj).hover(function(){
				clearInterval(timter);
			},function(){
				timter=setInterval(stol,3000);
				})
		function stol(){
			j++;
			if(j>olent-1) j=0;
			$(obj).each(function(index, element) {
				var tp=parseInt($(this).css("top"));
				$(this).animate({"top":tp-$(obj).height()+"px"},500,function(){
						$(obj).eq(j-1).css("top",(olent-1)*$(obj).height()+"px")
					});
			});
			
			}		
}

function input_bd(obj_input,classN){	//焦点加类
	$(obj_input).focus(function(){
		$(this).addClass(classN);
	})
	$(obj_input).blur(function(){
			$(this).removeClass(classN);
		})
	}
	
function minHeight(obj){//版权
		var objhei=$(".center").width();
		if(objhei<700){
			$(obj).addClass("poa");
		}
    }

function Toggle(_click, _target) {
    $(_click).click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(_target).slideToggle();
    });
}

function slide_nav(obj,class_name,iname){//slide展开
    $(obj).click(function(){
        var obj = $(this).parents('li').find(class_name)
        if (obj.length>0){
            if($(this).attr('opent')==="1"){
                $(this).parents('li').find(class_name).slideUp();
                $(this).removeClass(iname);
                $(this).attr('opent',"0");

            }else{
                $(obj).removeClass(iname);
                $(obj).parent().find(class_name).slideUp();
                $(this).parents('li').find(class_name).slideDown();
                $(this).addClass(iname);
                $(obj).attr('opent',"0");
                $(this).attr('opent',"1");
                    
            }
        }
    });
}
function rand_value(obj){ //随机数字
	var strText=$(obj).attr("data-value");
	var nutime=setInterval(function(){

			var strvlue=generateMixed(4);
			
			$(obj).text(strvlue);
			setTimeout(function(){
				clearInterval(nutime);
				$(obj).text(strText);
			},500)
		},10)
	var chars = ['0','1','2','3','4','5','6','7','8','9'];
	function generateMixed(n) {
		 var res = "";
		 for(var i = 0; i < n ; i ++) {
			 var id = Math.ceil(Math.random()*9);
			 res += chars[id];
		 }
		 return res;
	}
} 

function shor_text(text_obj,add_label,click_obj){ //文字显示
	var textLen=$(text_obj).text().length;
	var text_two=$(text_obj).text().substring(0,103);
	var span_text=$(text_obj).text().substring(103,textLen);
	console.log(textLen);
	if(textLen>=103){
			
			$(add_label).text(span_text)
			$(text_obj).text(text_two+"...");
			
		}
	var opene=true;
	$(click_obj).click(function(){
			if(opene){
			$(text_obj).text(text_two);
			$(this).parent().css("overflow","inherit").find("span").show();
			$(this).text("<点击收回");
			opene=false;
			}else{
				opene=true;
				$(text_obj).text(text_two+"...");
				$(this).parent().css("overflow","hidden").find("span").hide();
				$(this).text("查看更多>");
				}
			
		})
	}
//------------------------------------------------------
function auto_height(obj,hide_obj){ //自动垂直居中
			var obj_hei=$(obj).height();
			$(hide_obj).hide().css('opacity',1);
			$(obj).css({"marginTop":-obj_hei/2+"px"});
		}
//------------------------------------------------------
function myrefresh(){ //刷新页面
		 window.location.reload();
}
//------------------------------------------------------
autoheight(".ohei");
function autoheight(obj){
	$(obj).height($(window).height());
}
//------------------------------------------------------
function evaluate(click_obj){ //星星评价
	$(click_obj).click(function(){
		$(click_obj).removeClass("true");
		$(this).addClass("true");
		var ee=$(this).index()
		$(click_obj).each(function(index, el) {
			if(index<ee)
			$(this).addClass("true");
		});			
	})
}	
//------------------------------------------------------
function IsPC(url) {//页面跳转
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
	var flag = false;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = true;
			break;
		}
	}
	if (flag){
			console.info("Current phone mode");
			//window.location.href=url;
		}else{
			console.info("Current computer model");
			}
}

function slide_menu(main_div,click_hide,click_show,bettow){//左侧划出菜单
	var wibody=$("body").width();
	var objwid=$(".mobile_wrap").width();
	if(wibody>objwid){
			$(main_div).fadeOut().removeClass("opacity");
			$(click_hide).click(function(){
			$(main_div).fadeOut();
				})
			$(click_show).click(function(){
				$(main_div).fadeIn();
				})
		}else{
					$(main_div).removeClass("opacity").css({"margin-left":bettow*wibody});
					$(click_show).click(function(){
					$(main_div).animate({"margin-left":0});
					})
					$(click_hide).click(function(){
					$(main_div).animate({"margin-left":bettow*wibody});
					})
			}
	}			
function radio(obj){ //点击对象-单选
		$(obj).click(function(){
				$(this).find("input[type='radio']").prop("checked","checked");
			})
	}
function numadd(obj,click_left,click_right){//数量加减
	var i=$(obj).val();
	$(click_left).click(function(){
			if(i>1){
					i--;

					$(this).parent().find("input").val(i);
				}
			if(i==1){
					$(this).addClass("noadd");
				}
			
		})
	$(click_right).click(function(){
			i++;
			$(click_left).removeClass("noadd");
			$(this).parent().find("input").val(i);
		})
	}

function judge_tstate(obj_input,obj_state){//登录框-按钮状态
var i=0;
$(obj_input).keyup(function(){
		i=0;
		var vale=$(this).val().length;
		if(vale>0){
			$(this).attr("text","1");	
		}
		else{
			$(this).attr("text","0");
		}
		$(obj_input).each(function(index, element) {
			if($(this).attr("text")=="1"){
				i++;
				if(i>1){
						$(obj_state).addClass("active");
					}else{
						$(obj_state).removeClass("active");
						}
				}
		});
	})
}

function alertbox(click_show,click_hide,obj,box_vague){//弹窗js
		$(obj).find(".layout").css({"-webkit-transform":"scale(0) translate(0,-0.5rem)","transition":"0.3s"});
	$(click_hide).click(function(){
			$(obj).fadeOut();
			$(obj).find(".layout").css("transition","0s").animate({"top":0},500,function(){
				$(window).unbind("touchmove");
				$(obj).find(".layout").css({"-webkit-transform":"scale(0)  translate(0,-0.5rem)"});
				$(box_vague).removeClass("mohu");
				
			});
		})
	$(click_show).click(function(){
			$(window).on("touchmove",function(even){even.preventDefault()});
			$(obj).fadeIn();
			$(obj).find(".layout").css({"-webkit-transform":"scale(1)  translate(0,0)","transition":"0.3s"});
			$(box_vague).addClass("mohu");

			var  oHei=$(obj).find('.layout').outerHeight();
			var winHei=($(window).height()-oHei)/2;
			$(obj).find(".layout").animate({"top":winHei+"px"},100);
		})
}

function judge(obj,fun1,fun2){//判断复选框
	$(obj).click(function(){
			if($(this).find("input[type=checkbox]").is(":checked")==true){
					fun1();
			}else{
					fun2();
				}
		})
}

function imgauto(obj){//  图片适应
				var ite=0;
				$(obj).load(function(){
					 ite++; 
					 $(obj).css("width","auto");
					$(this).attr("load","1");
							$(obj).each(function(index, element) {
								if($(this).attr("load")==1){
									$(this).width($(this).width()/100+"rem");
					
								}	})	
			})	;
			
			if(ite==0){
					$(obj).each(function(index, element) {
						$(this).attr("load","1");
						$(this).width($(this).width()/100+"rem");						
			})
	setTimeout(function(){
			$(obj).each(function(index, element) {
				if($(this).attr("load")!=1){
						$(this).width($(this).width()/100+"rem");
					}
				});
		},1500)
					//console.log("null");
						
			}	
					
	}

function click_addname(obj,className,Boolean){//给对象添加类  1.点击的对象  2.类名  3.是否清除所有-非零[可选] 
		if(Boolean>0){
		$(obj).click(function(){
				$(obj).removeClass(className);
				$(this).addClass(className);
			})
			}else{
					$(obj).click(function(){
				$(this).addClass(className).siblings().removeClass(className);
			})
				}
	}

function checkbox(obj){
 $(obj).click(function(){
	 	if($(this).find("input[type='checkbox']").is(':checked')==true){
					$(this).parents('li').addClass('acti');
				}else{
						$(this).parents('li').removeClass('acti');
					}
	 })
}
function cli_cgimg(obj){
$(obj).click(function(){
		if($(this).attr("ter")=="1"){
			var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(this).find('img').attr('src',new_path);
			$(this).attr("ter","0");
		}else{
		var path_img=$(this).find('img').attr('src');
		var new_path=path_img.replace(".","-1.");
		$(this).find('img').attr('src',new_path);
		$(this).attr("ter","1");
		}
	})
}

function replaimg(obj){//click变颜色的图标 1.移上去的对象
var tee=$(obj+".acti").index();
	$(obj).click(function(){
			$(obj).eq(tee).removeClass('acti');
			var path_img=$(obj).eq(tee).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(obj).eq(tee).find('img').attr('src',new_path);

			$(this).addClass('acti');
			var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace(".","-1.");
			$(this).find('img').attr('src',new_path);
			tee=$(this).index();
		})
	}

function downslide(main_div,fun_cirl,prev_page,next_page,types){//轮播图 说明：swiper-container   swiper-wrapper   swiper-slide
	types=types || 'bullets'
	var swiper = new Swiper(main_div, {
		loop:true,
		autoplay:{
			delay:3000,
			stopOnLastSlide:false,
			disableOnInteraction:false,
		},
		pagination: {
			el: fun_cirl,
			type:types,
		},
		navigation: {
			nextEl: next_page,
			prevEl: prev_page,
		},
	});
}

function tabs(Oobj,Otabch,event){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件
	$(Otabch).hide();
	var dex=$(Oobj+".acti").index()
	if(dex>-1){
		$(Otabch).eq(dex).show();
	}
	$(Oobj)[event](function(e){
        e.preventDefault()
        $(this).addClass('acti').siblings().removeClass('acti');
        $(Otabch).hide();
        $(Otabch).eq($(this).index()).show();
    });
}

function hide(obj,value){//隐藏对象  1.要隐藏的对象  2.滚动条的值
   $(window).scroll(function(){
	var et=$(window).scrollTop();
	if(et>value){
		$(obj).fadeIn();
	}else{
		$(obj).fadeOut();
	}
   }) ;
}

function paint_line(Oli_span,class_name){	//Canvas画线
	this.canvas= document.getElementById('myCanvas');
	this.canvas.width=$(".mobile_wrap").width();
	var canwidth=this.canvas.width;
	this.canvas.height=$(class_name.Target).height();
	var cxt=this.canvas.getContext("2d");
	cxt.lineWidth=1.3;//线条宽度
	cxt.strokeStyle="#cb64d9";//线条颜色
	var obj_width=$(Oli_span+"."+class_name.ClassName).width()+2;
	var obj_height=$(Oli_span+"."+class_name.ClassName).height()+3;
	$(Oli_span+"."+class_name.ClassName).each(function(index, el) {
		$this=$(this);
		var avet=($(window).width()-canwidth)/2
		var x=$this.offset().left-avet+obj_width/2;
		var y=$this.offset().top+obj_height/2;
		cxt.lineTo(x,y-$(class_name.Subtract).height());
		cxt.stroke();
		console.info("X坐标:"+x+"Y坐标:"+y);
	});
}
function cg_state(down,class_name,t0,t1) {
	$(down).click(function(event) {
		if(!$(this).attr("state")){
			$(this).addClass(class_name);
			$(this).attr("state","1");
			if(t1){
				$(this).text(t1);
			}
		}else{
			$(this).removeClass(class_name);
			$(this).removeAttr("state");
			if(t0){
				$(this).text(t0);
			}
		}
	});
}

function slideHide(obj,hide_obj,fade) { //滑出菜单
		$(obj).click(function(event) {
			var objh=$(hide_obj).height();
			$(hide_obj).animate({"bottom":-objh+"px"},400,function(){
				$(fade).fadeOut();
			})
		});
	}

function autoClass(obj,obj1){
	var id=$(obj+".acti").index();
	var num=0;
	$(obj).each(function(index, el) {
		if(index<id){
			var du=$(this).outerWidth();
			var marL=parseInt($(this).css("marginLeft"));
			var marR=parseInt($(this).css("marginRight"));
			num+=du;
			num+=marL;
			num+=marR;
		}
	});
	$(obj1).scrollLeft(num-$(obj).eq(id).outerWidth()-parseInt($(obj).eq(id).css("marginRight")));
}

function isbutton(obj,each_obj,state_obj){
	var eee=false;
	$(obj).keyup(function(event) {
		$(each_obj).each(function(index, el) {
			var etext=$(this).find('input').val();
			if (etext!=''){
				eee=true
			}else{
				eee=false;
				return false
			}
		});
		if(eee){
			$(state_obj).addClass('ok');
		}else{
			$(state_obj).removeClass('ok')
		}
	});
}