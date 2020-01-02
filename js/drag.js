(function(w){
	w.contentDrag=function(nodeWrap,callback){
		var nodeList=nodeWrap.firstElementChild;
		var eleY=0;
		var startY=0;
		var startX=0;
		var s1=0;
		var t1=0;
		var s2=0;
		var t2=0;
		var isFirst=true;
		var timer=null;
		var tween={
			Linear: function(t,b,c,d){ return c*t/d + b; },
			easeOut: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	        }
		}
		nodeWrap.addEventListener('touchstart',function(e){
			var touch=e.changedTouches[0];
			nodeList.style.transition='none';
			eleY=transformCss(nodeList,'translateY');
			startY=touch.clientY;
			startX=touch.clientX;
			isFirst=true;
			s1=eleY;
			t1=new Date().getTime();
			if(callback && typeof callback['start']=='function'){
				callback['start']();
			}
			clearInterval(timer);
		});
		nodeWrap.addEventListener('touchmove',function(e){
			var touch=e.changedTouches[0];
			if(!isFirst){
				return;
			}
			var endY=touch.clientY;
			var endX=touch.clientX;
			var disY=endY-startY;
			var disX=endX-startX;
			if(Math.abs(disX)>Math.abs(disY)){
				if(isFirst){
					isFirst=false;
					return;
				}
			}
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
			var timerAll=1;
			var type='Linear';
			
			if(lastY>0){
				lastY=0;
				type='easeOut';
			}else if(lastY<document.documentElement.clientHeight-nodeList.offsetHeight){
				lastY=document.documentElement.clientHeight-nodeList.offsetHeight;
				type='easeOut';
			}
			
			tweenMove(lastY,timerAll,type);
			
			function tweenMove(lastY,timerAll,type){
				var t=0;
				var b=transformCss(nodeList,'translateY');
				var c=lastY-b;
				var d=timerAll/0.02;
				timer=setInterval(function(){
					if(t>=d){
						clearInterval(timer);
					}else{
						t++;
						var lastY=tween[type](t,b,c,d);
						transformCss(nodeList,'translateY',lastY);
					}
				},20);
			}
			
			if(callback && typeof callback['end']=='function'){
				callback['end']();
			}
		});
	}
})(window);

