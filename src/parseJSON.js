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
  	var quoteStart=quote.search(/\"/);
  	var quoteEnd=quote.slice(quoteStart+1).search(/\"/);
  	console.log('before',quote);
  	if (quoteStart!=-1 && quoteEnd!=-1){
  		quote=quote.slice(quoteStart+1,quoteStart+quoteEnd+1);
  	}
  	console.log(quote,quoteStart,quoteEnd);
  	// null, true, false cases
  	return (quote==="null") ? null : (quote==="true") ? true : (quote==="false") ? false : quote;
  	// return quote;
  }
  var objectArrayParser=function(open,close,what){
	if (close-open===1){
		return (what==='square') ? [] : {};
	}
	var inside=json.slice(open+1,close);
	//console.log('inside',inside);
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
					
					array.push(value);
				}
				else{
					colon=inside.search(/\:/);
					value = inside.slice(colon+2);
					key=inside.slice(0,colon);
					
					console.log('value is',value);
					obj[quoteSlice(key)]=quoteSlice(value);
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
						var comma2=comma+inside.slice(comma+1).search(/\,/);
					}
					else{
						var comma2=comma;
					}
					console.log(inside,colon,comma2);
					value = inside.slice(colon+2,comma2+1);
					key=inside.slice(0,colon);
					console.log('value is',value,'key is',key);
					obj[quoteSlice(key)]=quoteSlice(value);
					inside=inside.slice(comma2+2);
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
  var cuOpen=json.search(/\{/);
  var cuClosed=json.search(/\}/);
  
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
