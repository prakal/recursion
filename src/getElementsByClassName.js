// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
,element,result){
  // your code here
  // console.log(document.childNodes);
  if (!result){
  	var result=[];
  }
  // else{
  // 	console.log(result);
  // }
  if (element==undefined){
  	var children=document.childNodes;
  }
  else{
  	var children=element.childNodes;
  }
  //iterative method...
  // for (var i=0;i<children.length;i++){
  // 	// console.log(children[i],children[i].childNodes.length,children[i].classList);
  // 	if (_.indexOf(children[i].classList,className)!=-1){
  // 		result.push(children[i]);
  // 	}
  // 	if (children[i].childNodes.length>0){
  // 		getElementsByClassName(className,children[i],result);
  // 	}
  // }
  // functional method (using reduce)
  _.each(children,function(item){
  	// console.log(result);
  	if (_.indexOf(item.classList,className)!=-1){
  		// console.log(_.indexOf(result,item.classList));
  		result.push(item);
  	}
  	if (item.childNodes.length>0){
  		getElementsByClassName(className,item,result);
  	}
  });
  // console.log('RESULT',result);
  return result;
  // console.log(className);
  // console.log(children);
  // if (children.length>1){
  // 	getElementsByClassName(className,children);
  // }
  // for (childNodes in document.body){
  // 	console.log(childNodes);
  // }
};
