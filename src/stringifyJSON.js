// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var string="";
  if (typeof obj=='object'){
  	if(obj===null){
  		return "null";
  	}
  	if (obj.length===0){
  		return (Array.isArray(obj)) ? "[]" : "{}";
  	}
  	else{
  		string="[";
	_.each(obj,function(item,index){
		console.log(index,item);
		string+=item.toString();
		});
		string+="]";
	}
  }
  else{
  	if (typeof obj=='string'){
  		return '"'+obj+'"';
  	}
  	console.log(typeof obj);
  	string+=obj.toString();
	}
	return string;
};
