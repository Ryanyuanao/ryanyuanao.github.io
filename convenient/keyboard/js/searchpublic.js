(function() {
	var bp = document.createElement('script');
	var curProtocol = window.location.protocol.split(':')[0];
	if (curProtocol === 'https') {
		bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	} else {
		bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	}
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(bp, s);
})(); /*基本参数*/
var config = {
	api: {
	}
};
function request(option) {
	if (typeof(option) !== 'object') {
		console.warn("option is not a 'object'");
		return false;
	}
	if (typeof(layer) === 'undefined') {
		layui.use('layer', ajx(true));
	} else {
		ajx();
	}
	if (typeof(option.loading) !== 'boolean') {}
	function ajx(o) {
		if (o) {
			layer = layui.layer;
		}
		$.ajax({
			url: option.url || location.pathname,
			data: option.data || null,
			dataType: option.dataType || 'JSON',
			type: option.type || 'post',
			async: typeof(option.async) === 'boolean' ? option.async : true,
			success: option.success ||
			function(res) {
				if (res.data) {
					var delay = res.data.delay || 0;
					delay && (delay *= 1000);
					res.data.redirect && (setTimeout(function() {
						location = res.data.redirect;
					}, delay));
					res.data.reload && (option.reload = parseFloat(res.data.reload));
					if (res.data.alert) {
						res.msg && layer.open({
							type: 0,
							shadeClose: true,
							shade: ["0.6", "#7186a5"],
							skin: 'atuikeLayerSkin1',
							content: res.msg
						});
					}
				}
				if (!res.data || !res.data.alert) {
					var cfg = typeof(res.data.icon) !== "boolean" ? {
						icon: (res.code || 0),
						offset: '20%'
					} : {};
					res.msg && layer.msg(res.msg, cfg);
				}
				option.done && option.done(res);
			},
			complete: function() {
				if (typeof(option.loading) !== 'boolean') {}
				setTimeout(function() {
					var ret = option.reload || false;
					if (ret) {
						ret = (typeof(ret === 'number')) ? ret : 0;
						setTimeout(function() {
							location.reload();
						}, ret * 1000);
					}
				}, 10);
			},
			error: option.error ||
			function(e) {
			}
		});
	}
}