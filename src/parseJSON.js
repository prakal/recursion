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
  	var quoteEnd=quote.slice(quoteStart+1).search(/\"/);
  	console.log('before',quote);
  	if (quoteStart!=-1 && quoteEnd!=-1){
  		quote=quote.slice(quoteStart+1,quoteStart+quoteEnd+1);
  	}
  	console.log(quote,quoteStart,quoteEnd);
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
					var decimalTest=/\./.test(inside);
					if (decimalTest===false){
						value = (!isNaN(parseInt(inside)) ? parseInt(inside) : quoteSlice(inside));
					}
					else{
						value = (!isNaN(parseFloat(inside)) ? parseFloat(inside) : quoteSlice(inside));
					}
					if (inside.trim()[0]==='[' && inside.trim().slice(-1)===']'){
						console.log('invoking internal object');
						value=parseJSON(inside);
					}
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
					if (decimalTest===false){
						value = (!isNaN(parseInt(value)) ? parseInt(value) : quoteSlice(value));
					}
					else{
						value = (!isNaN(parseFloat(value)) ? parseFloat(value) : quoteSlice(value));
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
					else{
						value = inside.slice(colon+2,comma2);
						inside=inside.slice(comma2+2);
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
  // if (sqClosed){
  // 	while (/\]/.test(json.slice(sqClosed+1))){
  // 		sqClosed=json.slice(sqClosed+1).search(/\]/);
  // 	}
  // }
  
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
