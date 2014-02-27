/**
 * @author wjsu
 */
var path = "chioce.html?u=";
 var isDebug	= true;
var Index = {
	init:function () {
		this.initEvent();
	},
	initEvent:function () {
		$("#submitBtn").on("click",this.getStatus);
	},
	getStatus:function () {
		var username = $("#username").val();
		if(username == "") {
			alert("请输入您的姓名");
		} else {
			if(isDebug) {
				Index.generateCode(username);
			} else {
	      $.getJSON('reg.ashx?username='+username+'&createdate='+new Date(),
	        function(remoteData){
	        	Index.generateCode(username);
	        	console.log(remoteData);
	      });
      }
		}
	},
	/*
	* 生成随机码
	*/
	generateCode:function (username) {
		$("#url").empty();
		var urlPath = path + decToHex(username).replace(/\\/g,"")+Date.parse(new Date());
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
var hexToDec = function(str) {
  str=str.replace(/\\/g,"%");
  return unescape(str);
}