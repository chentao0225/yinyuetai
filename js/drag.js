(function(w){
	w.contentDrag=function(nodeWrap,callback){
		var nodeList=nodeWrap.firstElementChild;
		var eleY=0;
		var startY=0;
		var s1=0;
		var t1=0;
		var s2=0;
		var t2=0;
		nodeWrap.addEventListener('touchstart',function(e){
			var touch=e.changedTouches[0];
			nodeList.style.transition='none';
			eleY=transformCss(nodeList,'translateY');
			startY=touch.clientY;
			s1=eleY;
			t1=new Date().getTime();
			if(callback && typeof callback['start']=='function'){
				callback['start']();
			}
		});
		nodeWrap.addEventListener('touchmove',function(e){
			var touch=e.changedTouches[0];
			var endY=touch.clientY;
			var disY=endY-startY;
			var lastY=eleY+disY;
			if(lastY>0){
				var scale=0.6-lastY/(3*document.documentElement.clientHeight);
				lastY=lastY*scale;
			}else if(lastY<document.documentElement.clientHeight-nodeList.offsetHeight){
				var temp=Math.abs(lastY)-Math.abs(document.documentElement.clientHeight-nodeList.offsetHeight);
				var scale=0.6-temp/(3*document.documentElement.clientHeight);
				temp=temp*scale;
				lastY=document.documentElement.clientHeight-nodeList.offsetHeight-temp;
			}
			transformCss(nodeList,'translateY',lastY);
			if(callback && typeof callback['move']=='function'){
				callback['move']();
			}
		});
		nodeWrap.addEventListener('touchend',function(e){
			var touch=e.changedTouches[0];
			s2=transformCss(nodeList,'translateY');
			t2=new Date().getTime();
			var speed=(s2-s1)/(t2-t1);
			var lastY=s2+speed*100;
			
			var bezier='';
			if(lastY>0){
				lastY=0;
				bezier='cubic-bezier(.17,1.22,.77,1.62)';
			}else if(lastY<document.documentElement.clientHeight-nodeList.offsetHeight){
				lastY=document.documentElement.clientHeight-nodeList.offsetHeight;
				bezier='cubic-bezier(.17,1.22,.77,1.62)';
			}
			nodeList.style.transition='1s '+bezier;
			transformCss(nodeList,'translateY',lastY);
			if(callback && typeof callback['end']=='function'){
				callback['end']();
			}
		});
	}
})(window);

