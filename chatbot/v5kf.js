	var v5_init			= false;
    var v5_protocol		= "https://";
	// var v5_protocol		= document.location.protocol + '//';
	var v5_base_url		= "www.v5kf.com/";
	var v5_public_url	= "https://www.v5kf.com/public/chat/";
	var v5_chat_url		= v5_protocol+"www.v5kf.com/public/chat/";
	var v5_new_chat_url	= v5_protocol+"www.v5kf.com/public/chat/kehu.html";
	// var v5_new_chat_url	= "http://www.v5kf.com/public/chat/kehu.html";
	var v5_static_url	= "https://static.v5kf.com/";
	var v5_flash_url	= "www.v5kf.com/flash/";
	var v5_site_id		= 169249;
	var v5_account_id	= "295210301f649";
	var v5_gid			= 0;
	var v5_invite_time	= 0;
	var v5_ident		= "";
	var v5_accept		= 0;
	var v5_params		= "";
	var v5_opt			= {"version":1,"invite":{"tpl":3,"bgcolor":"#FFFFFF","logo":"\/\/static.v5kf.com\/images\/v5_chat\/invite\/kfkt6-100.png","timer":{"open":0,"close":10},"title":{"text":"","color":"#242323"},"banner":{"text":"\u6b22\u8fce\u8bbf\u95ee","color":"#313131"},"desc":{"text":"\u606d\u5019\u591a\u65f6~\u6709\u4efb\u4f55\u7591\u95ee\u8bf7\u8054\u7cfb\u8881\u5965\u8fdb\u884c\u54a8\u8be2\uff01","color":"#313131"},"btnchat":{"title":"\u7acb\u5373\u804a\u5929","color":"#FFFFFF","bgcolor":"#647580","url":"https:\/\/www.v5kf.com\/public\/chat\/chat?sid=169249&entry=5&ref=link&accountid=295210301f649"},"btnfunc":{"title":"\u7a0d\u540e\u8054\u7cfb","color":"#647580","bgcolor":"#FFFFFF","url":"","type":1},"online":0,"pageurl":"","showmode":0},"float":{"tpl":7,"intro":"\u5728\u7ebf\u5ba2\u670d","btnimg":"","pos":1,"side":6,"bottom":80,"color":{"normal":"#FFFFFF","normalbg":"#00FAFF","active":"#FFFFFF","activebg":"#00FAFF"},"showoffline":1,"showrobot":1,"showmode":0,"pageurl":"*","showmsgs":3,"showmenu":1},"cells":{"chat":{"id":"chat","name":"\u5728\u7ebf\u5bf9\u8bdd"},"qq":{"id":"qq","name":"QQ\u5ba2\u670d"},"message":{"id":"message","name":"\u7559\u8a00\u53cd\u9988"}},"qqlist":[{"name":"Ryan\u8881\u5965","id":"2168480491","desc":""}],"wwlist":[{"name":"","id":"","desc":""}],"qrlist":[{"name":"","url":""}],"msglist":{"username":2,"gender":2,"email":2,"qq":2,"phone":2,"address":2,"content":2},"botlist":[],"dialog":{"tpl":3,"timer":{"open":-1,"close":0},"pos":1,"side":80,"bottom":0,"color":{"main":"#FFFFFF","mainbg":"#20c4ca"},"ballcolor":{"worker":"#DDF6F8","robot":"#E0F4E0","guest":"#F0F0F0"},"about":{"company":" ","intro":"\u4f60\u597d\uff0c\u6211\u662fRyan\u8881\u5965\u3002","phone":" ","weburl":" "},"img":{"bodybg":"","headbg":"","headlogo":""},"swiper":{"showmode":1,"sliders":[{"name":"","img":"https:\/\/timgsa.baidu.com\/timg?image&quality=80&size=b9999_10000&sec=1585242515535&di=0300ea29a0343a344b6cedc5d6c18b4d&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F65%2F83%2F5899d4c5be076_610.jpg","url":""}]},"newshot":{"showmode":1,"value":"\u6b22\u8fce\u4f7f\u7528Ryan\u8881\u5965\u5ba2\u670d\u7cfb\u7edf\uff01"}},"phone":{"regtpl":0,"fltpl":5,"diatpl":3,"color":"#fff","bgcolor":"#4987ff","fltpos":1,"fltside":0,"fltbottom":60}};
	var v5_chat_attrs	= "toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,top=" + (window.screen.availHeight - (window.screen.availHeight/2+275+40)) + ",left=" + (window.screen.availWidth - (window.screen.availWidth/2+365+20)) + ",width=730,height=550";

	
	var vs = document.createElement("script");
	vs.id = 'v5_float';
	vs.type = "text/javascript";
	vs.async = true;
	vs.src = "https://static.v5kf.com/js/plugin/wss16/v5_float_7.js";
	vs.charset = "utf-8";
	if(document.body) {
		document.body.appendChild(vs);
	}else if(document.getElementsByTagName('head').length > 0){
		document.getElementsByTagName('head')[0].appendChild(vs);
	}
	// document.body.appendChild(vs);
	// document.write('<script charset="utf-8" src="https://static.v5kf.com/js/plugin/wss16/v5_float_7.js?v=0103"></script>');
