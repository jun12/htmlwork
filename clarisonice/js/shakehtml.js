/**
 * @author wjsu
 */
 var isDebug	= true;
var Index = {
	init:function () {
		var hash = window.location.hash.split("#")[1];
		console.log(hash);
		this.appenddivforIndex(hash);
	},
	appenddivforIndex:function (index) {
		if(index == undefined) {
			index = 1;
		}
		$("#shake").append('<img  src=images/'+index+".gif"+' width="100%" />');
		window.addEventListener('shake', Index.ernie, false);
	},
	/*
	*摇奖
	*/
	ernie:function () {
		//alert("摇一摇");
		if(isDebug) {
			Index.getErnieStatus();
		} else {
			$.getJSON('reg.ashx?username='+username+'&createdate='+new Date(),
	        function(remoteData){
	        console.log(remoteData);
	    });
		}
	},
	getErnieStatus:function () {
		var type = "1";
		var tips = gen_random(1,7);
		var code = "code3";
		if(type == "1") {
			$("body").addClass('shakeBody');
			$("#shake").html('<div class="tips"><img  src=images/tips'+tips+'.gif width="100%" /></div>');
		} else {
			$("#shake").load('info.html #'+code,function(){
			});
		}
	}
}

$(function() {
  Index.init();
});

function gen_random(min, max){   
return Math.floor(Math.random() * (max- min) + min);   
} 