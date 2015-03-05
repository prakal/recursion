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
  	return quote;
  }
  var objectArrayParser=function(open,close,what){
	if (close-open===1){
		return (what==='square') ? [] : {};
	}
	var inside=json.slice(open+1,close);
	console.log('inside',inside);
	// console.log(close-open,json[open],json[close]);
	var done=false;
  	if (what==='square'){
  		// this is an array
		var array=[];
	}
	else{
		var obj={};
	}
		while (done===false){
			// console.log('inside',inside);
			var comma=inside.search(/\,/);
			var colon;
			var value;
			// console.log('cimma at',comma);
			if (comma===-1){
				if (what==='square'){
					value = (parseInt(inside)) ? parseInt(inside) : quoteSlice(inside);
					array.push(value);
				}
				else{
					colon=inside.search(/\:/);
					value = inside.slice(colon+1);
					key=inside.slice(0,colon);
					
					console.log('valdsjg',value);
					obj[quoteSlice(key)]=quoteSlice(value);
				}
				
				done=true;
			}
			else{
				if (what==='square'){
					value=inside.slice(0,comma);
					console.log(value,parseInt(value));
					value = (parseInt(value)) ? parseInt(value) : quoteSlice(value);
					array.push(value);
					inside=inside.slice(comma+1);
				}
				// else{

				// }
				
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
