/**
 * @author wjsu
 */
document.addEventListener('WeixinJSBridgeReady', 
 	function onBridgeReady() {
 		window.shareData = {"imgUrl": "http://clarisonic.wangfan.com//images/1.jpg", 
 												"timeLineLink": window.location.href,
 												"sendFriendLink": "http://clarisonic.wangfan.com/",
 												"weiboLink": "http://clarisonic.wangfan.com/",           
 												"tTitle": "我刚刚参加了一个世界上最准的性格测试，太神奇了！",
 												"tContent": "我刚刚参加了一个世界上最准的性格测试，太神奇了！",
 												"fTitle": "我刚刚参加了一个世界上最准的性格测试，太神奇了！",
 												"fContent": "我刚刚参加了一个世界上最准的性格测试，太神奇了！",
 												"wContent": "我刚刚参加了一个世界上最准的性格测试，太神奇了！"
 												};          
 		// 发送给好友
 		WeixinJSBridge.on('menu:share:appmessage',
 			function (argv) {
 				WeixinJSBridge.invoke('sendAppMessage', {
 				"img_url": window.shareData.imgUrl,// "img_width": "640",// "img_height": "640",
 				"link": window.shareData.sendFriendLink,
 				"desc": window.shareData.fContent,
 				"title": window.shareData.fTitle
 				}, function (res) { _report('send_msg', res.err_msg);})});           
 				// 分享到朋友圈          
 				WeixinJSBridge.on('menu:share:timeline', function (argv) {
 					if(window.shareData.timeLineLink.indexOf("chioce.html") == -1) {
 						window.shareData.timeLineLink = "http://clarisonic.wangfan.com/chioce.html";
 					}
 				WeixinJSBridge.invoke('shareTimeline', {
 				"img_url": window.shareData.imgUrl,
 				"img_width": "640",
 				"img_height": "640",
 				"link": window.shareData.timeLineLink,
 				"desc": window.shareData.tContent,
 				"title": window.shareData.tTitle
 				}, function (res) {
 				_report('timeline', res.err_msg);
 				});
 				});           // 分享到微博 
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
        	WeixinJSBridge.invoke('shareWeibo', {
        		"content": window.shareData.wContent,
        		"url": window.shareData.weiboLink,
        	}, function (res) {
        		_report('weibo', res.err_msg);
        	});
        });
      }, false);