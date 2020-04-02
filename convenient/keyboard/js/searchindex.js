layui.use(['laytpl', 'util', 'layer'], function() {
	var layer = layui.layer;
	var laytpl = layui.laytpl;
	var util = layui.util; /*判断Mobile*/
	request({
		type: 'get',
		url: config.api.index_api,
		success: function(res) {
			console.log(res);
			laytpl($("#newList").html()).render(res.news, function(html) {
				$(".newslist ul").html(html);
				$(".newslist ul li").each(function(index, item) {
					var timeDom = $(item).find(".info span");
					timeDom.html(util.timeAgo(timeDom.html(), true));
				});
			}); /*加载排行榜*/
		}
	}); /*搜索下拉*/
	var bdkeyword = "";
	$(".indexSearch input").keyup(function(e) {
		if (e.keyCode == 13) {
			window.open($(".indexSearch .baid").attr("href"), "_blank");
		} else  {
			$(".indexSearch .baid").attr("href", "https://www.baidu.com/s?ie=utf-8&wd=" + $(this).val());
		   
			loadKeyword($(this));
		}
	});
	$(".indexSearch input").click(function(e) {
		if ($(this).val()) {
			if (bdkeyword != $(this).val()) {
				loadKeyword($(this));
			} else {
				if ($(".selectul").html() != "") {
					$(".selectul").show();
				}
			}
		}
		return false;
	});

	function loadKeyword(that) {
		$.get("https://www.daohangtx.com/test/bdkeyword.php?wd=" + that.val(), function(res) {
			if (res) {
				bdkeyword = that.val();
				res = eval("(" + res + ")");
				laytpl($("#keywordList").html()).render(res, function(html) {
					if (html.trim() != "") {
						$(".selectul").show().html(html);
					} else {
						$(".selectul").hide().html("");
					}
				});
			} else {
				$(".selectul").hide().html("");
			}
		});
	}
	$(document).click(function(e) {
		$(".selectul").hide();
	}); 
});