var	menubtn = document.getElementsByClassName('aim-menu')[0];
var menu = document.getElementsByClassName('aim-topbar-nav')[0];
menubtn.onclick = function (){var style = menu.style;style.display = style.display == "block" ? "none" : "block";}
$("#str-post").submit(function(){
	$("#result").html('查询中<i class="fa fa-spinner fa-pulse"></i>');
	$("#result").load(
		'get.php?'+$("#str-post").serialize(),
		function(){}
	);
	return false;
});$(function(){$.get("https://v1.hitokoto.cn",null,function(a){$(".intro-siteinfo").html(a.hitokoto+" —— <strong>"+a.from+"</strong>")},"JSON")});