/**
 * @author wjsu
 */
 var isDebug	= false;
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
		
		var shakesoudn = document.getElementById("shakesound");
   			shakesound.autoplay="'autoplay'";
   			document.all.shakesound.src= '../images/shake_sound.mp3';
	},
	/*
	*摇奖
	*/
	ernie:function () {
		//alert("摇一摇");
		shakesoudn.onload = function () {
		}
		if(isDebug) {
			Index.getErnieStatus();
		} else {
			$.getJSON('prize.ashx',
	        function(remoteData){
	        	Index.getErnieStatus(remoteData);

	    	});
		}
	},
	getErnieStatus:function (obj) {
		var type = obj.type;
		if(type == "1") {
			$("body").addClass('shakeBody');
			$("#shake").html('<div class="tips"><img  src=images/tips'+obj.code+'.gif width="100%" /></div>');
		} else {
			var codeIndex = pareInt(obj.type)+1;
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