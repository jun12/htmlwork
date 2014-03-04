/**
 * @author wjsu
 */
 var isDebug	= false;
var Index = {
	init:function () {
		var hash = window.location.search.split("=")[1];
		if(hash) {
			var name = hexToDec(hash);
			console.log(name);
			$.getJSON('user.ashx?name='+name+'&='+Math.random(),
		        function(remoteData){
		  });
	  }
	}
}

var hexToDec = function(str) {
  str=str.replace(/\\/g,"%");
  return unescape(str);
}

$(function() {
  Index.init();
});