// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
,element){
  // your code here
  if (element==undefined){
  	var children=document.body.childNodes;
  }
  else{
  	var children=element.childNodes;
  }
  //can use each or reduce here, think about it...
  for (var i=0;i<children.length;i++){
  	console.log(children[i],children[i].childNodes.length,children[i].classList);
  	if (_.indexOf(children[i].classList,className)!=-1){

  	}
  	if (children[i].childNodes.length>0){
  		getElementsByClassName(className,children[i]);
  	}
  }
  // console.log(className);
  // console.log(children);
  // if (children.length>1){
  // 	getElementsByClassName(className,children);
  // }
  // for (childNodes in document.body){
  // 	console.log(childNodes);
  // }
};
