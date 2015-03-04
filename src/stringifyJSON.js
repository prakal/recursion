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
  		(Array.isArray(obj)) ? string="[" : string="{";
  	// firstItem is a test to check whether it is the first item of the object. This is required for accurate placement of commas.
		var firstItem=true;
	_.each(obj,function(item,index){
		// console.log(index,item);
		if (typeof item==='function' || item===undefined){
			return {};
		}
		if (Array.isArray(obj)===false){
			//collection is an object
			if (firstItem===true){
				string+=stringifyJSON(index)+":"+stringifyJSON(item);
			}
			else{
				string+=','+stringifyJSON(index)+":"+stringifyJSON(item);
			}
			firstItem=false;
		}
		else{
			// collection is an array
			if (index===obj.length-1){
			string+=stringifyJSON(item);
			}
		else{
			string+=stringifyJSON(item)+',';
			}

		}

		});
		(Array.isArray(obj)) ? string+="]" : string+="}";
	}
  }
  else{
  	if (typeof obj=='string'){
  		return '"'+obj+'"';
  	}

  	// console.log(typeof obj);
  	string+=obj.toString();
	}
	return string;
};
