(function (w){
	w.transformCss=function (node,name,value){
	if(!node.obj){
		node.obj={};
	}
	//设置值
	if(arguments.length>2){
		var result='';
		node.obj[name]=value;
		for(var key in node.obj){
			switch (key){
				case 'translateX':
				case 'translateY':
				case 'translateZ':
				case 'translate':
					result+=key+'('+node.obj[key]+'px) ';
					break;
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
				case 'rotate':
				case 'skewX':
				case 'skewY':
				case 'skew':
					result+=key+'('+node.obj[key]+'deg) ';
					break;
				case 'scaleX':
				case 'scaleY':
				case 'scale':
					result+=key+'('+node.obj[key]+') ';
					break;
			}
		}
		node.style.transform=result;
	}else{//查询值
		var result=0;
		if(node.obj[name]==undefined){
			if(name=='scaleX'||name=='scaleY'||name=='scale'){
				result=1;
			}else{
				result=0;
			}
		}else{
			result=node.obj[name];
		}
		return result;
	}	

}
})(window);
