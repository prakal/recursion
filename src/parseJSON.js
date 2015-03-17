// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  // console.log('json is:',json, typeof json);
  //something.search(regex) searches location of regex in something
  // square bracket opening (where)
  var quoteSlice=function(quote){
  	// if (quote===""){
  	// 	return quote;
  	// }
  	if (quote instanceof Object){
  		// we do not need to manipulate objects in quoteSlice, only strings.
  		return quote;
  	}
  	var quoteStart=quote.search(/\"/);
  	//var quoteEnd=quote.slice(quoteStart+1).search(/\"/);
  	var quoteEnd=quote.length-1-(quote.split('').reverse().join('')).search(/\"/);
  	console.log('before',quote,quoteStart,quoteEnd);
  	if (quoteStart!=-1 && quoteEnd!=-1){
  		quote=quote.slice(quoteStart+1,quoteEnd);
  	}
  	console.log(quote,quoteStart,quoteEnd);
  	if (/\\\\/.test(quote)){
  		// replace single backslash followed by x with x. $2 is the second character in the pattern, in this case it is '"'.
  		quote=quote.replace(/(\\)([^\\])/g,"$2");
  		// replace double backslash with single backslash:
  		quote=quote.replace("\\\\","\\");
  		console.log('Test for backslash confirmed',quote.replace("\\","\\"));
  		return quote;
  	}
  	// null, true, false cases
  	return (quote.trim()==="null") ? null : (quote.trim()==="true") ? true : (quote.trim()==="false") ? false : quote;
  	// return quote;
  };
  var objectArrayParser=function(open,close,what){
	if (close-open===1){
		return (what==='square') ? [] : {};
	}
	var inside=json.slice(open+1,close);
	console.log(json,'inside',inside);
	// console.log(close-open,json[open],json[close]);
	var done=false;
  	if (what==='square'){
  		// this is an array
		var array=[];
	}
	else{
		var obj={};
	}
		// going thru each item in array or object
		while (done===false){
			// console.log('inside',inside);
			var comma=inside.search(/\,/);
			console.log('comma at',comma);
			var colon;
			var value;
			// console.log('comma at',comma);
			if (comma===-1){
				if (what==='square'){
					// console.log('trimmed',inside.trim());
					if ((inside.trim()[0]==='[' && inside.trim().slice(-1)===']') ||(inside.trim()[0]==='{' && inside.trim().slice(-1)==='}')){
							console.log('invoking internal object');
							value=parseJSON(inside.trim());
					}
					else{
						var decimalTest=/\./.test(inside);
						if (decimalTest===false){
							value = (!isNaN(parseInt(inside)) ? parseInt(inside) : quoteSlice(inside));
						}
						else{
							value = (!isNaN(parseFloat(inside)) ? parseFloat(inside) : quoteSlice(inside));
						}
					}
					
					console.log(value);
					array.push(value);
				}
				else{
					colon=inside.search(/\:/);
					var value = inside.slice(colon+1);
					var key=inside.slice(0,colon);
					console.log('inside',inside);
					console.log('value is',value);
					console.log('key is',key);
					if (inside.length>0){
						// console.log(value.trim()[0],value.trim().slice(-1));
						// checking for nested object:
						if ((value.trim()[0]==='[' && value.trim().slice(-1)===']') ||(value.trim()[0]==='{' && value.trim().slice(-1)==='}')){
							console.log('invoking internal object');
							value=parseJSON(value);
						}
						console.log(typeof value);
						obj[quoteSlice(key)]=quoteSlice(value);
					}

				}
				
				done=true;
			}
			else{
				if (what==='square'){
					value=inside.slice(0,comma);
					var decimalTest=/\./.test(value);
					console.log(value,parseInt(value),decimalTest);
					if (value.trim()[0]==='['  ||value.trim()[0]==='{' ){
						console.log('invoking internal object');
						value=parseJSON(value);
					}
					else{
						if (decimalTest===false){
							value = (!isNaN(parseInt(value)) ? parseInt(value) : quoteSlice(value));
						}
						else{
							value = (!isNaN(parseFloat(value)) ? parseFloat(value) : quoteSlice(value));
						}
					}
					
					
					array.push(value);
					inside=inside.slice(comma+1);
				}
				else{
					colon=inside.search(/\:/);
					if (colon>comma){
						// finding next comma after colon:
						console.log('next comma');
						var comma2=comma+inside.slice(comma+1).search(/\,/)+1;
					}
					else{
						var comma2=comma;
					}
					console.log(inside,colon,comma2);
					key=inside.slice(0,colon);
					if (/\[/.test(inside)){
						// find the corollory ] for the [ by reversing string and searching it.
						var endOfArrayPosition=inside.length-1-(inside.split('').reverse().join('')).search(/\]/);
						console.log('found end of array at:',endOfArrayPosition);
						var startOfArrayPosition=inside.search(/\[/);
						value=parseJSON(inside.slice(startOfArrayPosition,endOfArrayPosition+1));
						inside=inside.slice(endOfArrayPosition+1);
					}
					else {
						if (/\{/.test(inside)){
							// find the corollory } for the { by reversing string and searching it.
							var endOfObjectPosition=inside.length-1-(inside.split('').reverse().join('')).search(/\}/);
							console.log('found end of object at:',endOfObjectPosition);
							var startOfObjectPosition=inside.search(/\{/);
							value=parseJSON(inside.slice(startOfObjectPosition,endOfObjectPosition+1));
							inside=inside.slice(endOfObjectPosition+1);
						}
						else{
							value = inside.slice(colon+2,comma2);
							inside=inside.slice(comma2+2);
						}
					}
					
					
					console.log('value is',value,'key is',key);
					obj[quoteSlice(key)]=quoteSlice(value);
				}
				
				// console.log(value,inside);
				
			}

		}
	// console.log( array);
	if (what==='square'){
  		return array;
	}
	else{
		return obj;
	}
	

  };
  var sqOpen=json.search(/\[/);
  var sqClosed=json.search(/\]/);
  if (sqClosed){
  	sqClosed=json.length-1-(json.split('').reverse().join('')).search(/\]/);
  }
  
  var cuOpen=json.search(/\{/);
  var cuClosed=json.search(/\}/);
  // console.log('does test for more braces work',/\}/.test(json.slice(cuClosed+1)),'next brace at',cuClosed+1+json.slice(cuClosed+1).search(/\}/));
  if (cuClosed){
  	while (/\}/.test(json.slice(cuClosed+1))){
  		cuClosed=cuClosed+1+json.slice(cuClosed+1).search(/\}/);
  	}
  }
  if (sqOpen===0){
  	// call objectArrayParser with what='array'
  	return objectArrayParser(sqOpen,sqClosed,'square');
  }
  else{
  	// object is an object
  	if (cuOpen===0){
  		return objectArrayParser(cuOpen,cuClosed,'curved');
  	}

  }
};
