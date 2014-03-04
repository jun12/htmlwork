/**
 * @author wjsu
 */
var path = "http://clarisonic.wangfan.com/chioce.html?u=";
 var isDebug	= false;
var Index = {
	init:function () {
		this.initEvent();
		this.onLoadImage();
	},
	initEvent:function () {
		$("#submitBtn").on("click",this.getStatus);
		$("#username").on({
			focus:function () {
				$("#username").val("");
			},
			blur:function (){
				if($("#username").val() == "") {
					$("#username").val("请输入您的真实姓名");
				}
			}
		});
	},
	onLoadImage:function () {
		for(var i = 1; i < 8; i++) {
			var image = new Image();
			image.src = "images/"+i+".gif";
			image.onload = function() {}
			var image2 = new Image();
			image2.src = "images/tips"+i+".gif";
			image2.onload = function() {}
		}
	},
	getStatus:function () {
		var username = $("#username").val();
		if(username == "" || username == "请输入您的真实姓名") {
			alert("请输入您的真实姓名");
		} else {
			if(isDebug) {
				Index.generateCode(username);
			} else {
	      $.getJSON('reg.ashx?username='+username+'&createdate='+new Date().Format("yyyy-MM-dd"),
	        function(remoteData){
	        	if(remoteData.result == "success") {
	        		Index.generateCode(username);
	        	}
	      });
      }
		}
	},
	/*
	* 生成随机码
	*/
	generateCode:function (username) {
		$("#url").empty();
		var urlPath = path + decToHex(username);
		$("#url").append('<a href='+urlPath+'>'+urlPath+'</a>');
	}
}

$(function() {
  Index.init();
});
/*
*js Unicode编码转换
*/ 
var decToHex = function(str) {
  var res=[];
  for(var i=0;i < str.length;i++)
      res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
  return "\\u"+res.join("\\u");
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}