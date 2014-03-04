/**
 * @author wjsu
 */
 var isDebug	= false;
var Index = {
	init:function () {
		var hash = window.location.hash.split("#")[1];
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
		window.removeEventListener('shake',Index.ernie, false);
		if(isDebug) {
			Index.getErnieStatus();
		} else {
			$.getJSON('prize.ashx?u='+Math.random(),
	        function(remoteData){
	        	Index.getErnieStatus(remoteData);
	    	});
		}
	},
	getErnieStatus:function (obj) {
		if(obj.type == 1) {
			$("body").addClass('shakeBody');
			$("#shake").html('<div class="tips"><img  src=images/tips'+obj.code+'.gif width="100%" /></div>');
		} else {
			//alert("obj.type:"+obj.type);
			var codeIndex = obj.type-1;
			//alert(codeIndex);
			$("#shake").load('info.html #code'+codeIndex,function(){
				$(".codetxt"+codeIndex).text(obj.code);
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